import { Context } from "probot";
import { LoggerWithTarget } from "probot/lib/wrap-logger";

import * as CheckSuite from "../../src/events/check_suite";
import CheckSuiteRequested from "../fixtures/events/check_suite.requested.json";
import CheckSuiteRerequested from "../fixtures/events/check_suite.rerequested.json";
import { createParams } from "../../src/checks_params";

describe("tests for 'check_suite.*'-events", async () => {
  const github: any = {
    checks: {
      create: jest.fn().mockResolvedValue(0)
    }
  };
  const log: LoggerWithTarget = new (jest.fn<LoggerWithTarget>())();

  test("'.requested' should create 'check_run'", async () => {
    await CheckSuite.requested(new Context(CheckSuiteRequested, github, log));
    expect(github.checks.create).toHaveBeenCalledTimes(1);
    expect(github.checks.create).toHaveBeenCalledWith({
      ...createParams(),
      owner: "username",
      repo: "repository",
      head_sha: "AAAAAAAAAAAAAAAAAAA"
    });
  });

  test("'.rerequested' should create 'check_run'", async () => {
    await CheckSuite.rerequested(
      new Context(CheckSuiteRerequested, github, log)
    );
    expect(github.checks.create).toHaveBeenCalledTimes(1);
    expect(github.checks.create).toHaveBeenCalledWith({
      ...createParams(),
      owner: "username",
      repo: "repository",
      head_sha: "BBBBBBBBBBBBBBBBBBBB"
    });
  });
});