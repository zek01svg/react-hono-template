import { env } from "#server/env.ts";
import { auth } from "#server/lib/auth.ts";
import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { describeRoute, openAPIRouteHandler } from "hono-openapi";
import { serveStatic } from "hono/bun";

const app = new Hono();

const baseRoutes = new Hono()
  .get(
    "/health",
    describeRoute({
      description: "Health check endpoint",
      responses: {
        200: {
          description: "Returns the health status of the server",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", example: "ok" },
                },
              },
            },
          },
        },
      },
    }),
    (c) => {
      return c.json({
        status: "ok",
      });
    },
  )
  .get("/api/runtime.js", (c) => {
    return c.text(
      `
    window.__env = ${JSON.stringify(Object.fromEntries(Object.entries(env).filter(([key]) => key.startsWith("VITE_"))), null, 2)}
    `.trim(),
      200,
      { "Content-Type": "application/javascript" },
    );
  })
  .on(["POST", "GET"], "/api/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .use("/assets/*", serveStatic({ root: "./dist/static" }))
  .use("/*", serveStatic({ root: "./dist/static" }))
  .get("*", serveStatic({ path: "./dist/static/index.html" }));

const apiRoutes = new Hono()
  .get(
    "/openapi",
    openAPIRouteHandler(app, {
      documentation: {
        info: {
          title: "React Hono API",
          version: "1.0.0",
          description: "API Documentation for the React Hono Template",
        },
        servers: [
          {
            url: `http://localhost:4001`,
            description: "Local Development Server",
          },
        ],
      },
    }),
  )
  .get(
    "/scalar",
    Scalar({
      url: "/api/openapi",
      theme: "deepSpace",
    }),
  );

app.route("/api", apiRoutes);
app.route("/", baseRoutes);

app.onError((err, c) => {
  if (err instanceof Error && err.name === "ValidationError") {
    return c.json(
      {
        error: "Validation failed",
        details: err.message,
      },
      400,
    );
  }
  console.error(err);
  return c.json(
    {
      error: "Internal Server Error",
      message: err.message,
    },
    500,
  );
});

const server = {
  port: 4001,
  fetch: app.fetch,
};

console.log(`App is running on port 4001`);

export default server;
