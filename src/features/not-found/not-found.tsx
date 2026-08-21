import { Link } from "@tanstack/react-router";

import { Button } from "#client/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="text-muted-foreground font-mono text-xs tracking-[0.2em] uppercase">Error</p>
      <h1 className="mt-4 font-mono text-7xl font-semibold tracking-tight">404</h1>
      <p className="text-muted-foreground mt-4 max-w-prose">This page doesn&apos;t exist.</p>
      <div className="mt-8">
        <Button asChild>
          <Link to="/">Back to start</Link>
        </Button>
      </div>
    </div>
  );
}
