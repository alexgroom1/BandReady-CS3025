from __future__ import annotations

from flask import Blueprint, jsonify, request

from ..db import create_or_get_active_attempt, update_assessment_attempt, upsert_module_progress
from ..models import now_timestamp


progress_bp = Blueprint("progress", __name__)


@progress_bp.put("/api/learners/<learner_id>/modules/<module_id>/progress")
def update_module_progress(learner_id: str, module_id: str):
    payload = request.get_json(silent=True) or {}
    return jsonify(upsert_module_progress(learner_id, module_id, payload))


@progress_bp.post("/api/learners/<learner_id>/modules/<module_id>/assessment/start")
def start_assessment(learner_id: str, module_id: str):
    payload = request.get_json(silent=True) or {}
    started_at = payload.get("startedAt") or now_timestamp()
    return jsonify(create_or_get_active_attempt(learner_id, module_id, started_at))


@progress_bp.put("/api/learners/<learner_id>/modules/<module_id>/assessment/<int:attempt_id>")
def persist_assessment(learner_id: str, module_id: str, attempt_id: int):
    payload = request.get_json(silent=True) or {}
    return jsonify(update_assessment_attempt(learner_id, module_id, attempt_id, payload))
