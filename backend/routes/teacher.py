from __future__ import annotations

from functools import wraps

from flask import Blueprint, current_app, jsonify, request, session

from ..db import get_teacher_dashboard


teacher_bp = Blueprint("teacher", __name__)


def require_teacher_auth(handler):
    @wraps(handler)
    def wrapped(*args, **kwargs):
        if not session.get("teacher_authenticated"):
            return jsonify({"error": "Teacher authentication required"}), 401
        return handler(*args, **kwargs)

    return wrapped


@teacher_bp.post("/api/teacher/login")
def teacher_login():
    payload = request.get_json(silent=True) or {}
    authenticated = payload.get("pin") == current_app.config["TEACHER_PIN"]
    session["teacher_authenticated"] = authenticated
    return jsonify({"authenticated": authenticated})


@teacher_bp.post("/api/teacher/logout")
def teacher_logout():
    session["teacher_authenticated"] = False
    return jsonify({"authenticated": False})


@teacher_bp.get("/api/teacher/dashboard")
@require_teacher_auth
def teacher_dashboard():
    module_titles = request.args.to_dict()
    return jsonify(get_teacher_dashboard(module_titles))
