# BandReady Makefile — works on Windows (Git Bash / WSL) and macOS/Linux
# On Windows: use Git Bash, WSL, or ensure make uses a Unix-like shell (SHELL).

# OS detection: Windows_NT is set on Windows
ifeq ($(OS),Windows_NT)
    PYTHON ?= python
    VENV_PYTHON := backend/venv/Scripts/python.exe
    VENV_PIP := backend/venv/Scripts/pip.exe
else
    PYTHON ?= python3
    VENV_PYTHON := backend/venv/bin/python
    VENV_PIP := backend/venv/bin/pip
endif

VENV_DIR := backend/venv
REQUIREMENTS := backend/requirements.txt

# Use a single shell for all recipes (Git Bash on Windows, /bin/sh on macOS/Linux)
SHELL := /bin/sh

.PHONY: install run run-backend run-frontend venv clean

# Create venv, install backend deps, and run npm install
install: venv
	$(VENV_PIP) install -r $(REQUIREMENTS)
	npm install

# Ensure venv exists (create if not) — uses Make's wildcard so no shell-specific test
venv:
ifeq ($(wildcard $(VENV_PYTHON)),)
	$(PYTHON) -m venv $(VENV_DIR)
	@echo "Created virtualenv at $(VENV_DIR)"
else
	@echo "Virtualenv already exists at $(VENV_DIR)"
endif

# Run backend and frontend (backend in background, frontend in foreground)
run: venv
	@echo "Starting backend..."
	@$(VENV_PYTHON) -m backend.app & \
	echo "Starting frontend..." && \
	npm run dev

# Run only the backend (uses venv)
run-backend: venv
	$(VENV_PYTHON) -m backend.app

# Run only the frontend
run-frontend:
	npm run dev

# Remove virtualenv (optional)
clean:
	rm -rf $(VENV_DIR)
