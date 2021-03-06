// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const core = require("@actions/core");
const { buildProject } = require("./code-build");
const assert = require("assert");

/* istanbul ignore next */
if (require.main === module) {
  run();
}

module.exports = run;

async function run() {
  try {
    const build = await buildProject();
    core.setOutput("aws-build-id", build.id);

    // Signal the outcome
    assert(
      build.buildStatus === "SUCCEEDED",
      `Build status: ${build.buildStatus}`
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}
