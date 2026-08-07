# React + Hono Template

[![CI](https://github.com/zek01svg/react-hono-template/actions/workflows/ci.yml/badge.svg)](https://github.com/zek01svg/react-hono-template/actions/workflows/ci.yml)

A modern full-stack TypeScript template combining React frontend with Hono backend running on Bun, designed for rapid development and production-ready deployments.

---

## Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Start development services (Postgres, Maildev, MinIO)
docker compose up -d

# 3. Start development server (Frontend: 4000, Backend: 4001)
bun dev
```

---

## Common Scripts

| Command            | Action                                                          |
| :----------------- | :-------------------------------------------------------------- |
| `bun dev`          | Start frontend and backend development servers concurrently     |
| `bun build`        | Build production bundles (server executable & static React SPA) |
| `bun start`        | Run production server (`NODE_ENV=production bun dist/index.js`) |
| `bun test:unit`    | Run unit tests with Vitest                                      |
| `bun test:e2e`     | Run end-to-end browser tests with Playwright                    |
| `bun format:check` | Verify code formatting with **oxfmt**                           |
| `bun lint:check`   | Lint source files with **oxlint**                               |
| `bun type:check`   | Type-check project with `tsc --noEmit`                          |
| `bun db:push`      | Push Drizzle schema changes to PostgreSQL                       |
| `bun db:studio`    | Open interactive Drizzle Studio database browser                |

---

## Tech Stack

- **Frontend**: React 19, TanStack Router & Query, Vite, Tailwind CSS v4, Radix UI / shadcn.
- **Backend**: Hono web framework running on native Bun runtime.
- **Database & Auth**: PostgreSQL, Drizzle ORM, Better Auth.
- **API Specs & Observability**: hono-openapi, Scalar API docs, Logtape logging, Sentry error tracking.
- **Quality & CI**: Oxc (oxlint/oxfmt), Lefthook pre-commit hooks, Vitest, Playwright.

---

## Documentation

Detailed documentation is available in the [`docs/`](./docs) directory:

| Document                                         | Purpose                                                                                                          |
| :----------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| [**Architecture**](./docs/ARCHITECTURE.md)       | System design, component diagrams, runtime env injection (`/api/runtime.js`), telemetry, & auth model.           |
| [**Contributing Guide**](./docs/CONTRIBUTING.md) | Local setup, Docker services, code quality standards (oxlint/oxfmt), database migrations, & testing.             |
| [**Deployment Guide**](./docs/DEPLOYMENT.md)     | Multi-stage Docker build pipeline, production runtime configuration, & reverse proxy setup.                      |
| [**API Documentation**](./docs/API.md)           | Hono route definitions, OpenAPI specifications, interactive Scalar explorer UI (`/api/scalar`), & error schemas. |

---
