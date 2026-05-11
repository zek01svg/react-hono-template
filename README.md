# React + Hono Template

A modern full-stack TypeScript template combining React frontend with Hono backend, designed for rapid development and production deployment.

## How to Run

### Prerequisites

- Bun >=1.3.13

### Development

```bash
# Install dependencies
bun install

# Start development server (both frontend and backend)
bun dev
```

This will start:

- Backend server on http://localhost:4001
- Frontend dev server on http://localhost:4000 (proxies API calls to backend)

### Individual Components

```bash
# Start only the backend server
bun dev:server

# Start only the frontend (requires backend to be running)
bun dev:vite
```

### Production

```bash
# Build the application
bun build

# Start production server
bun start
```

## Tech Stack

### Frontend

- **React 19** - Latest React with concurrent features
- **TanStack Router** - Type-safe routing with file-based routing
- **TanStack Query** - Server state management and caching
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type safety across the entire stack

### Backend

- **Hono** - Fast, lightweight web framework for TypeScript
- **Bun** - Native runtime execution for maximum performance
- **Better Auth** - Production-ready authentication for Hono and React
- **Drizzle ORM** - Type-safe ORM for PostgreSQL
- **Scalar** - Beautiful, interactive API documentation at `/api/scalar`
- **hono-openapi** - Automated OpenAPI spec generation
- **Zod** - Schema validation and type inference
- **@t3-oss/env-core** - Type-safe environment variable validation

### Development Tools

- **Oxc (oxlint/oxfmt)** - Hyper-fast code linting and formatting
- **Vitest** - Fast unit testing framework
- **esbuild** - High-speed bundling for production builds
- **Lefthook** - Pre-commit quality gates

## Runtime Environment Variables (`/api/runtime.js`)

The template includes a special endpoint at `/api/runtime.js` that dynamically injects environment variables into the client at runtime. This script is loaded in `index.html`:

```html
<script type="text/javascript" src="/api/runtime.js"></script>
```

### Why This Exists

This pattern solves a critical problem with client-side environment variables in containerized/production deployments:

1. **Build-time vs Runtime**: Vite normally bakes environment variables into the bundle at build time via `import.meta.env`
2. **Container Flexibility**: With Docker/K8s, you want to build once and deploy anywhere with different env vars
3. **Dynamic Configuration**: The `/api/runtime.js` endpoint serves a JavaScript snippet that sets `window.__env` with current server environment variables

### How It Works

1. **Server endpoint** (`server/index.ts` lines 13-21):

   ```typescript
   .get("/api/runtime.js", (c) => {
     return c.text(
       `window.__env = ${JSON.stringify(
         Object.fromEntries(
           Object.entries(env).filter(([key]) => key.startsWith("VITE_"))
         ), null, 2
       )}`,
       200,
       { "Content-Type": "application/javascript" }
     );
   })
   ```

2. **Client consumption** (`src/env.ts`):

   ```typescript
   export const env: Env = {
     VITE_APP_URL: window.__env?.VITE_APP_URL ?? import.meta.env.VITE_APP_URL,
     // Falls back to build-time values if runtime values unavailable
   };
   ```

3. **Type safety**: Both server and client env configs use Zod schemas for validation

This approach provides:

- ✅ **Container-friendly**: Same build works across environments
- ✅ **Type-safe**: Full TypeScript support for env vars
- ✅ **Fallback support**: Works in development with build-time values
- ✅ **Secure**: Only `VITE_` prefixed variables are exposed to client

## Project Structure

```
react-hono-template/
├── .github/
│   └── workflows/         # CI workflow definitions
├── scripts/               # Utility scripts (e.g. db seed)
├── server/                # Backend Hono server
│   ├── database/          # Database schema and migrations
│   ├── lib/               # Server-side utilities (Auth, DB, Mailer, S3)
│   ├── env.ts             # Server environment validation
│   └── index.ts           # Main server entry point
├── shared/                # Code shared between server and client
│   └── constants/         # Shared constants (e.g. date presets)
├── src/                   # Frontend React application
│   ├── components/        # Reusable UI components (ui/, custom/, data-table/)
│   ├── features/          # Feature-based page components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Frontend utilities and shared logic
│   ├── providers/         # React context providers
│   ├── routes/            # File-based routing
│   ├── env.ts             # Client environment variables
│   ├── main.tsx           # React app entry point
│   └── globals.css        # Global styles
├── dist/                  # Production build output
└── tests/                 # Test files
```

## Scripts

- `bun dev` - Start development environment
- `bun build` - Build for production
- `bun start` - Start production server
- `bun test` - Run tests
- `bun lint` - Lint code with **oxlint**
- `bun format` - Check code formatting with **oxfmt**
- `bun typecheck` - Run TypeScript type checking
- `bun db:push` - Sync database schema with Drizzle
- `bun db:studio` - Open Drizzle Studio for database inspection
- `bun auth:generate` - Generate Better Auth client
- `bun ui:add` - Add shadcn/ui components
- `bun clean` - Clean build artifacts and dependencies

## CI/CD

The template ships with a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on every push and pull request:

- **Secret scanning** - gitleaks checks for accidentally committed secrets
- **Format check** - oxfmt verifies consistent code style
- **Lint** - oxlint enforces code quality rules
- **Type check** - `tsc --noEmit` catches type errors
- **Tests** - Vitest runs the test suite
- **Build** - verifies the production bundle compiles without errors

## Environment Variables

Create a `.env` file in the root directory:

```env
# Required for client
VITE_APP_URL=http://localhost:4000

# Server configuration
NODE_ENV=development
```

All `VITE_` prefixed variables are automatically exposed to the client through the runtime.js mechanism.
