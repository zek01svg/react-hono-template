# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-04-22

### Added

- **API Documentation**: Integrated interactive Scalar UI at `/api/scalar` powered by `hono-openapi`.
- **Feature Modules**: Implemented feature-based directory structure (`src/features/`) with new Landing Page and Not Found components.
- **Structured Validation**: Added a global error handler for schema validation failures with consistent JSON responses.
- **Tooling**: Added lint-staged and husky for pre-commit quality gates.

### Changed

- **Performance**: Migrated backend server to the Bun-native runtime, removing the `@hono/node-server` dependency.
- **Tooling**: Migrated from ESLint and Prettier to the Oxc suite (`oxlint` and `oxfmt`) for near-instant developer feedback loops.
- **Project Structure**: Refined organization of server libraries and frontend features.

---

## [1.0.0] - 2025-10-15

### Added

- **Initial Release**: Baseline full-stack foundation for React and Hono.
- **Authentication**: Native integration with Better Auth for secure user management.
- **Persistence**: Built-in support for Drizzle ORM and PostgreSQL.
- **Routing**: Type-safe, file-based routing using TanStack Router.
- **Styling**: Modern, utility-first design system with Tailwind CSS v4.
- **Runtime Configuration**: Dynamic environment variable injection mechanism for flexible deployments.
