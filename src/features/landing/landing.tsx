import { Link } from "@tanstack/react-router";

import { ThemeToggle } from "#client/components/custom/theme-toggle";
import { Button } from "#client/components/ui/button";

export function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="font-mono text-sm font-medium">react-hono-template</span>
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
        <p className="text-muted-foreground font-mono text-xs tracking-[0.2em] uppercase">
          Full-stack TypeScript starter
        </p>
        <h1 className="mt-4 font-mono text-[clamp(2.75rem,8vw,5rem)] leading-[1.05] font-semibold tracking-tight">
          Everything wired.
          <br />
          Nothing extra.
          <span
            aria-hidden="true"
            className="cursor-blink ml-3 inline-block h-[0.75em] w-[0.45ch] translate-y-[0.06em] bg-current"
          />
        </h1>
        <p className="text-muted-foreground mt-6 max-w-prose text-lg leading-relaxed">
          React, Hono and Bun with auth, Postgres, queues, tests and CI already configured. Clone it
          and start shipping.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link to="/data-table-demo">View components</Link>
          </Button>
        </div>
      </main>

      <footer className="border-border border-t px-6 py-5 sm:px-10">
        <p className="text-muted-foreground font-mono text-xs">
          hono · tanstack · drizzle · better-auth · bun
        </p>
      </footer>
    </div>
  );
}
