from __future__ import annotations

from flask import Blueprint, jsonify

from ..db import get_learners, get_learner_progress


learners_bp = Blueprint("learners", __name__)


@learners_bp.get("/api/learners")
def list_learners():
    return jsonify(get_learners())


@learners_bp.get("/api/learners/<learner_id>/progress")
def learner_progress(learner_id: str):
    return jsonify(get_learner_progress(learner_id))
