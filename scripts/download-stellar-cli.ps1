# PowerShell script to download and unpack the prebuilt stellar-cli for Windows.
$ProgressPreference = 'SilentlyContinue'

$Version = "27.0.0"
$Url = "https://github.com/stellar/stellar-cli/releases/download/v$Version/stellar-cli-$Version-x86_64-pc-windows-msvc.tar.gz"
$BinDir = Resolve-Path (Join-Path $PSScriptRoot "..\bin") -ErrorAction SilentlyContinue
if (-not $BinDir) {
    $BinDir = Join-Path $PSScriptRoot "..\bin"
    New-Item -ItemType Directory -Path $BinDir | Out-Null
}
$TarPath = Join-Path $BinDir "stellar-cli.tar.gz"

if (Test-Path $TarPath) {
    Remove-Item $TarPath -Force
}

if (Test-Path (Join-Path $BinDir "stellar.exe")) {
    Write-Host "Stellar CLI is already present in bin/stellar.exe"
    exit 0
}

Write-Host "Downloading Stellar CLI v$Version from $Url (Silent Progress)..."
# Use TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $Url -OutFile $TarPath -UseBasicParsing

Write-Host "Extracting archive..."
# tar.exe is standard on Windows 10+
tar -zxf $TarPath -C $BinDir

Write-Host "Cleaning up archive..."
Remove-Item $TarPath

$ExtractedDir = Join-Path $BinDir "stellar-cli-$Version-x86_64-pc-windows-msvc"
if (Test-Path $ExtractedDir) {
    Move-Item (Join-Path $ExtractedDir "stellar.exe") (Join-Path $BinDir "stellar.exe") -Force
    Remove-Item $ExtractedDir -Recurse -Force
}

if (Test-Path (Join-Path $BinDir "stellar.exe")) {
    Write-Host "Stellar CLI installed successfully at: $BinDir\stellar.exe"
} else {
    Write-Error "stellar.exe was not found after extraction."
    exit 1
}
