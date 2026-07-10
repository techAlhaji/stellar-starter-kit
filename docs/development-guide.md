# Local Development Guide

Welcome to the `stellar-starter-kit` developer documentation! This guide explains how to configure your local machine for developing Stellar and Soroban smart contract applications.

---

## 1. Running Stellar Quickstart

For local development, it is highly recommended to run a local node rather than testing directly on Testnet or Futurenet. We use the official Stellar Quickstart Docker image.

### Start the Local Node

You can spin up the node in three ways depending on your workflow and OS:

#### Option A: Using pnpm Script (Recommended)

This runs Docker Compose in the background:

```bash
pnpm run node:local
```

#### Option B: Using Setup Scripts

Run the helper setup script for your platform:

- **Windows (PowerShell)**:
  ```powershell
  ./scripts/setup-local-node.ps1
  ```
- **macOS / Linux (Bash)**:
  ```bash
  ./scripts/setup-local-node.sh
  ```

#### Option C: Direct Docker Compose

```bash
docker compose up -d
```

### Horizon and RPC Endpoints

Once running, the following local services are available:

- **Horizon API Gateway**: `http://localhost:8000`
- **Soroban RPC Gateway**: `http://localhost:8000/soroban/rpc`

### Stop the Local Node

To stop the background node and clean up the container resources, run:

```bash
docker compose down
```

---

## 2. Soroban Smart Contract Scaffolding

To write and compile Soroban smart contracts, you must install the Rust toolchain and the Soroban CLI.

### Install Rust

Follow the instructions at [rustup.rs](https://rustup.rs/).

### Install Soroban CLI

```bash
cargo install --locked soroban-cli
```

### Deploying a Contract

1. Build contract WASM:
   ```bash
   cargo build --target wasm32-unknown-unknown --release
   ```
2. Deploy to local/testnet:
   ```bash
   soroban contract deploy \
     --wasm target/wasm32-unknown-unknown/release/my_contract.wasm \
     --source alice \
     --network testnet
   ```
