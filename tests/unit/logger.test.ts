import { beforeEach, describe, expect, it, vi } from "vitest";
import { configureAppLogging } from "../../shared/logger";

const { configureSync, getConsoleSink, getLogger, getSentrySink, withFilter } = vi.hoisted(() => ({
  configureSync: vi.fn<(config: unknown) => void>(),
  getConsoleSink: vi.fn<() => unknown>(),
  getLogger: vi.fn<(category: string[]) => unknown>(),
  getSentrySink: vi.fn<(options: unknown) => unknown>(),
  withFilter: vi.fn<(sink: unknown, filter: unknown) => unknown>(),
}));

vi.mock("@logtape/logtape", () => ({
  configureSync,
  getConsoleSink,
  getLogger,
  withFilter,
}));

vi.mock("@logtape/sentry", () => ({
  getSentrySink,
}));

describe("configureAppLogging", () => {
  const consoleSink = vi.fn<() => void>();
  const filteredConsoleSink = vi.fn<() => void>();
  const sentrySink = vi.fn<() => void>();

  beforeEach(() => {
    vi.clearAllMocks();
    getConsoleSink.mockReturnValue(consoleSink);
    withFilter.mockReturnValue(filteredConsoleSink);
    getSentrySink.mockReturnValue(sentrySink);
  });

  it("configures development console logging without sentry sink", () => {
    configureAppLogging({
      runtime: "browser",
      isDevelopment: true,
      enableSentrySink: false,
    });

    expect(getConsoleSink).toHaveBeenCalledTimes(1);
    expect(withFilter).not.toHaveBeenCalled();
    expect(getSentrySink).not.toHaveBeenCalled();
    expect(configureSync).toHaveBeenCalledWith(
      expect.objectContaining({
        sinks: {
          console: consoleSink,
        },
      })
    );

    const config = configureSync.mock.calls[0][0];
    expect(config.loggers[0]).toEqual(
      expect.objectContaining({
        category: [],
        sinks: ["console"],
        lowestLevel: "debug",
      })
    );
  });

  it("configures production with sentry and warning-only console sink", () => {
    configureAppLogging({
      runtime: "server",
      isDevelopment: false,
      enableSentrySink: true,
    });

    expect(getConsoleSink).toHaveBeenCalledTimes(1);
    expect(withFilter).toHaveBeenCalledWith(consoleSink, "warning");
    expect(getSentrySink).toHaveBeenCalledWith({
      enableBreadcrumbs: true,
    });
    expect(configureSync).toHaveBeenCalledTimes(1);

    const config = configureSync.mock.calls[0][0];
    expect(config.sinks).toEqual({
      console: filteredConsoleSink,
      sentry: sentrySink,
    });
    expect(config.loggers[0]).toEqual(
      expect.objectContaining({
        category: [],
        sinks: ["console", "sentry"],
        lowestLevel: "info",
      })
    );
  });
});
