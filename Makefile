# BandReady Makefile — works on Windows (Git Bash / WSL) and macOS/Linux
# On Windows: use Git Bash, WSL, or ensure make uses a Unix-like shell (SHELL).

# OS detection: Windows_NT is set on Windows
ifeq ($(OS),Windows_NT)
    DETECTED_OS := Windows
    PYTHON ?= python
    VENV_ACTIVATE := venv\Scripts\activate
    VENV_PYTHON := venv\Scripts\python
    VENV_PIP := venv\Scripts\pip
    PATH_SEP := \\
    MKDIR := mkdir
    RM := rmdir /s /q
    VENV_DIR := venv
else
    DETECTED_OS := Linux
    PYTHON ?= python3
    VENV_ACTIVATE := venv/bin/activate
    VENV_PYTHON := venv/bin/python
    VENV_PIP := venv/bin/pip
    PATH_SEP := /
    MKDIR := mkdir -p
    RM := rm -rf
    VENV_DIR := venv
endif

REQUIREMENTS := backend/requirements.txt

# Use a single shell for all recipes (Git Bash on Windows, /bin/sh on macOS/Linux)
SHELL := /bin/sh

.PHONY: install run run-backend run-frontend venv clean

# Create venv, install backend deps, and run npm install
install: venv
	$(VENV_PIP) install -r $(REQUIREMENTS)
	npm install

# Ensure venv exists (create if not). Use forward slashes for wildcard (works on Windows too).
venv:
ifeq ($(OS),Windows_NT)
ifeq ($(wildcard $(VENV_DIR)/Scripts/python.exe),)
	$(PYTHON) -m venv $(VENV_DIR)
	@echo "Created virtualenv at $(VENV_DIR)"
else
	@echo "Virtualenv already exists at $(VENV_DIR)"
endif
else
ifeq ($(wildcard $(VENV_DIR)/bin/python),)
	$(PYTHON) -m venv $(VENV_DIR)
	@echo "Created virtualenv at $(VENV_DIR)"
else
	@echo "Virtualenv already exists at $(VENV_DIR)"
endif
endif

# Run frontend and backend (frontend in background, backend in foreground)
run: venv
	@echo "Starting frontend..."
	@npm run dev & \
	echo "Starting backend..." && \
	$(VENV_PYTHON) -m backend.app

# Run only the backend (uses venv)
run-backend: venv
	$(VENV_PYTHON) -m backend.app

# Run only the frontend
run-frontend:
	npm run dev

# Remove virtualenv (optional)
clean:
	$(RM) $(VENV_DIR)
