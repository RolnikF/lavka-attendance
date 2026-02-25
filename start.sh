#!/bin/bash
# Запуск бэкенда в режиме production
cd /app && uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8001}