from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any


MODULE_IDS = [
    "reading-music",
    "note-names",
    "rhythm-basics",
    "instrument-families",
    "final-challenge",
]

SEEDED_LEARNERS = [
    {"id": "emma", "initial": "E", "name": "Emma", "color": "#4A90D9"},
    {"id": "marcus", "initial": "M", "name": "Marcus", "color": "#52C98A"},
    {"id": "sofia", "initial": "S", "name": "Sofia", "color": "#F5A623"},
    {"id": "james", "initial": "J", "name": "James", "color": "#9B59B6"},
    {"id": "aisha", "initial": "A", "name": "Aisha", "color": "#E8524A"},
    {"id": "noah", "initial": "N", "name": "Noah", "color": "#F39C12"},
    {"id": "avery", "initial": "A", "name": "Avery", "color": "#16A085"},
    {"id": "liam", "initial": "L", "name": "Liam", "color": "#D35400"},
    {"id": "zoe", "initial": "Z", "name": "Zoe", "color": "#8E44AD"},
]


@dataclass
class Learner:
    id: str
    initial: str
    name: str
    color: str


def now_timestamp() -> int:
    return int(datetime.now(tz=timezone.utc).timestamp() * 1000)


def empty_assessment_attempt() -> dict[str, Any]:
    return {
        "startedAt": now_timestamp(),
        "answers": {},
        "score": 0,
        "total": 0,
        "passed": False,
    }


def empty_module_progress() -> dict[str, Any]:
    return {
        "viewedLessonIds": [],
        "practiceAnswers": {},
        "completedPracticeIds": [],
        "assessmentHistory": [],
        "navigationErrorCount": 0,
    }


def empty_learner_progress() -> dict[str, Any]:
    return {
        "modules": {
            module_id: empty_module_progress()
            for module_id in MODULE_IDS
        }
    }
