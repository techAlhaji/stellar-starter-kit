# PowerShell script to invoke the deployed Counter contract.
$WorkspaceRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$BinDir = Join-Path $WorkspaceRoot "bin"
$StellarCli = Join-Path $BinDir "stellar.exe"

if (-not (Test-Path $StellarCli)) {
    $StellarCli = "stellar"
}

$DeploymentsFile = Join-Path $WorkspaceRoot "apps/web/src/generated/deployments.json"
if (-not (Test-Path $DeploymentsFile)) {
    Write-Error "Deployments file not found. Please deploy the contract first."
    exit 1
}

$Deployments = @{}
$DeploymentsObj = Get-Content $DeploymentsFile | ConvertFrom-Json
if ($DeploymentsObj) {
    foreach ($prop in $DeploymentsObj.psobject.properties) {
        $Deployments[$prop.Name] = $prop.Value
    }
}
$CounterDep = $Deployments["counter"]
$ContractId = ""
if ($CounterDep) {
    if ($CounterDep.contractId) {
        $ContractId = $CounterDep.contractId
    } elseif ($CounterDep.GetType().Name -eq "Hashtable" -and $CounterDep["contractId"]) {
        $ContractId = $CounterDep["contractId"]
    } else {
        $ContractId = $CounterDep.ToString()
    }
}

if (-not $ContractId) {
    Write-Error "Counter contract ID not found in deployments."
    exit 1
}

Write-Host "Invoking Counter contract (ID: $ContractId)..." -ForegroundColor Green

# 1. Initialize (if not already initialized)
Write-Host "`n1. Initializing contract with deployer account..."
# Check if owner is already set
$Owner = & $StellarCli contract invoke --id $ContractId --source-account deployer --network testnet -- get_owner
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to check owner."
    exit 1
}

if ($Owner -like "*null*" -or $Owner -eq "" -or $Owner -eq $null) {
    Write-Host "Owner is not set. Initializing..."
    # Get deployer address
    $DeployerAddress = & $StellarCli keys address deployer
    $DeployerAddress = $DeployerAddress.Trim()
    & $StellarCli contract invoke --id $ContractId --source-account deployer --network testnet -- initialize --owner $DeployerAddress
} else {
    Write-Host "Owner is already set: $Owner"
}

# 2. Get current count
Write-Host "`n2. Getting current count..."
$Count = & $StellarCli contract invoke --id $ContractId --source-account deployer --network testnet -- get_count
Write-Host "Current Count: $Count" -ForegroundColor Yellow

# 3. Increment counter
Write-Host "`n3. Incrementing counter..."
$NewCount = & $StellarCli contract invoke --id $ContractId --source-account deployer --network testnet -- increment
Write-Host "New Count: $NewCount" -ForegroundColor Yellow

# 4. Get count again
Write-Host "`n4. Getting count again..."
$CountAfter = & $StellarCli contract invoke --id $ContractId --source-account deployer --network testnet -- get_count
Write-Host "Final Count: $CountAfter" -ForegroundColor Yellow
