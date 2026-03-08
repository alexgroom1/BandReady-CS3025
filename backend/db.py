from __future__ import annotations

import json
import sqlite3
from typing import Any

from flask import current_app, g

from .models import MODULE_IDS, empty_learner_progress, empty_module_progress


def _connect() -> sqlite3.Connection:
    database_path = current_app.config["DATABASE_PATH"]
    database_path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(database_path)
    connection.row_factory = sqlite3.Row
    return connection


def get_db() -> sqlite3.Connection:
    if "db" not in g:
        g.db = _connect()
    return g.db


def close_db(_: object | None = None) -> None:
    connection = g.pop("db", None)
    if connection is not None:
        connection.close()


def init_db() -> None:
    db = get_db()
    db.executescript(
        """
        CREATE TABLE IF NOT EXISTS learners (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            initial TEXT NOT NULL,
            color TEXT NOT NULL,
            created_at INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS module_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            learner_id TEXT NOT NULL,
            module_id TEXT NOT NULL,
            viewed_lesson_ids_json TEXT NOT NULL DEFAULT '[]',
            practice_answers_json TEXT NOT NULL DEFAULT '{}',
            completed_practice_ids_json TEXT NOT NULL DEFAULT '[]',
            last_visited_at INTEGER,
            last_visited_route TEXT,
            completed_at INTEGER,
            navigation_error_count INTEGER NOT NULL DEFAULT 0,
            UNIQUE (learner_id, module_id),
            FOREIGN KEY (learner_id) REFERENCES learners (id)
        );

        CREATE TABLE IF NOT EXISTS assessment_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            learner_id TEXT NOT NULL,
            module_id TEXT NOT NULL,
            started_at INTEGER NOT NULL,
            finished_at INTEGER,
            score INTEGER NOT NULL DEFAULT 0,
            total INTEGER NOT NULL DEFAULT 0,
            passed INTEGER NOT NULL DEFAULT 0,
            answers_json TEXT NOT NULL DEFAULT '{}',
            is_active INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (learner_id) REFERENCES learners (id)
        );
        """
    )
    db.commit()


def json_loads(value: str | None, fallback: Any) -> Any:
    if not value:
        return fallback
    try:
        return json.loads(value)
    except json.JSONDecodeError:
        return fallback


def get_learners() -> list[dict[str, Any]]:
    db = get_db()
    rows = db.execute(
        "SELECT id, initial, name, color FROM learners ORDER BY name ASC"
    ).fetchall()
    return [dict(row) for row in rows]


def ensure_progress_rows(learner_id: str) -> None:
    db = get_db()
    for module_id in MODULE_IDS:
        db.execute(
            """
            INSERT OR IGNORE INTO module_progress (
                learner_id,
                module_id,
                viewed_lesson_ids_json,
                practice_answers_json,
                completed_practice_ids_json,
                navigation_error_count
            ) VALUES (?, ?, '[]', '{}', '[]', 0)
            """,
            (learner_id, module_id),
        )
    db.commit()


def serialize_attempt(row: sqlite3.Row) -> dict[str, Any]:
    payload = {
        "id": row["id"],
        "startedAt": row["started_at"],
        "answers": json_loads(row["answers_json"], {}),
        "score": row["score"],
        "total": row["total"],
        "passed": bool(row["passed"]),
    }
    if row["finished_at"] is not None:
        payload["finishedAt"] = row["finished_at"]
    return payload


def serialize_module_progress(
    row: sqlite3.Row | None,
    active_attempt: sqlite3.Row | None,
    history_rows: list[sqlite3.Row],
) -> dict[str, Any]:
    if row is None:
        progress = empty_module_progress()
    else:
        progress = {
            "viewedLessonIds": json_loads(row["viewed_lesson_ids_json"], []),
            "practiceAnswers": json_loads(row["practice_answers_json"], {}),
            "completedPracticeIds": json_loads(row["completed_practice_ids_json"], []),
            "assessmentHistory": [serialize_attempt(history_row) for history_row in history_rows],
            "navigationErrorCount": row["navigation_error_count"] or 0,
        }
        if row["last_visited_at"] is not None:
            progress["lastVisitedAt"] = row["last_visited_at"]
        if row["last_visited_route"]:
            progress["lastVisitedRoute"] = row["last_visited_route"]
        if row["completed_at"] is not None:
            progress["completedAt"] = row["completed_at"]

    if active_attempt is not None:
        progress["currentAssessment"] = serialize_attempt(active_attempt)

    return progress


def get_learner_progress(learner_id: str) -> dict[str, Any]:
    ensure_progress_rows(learner_id)
    db = get_db()
    learner_progress = empty_learner_progress()

    progress_rows = db.execute(
        "SELECT * FROM module_progress WHERE learner_id = ?",
        (learner_id,),
    ).fetchall()
    progress_by_module = {row["module_id"]: row for row in progress_rows}

    active_attempt_rows = db.execute(
        """
        SELECT * FROM assessment_attempts
        WHERE learner_id = ? AND is_active = 1
        ORDER BY id DESC
        """,
        (learner_id,),
    ).fetchall()
    active_by_module = {row["module_id"]: row for row in active_attempt_rows}

    history_rows = db.execute(
        """
        SELECT * FROM assessment_attempts
        WHERE learner_id = ? AND is_active = 0
        ORDER BY id ASC
        """,
        (learner_id,),
    ).fetchall()
    history_by_module: dict[str, list[sqlite3.Row]] = {module_id: [] for module_id in MODULE_IDS}
    for row in history_rows:
        history_by_module.setdefault(row["module_id"], []).append(row)

    for module_id in MODULE_IDS:
        learner_progress["modules"][module_id] = serialize_module_progress(
            progress_by_module.get(module_id),
            active_by_module.get(module_id),
            history_by_module.get(module_id, []),
        )

    return learner_progress


