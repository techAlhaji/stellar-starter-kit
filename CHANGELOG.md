# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Root `docker-compose.yml` to support declarative local Stellar Quickstart node management.
- Cross-platform PowerShell helper script `scripts/setup-local-node.ps1` for Windows developers.
- Root `package.json` command script `"node:local": "docker compose up -d"` for quick start-ups.
- Persistent ledger data volume mapping in local docker-compose configuration.

### Changed

- Updated `scripts/setup-local-node.sh` to check for Docker Compose and use it as default, falling back to raw `docker run` if compose is not present.
- Updated root `README.md` and `docs/development-guide.md` to include detailed instructions on running, managing, and shutting down the local Quickstart node.

## [0.1.0] - 2026-07-09

### Added

- Initial project workspace setup with `pnpm` and `Turborepo`.
- Next.js 15 application workspace scaffolding in `apps/web`.
- TailwindCSS, ESLint, Prettier, TypeScript, and Husky configuration.
- Comprehensive GitHub Issue Templates, Pull Request Template, and Actions workflow (CI).
- Initial project documentation: README, ARCHITECTURE, CONTRIBUTING, ROADMAP, SECURITY, and CODE_OF_CONDUCT.
