# PowerShell script to start the local Stellar Quickstart node.
$ProgressPreference = 'SilentlyContinue'

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Starting Stellar Quickstart Node (Local)" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# Check if Docker is installed
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker is not installed or not in PATH. Please install Docker first."
    exit 1
}

# Path to docker-compose.yml
$ComposeFile = Resolve-Path (Join-Path $PSScriptRoot "..\docker-compose.yml") -ErrorAction SilentlyContinue
if (-not $ComposeFile) {
    $ComposeFile = Join-Path $PSScriptRoot "..\docker-compose.yml"
}

Write-Host "Starting container using Docker Compose..." -ForegroundColor Green
docker compose -f $ComposeFile up -d

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to start Docker Compose services."
    exit $LASTEXITCODE
}

Write-Host "`nStellar node is starting up in the background!" -ForegroundColor Green
Write-Host "You can access the services at:"
Write-Host " - Horizon API: http://localhost:8000" -ForegroundColor Yellow
Write-Host " - Soroban RPC: http://localhost:8000/soroban/rpc" -ForegroundColor Yellow
Write-Host "`nTo check status/logs, run:"
Write-Host " - docker compose logs -f stellar-quickstart" -ForegroundColor Gray
Write-Host "`nTo stop the node, run:"
Write-Host " - docker compose down" -ForegroundColor Gray
