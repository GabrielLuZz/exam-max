#!/usr/bin/env bash
set -euo pipefail

echo "Verificando dependências..."

if ! command -v docker >/dev/null 2>&1; then
  echo "Erro: Docker não está instalado ou não está no PATH."
  exit 1
fi

COMPOSE_CMD=""
if docker compose version >/dev/null 2>&1; then
  COMPOSE_CMD="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE_CMD="docker-compose"
else
  echo "Erro: Docker Compose não encontrado (nem plugin nem binário)."
  exit 1
fi

if [ ! -f "docker-compose.yml" ]; then
  echo "Erro: docker-compose.yml não encontrado na raiz do projeto."
  exit 1
fi

echo "Iniciando containers com build (pode levar alguns minutos)..."
${COMPOSE_CMD} up --build