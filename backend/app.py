from __future__ import annotations

from flask import Flask, jsonify
from flask_cors import CORS

from .config import Config
from .db import close_db, init_db
from .routes.learners import learners_bp
from .routes.progress import progress_bp
from .routes.teacher import teacher_bp
from .seed import seed_learners


def create_app() -> Flask:
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(Config)

    CORS(
        app,
        supports_credentials=True,
        resources={r"/api/*": {"origins": [app.config["FRONTEND_ORIGIN"], "http://127.0.0.1:5173"]}},
    )

    app.teardown_appcontext(close_db)
    app.register_blueprint(learners_bp)
    app.register_blueprint(progress_bp)
    app.register_blueprint(teacher_bp)

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})

    with app.app_context():
        init_db()
        seed_learners()

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
