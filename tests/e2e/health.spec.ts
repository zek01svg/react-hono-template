import { expect, test } from "@playwright/test";

test.describe("Health Check E2E", () => {
  test("returns healthy response from server endpoint", async ({ request }) => {
    const response = await request.get("/health");
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual({ status: "ok" });
  });
});
