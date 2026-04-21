import { LandingPage } from "#client/features/landing/landing";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingPage,
});
