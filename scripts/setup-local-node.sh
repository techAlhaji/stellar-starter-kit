#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Starting Stellar Quickstart Node (Local)"
echo "========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: docker is not installed. Please install docker first."
    exit 1
fi

# Run the container using docker compose if available, otherwise fall back to docker run
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
COMPOSE_FILE="$SCRIPT_DIR/../docker-compose.yml"

if docker compose version &>/dev/null; then
    echo "Starting container using Docker Compose..."
    docker compose -f "$COMPOSE_FILE" up -d
    echo "Stellar node is starting up in the background!"
    echo "You can access the services at:"
    echo " - Horizon API: http://localhost:8000"
    echo " - Soroban RPC: http://localhost:8000/soroban/rpc"
    echo ""
    echo "To check status/logs, run:"
    echo " - docker compose logs -f stellar-quickstart"
    echo ""
    echo "To stop the node, run:"
    echo " - docker compose down"
else
    echo "Docker Compose not detected. Falling back to standard docker run..."
    docker run --rm -it \
      --name stellar-quickstart \
      -p 8000:8000 \
      stellar/quickstart:latest \
      --local
fi
