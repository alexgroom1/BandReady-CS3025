from __future__ import annotations

from .models import SEEDED_LEARNERS, now_timestamp
from .db import get_db


def seed_learners() -> None:
    db = get_db()
    timestamp = now_timestamp()
    for learner in SEEDED_LEARNERS:
        db.execute(
            """
            INSERT OR IGNORE INTO learners (id, name, initial, color, created_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                learner["id"],
                learner["name"],
                learner["initial"],
                learner["color"],
                timestamp,
            ),
        )
    db.commit()