def upsert_module_progress(learner_id: str, module_id: str, payload: dict[str, Any]) -> dict[str, Any]:
    ensure_progress_rows(learner_id)
    db = get_db()
    db.execute(
        """
        UPDATE module_progress
        SET viewed_lesson_ids_json = ?,
            practice_answers_json = ?,
            completed_practice_ids_json = ?,
            last_visited_at = ?,
            last_visited_route = ?,
            completed_at = ?,
            navigation_error_count = ?
        WHERE learner_id = ? AND module_id = ?
        """,
        (
            json.dumps(payload.get("viewedLessonIds", [])),
            json.dumps(payload.get("practiceAnswers", {})),
            json.dumps(payload.get("completedPracticeIds", [])),
            payload.get("lastVisitedAt"),
            payload.get("lastVisitedRoute"),
            payload.get("completedAt"),
            payload.get("navigationErrorCount", 0),
            learner_id,
            module_id,
        ),
    )
    db.commit()
    return get_learner_progress(learner_id)["modules"][module_id]


def create_or_get_active_attempt(learner_id: str, module_id: str, started_at: int) -> dict[str, Any]:
    ensure_progress_rows(learner_id)
    db = get_db()
    existing = db.execute(
        """
        SELECT * FROM assessment_attempts
        WHERE learner_id = ? AND module_id = ? AND is_active = 1
        ORDER BY id DESC LIMIT 1
        """,
        (learner_id, module_id),
    ).fetchone()
    if existing is not None:
        return serialize_attempt(existing)

    cursor = db.execute(
        """
        INSERT INTO assessment_attempts (
            learner_id,
            module_id,
            started_at,
            finished_at,
            score,
            total,
            passed,
            answers_json,
            is_active
        ) VALUES (?, ?, ?, NULL, 0, 0, 0, '{}', 1)
        """,
        (learner_id, module_id, started_at),
    )
    db.commit()
    created = db.execute(
        "SELECT * FROM assessment_attempts WHERE id = ?",
        (cursor.lastrowid,),
    ).fetchone()
    return serialize_attempt(created)


def update_assessment_attempt(
    learner_id: str,
    module_id: str,
    attempt_id: int,
    payload: dict[str, Any],
) -> dict[str, Any]:
    ensure_progress_rows(learner_id)
    db = get_db()
    db.execute(
        """
        UPDATE assessment_attempts
        SET answers_json = ?,
            score = ?,
            total = ?,
            passed = ?,
            finished_at = ?,
            is_active = ?
        WHERE id = ? AND learner_id = ? AND module_id = ?
        """,
        (
            json.dumps(payload.get("answers", {})),
            payload.get("score", 0),
            payload.get("total", 0),
            1 if payload.get("passed") else 0,
            payload.get("finishedAt"),
            0 if payload.get("finishedAt") else 1,
            attempt_id,
            learner_id,
            module_id,
        ),
    )

    module_progress = payload.get("moduleProgress", {})
    db.execute(
        """
        UPDATE module_progress
        SET last_visited_at = ?,
            last_visited_route = ?,
            completed_at = ?,
            navigation_error_count = ?
        WHERE learner_id = ? AND module_id = ?
        """,
        (
            module_progress.get("lastVisitedAt"),
            module_progress.get("lastVisitedRoute"),
            module_progress.get("completedAt"),
            module_progress.get("navigationErrorCount", 0),
            learner_id,
            module_id,
        ),
    )
    db.commit()
    return get_learner_progress(learner_id)["modules"][module_id]


def get_teacher_dashboard(module_titles: dict[str, str]) -> dict[str, Any]:
    learners = get_learners()
    dashboard = {"learners": []}
    for learner in learners:
        progress = get_learner_progress(learner["id"])
        module_summaries = []
        for module_id in MODULE_IDS:
            module_progress = progress["modules"][module_id]
            history = module_progress.get("assessmentHistory", [])
            latest_attempt = history[-1] if history else None
            last_visited_at = module_progress.get("lastVisitedAt")
            last_visited_label = "No activity yet"
            if last_visited_at:
                from datetime import datetime

                last_visited_label = datetime.fromtimestamp(last_visited_at / 1000).strftime("%b %-d")
            last_visited_label = (
                f"{last_visited_label} • nav errors {module_progress.get('navigationErrorCount', 0)}"
            )
            module_summaries.append(
                {
                    "moduleId": module_id,
                    "moduleTitle": module_titles.get(module_id, module_id),
                    "completed": bool(module_progress.get("completedAt")),
                    "latestScoreLabel": (
                        f"{latest_attempt['score']}/{latest_attempt['total']} {'pass' if latest_attempt['passed'] else 'retry'}"
                        if latest_attempt
                        else "No attempts yet"
                    ),
                    "attempts": len(history),
                    "lastVisitedLabel": last_visited_label,
                }
            )
        dashboard["learners"].append({"learner": learner, "moduleSummaries": module_summaries})
    return dashboard
