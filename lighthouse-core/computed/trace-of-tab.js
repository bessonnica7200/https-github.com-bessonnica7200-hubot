/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const makeComputedArtifact = require('./computed-artifact.js');
const LHError = require('../lib/lh-error.js');
const TraceProcessor = require('../lib/tracehouse/trace-processor.js');

// TraceProcessor throws generic errors, but we'd like our special localized and code-specific LHError
// objects to be thrown instead.
class LHTraceProcessor extends TraceProcessor {
  /**
   * @return {Error}
   */
  static createNoNavstartError() {
    return new LHError(LHError.errors.NO_NAVSTART);
  }

  /**
   * @return {Error}
   */
  static createNoFirstContentfulPaintError() {
    return new LHError(LHError.errors.NO_FCP);
  }

  /**
   * @return {Error}
   */
  static createNoTracingStartedError() {
    return new LHError(LHError.errors.NO_TRACING_STARTED);
  }
}


class TraceOfTab {
  /**
   * Finds key trace events, identifies main process/thread, and returns timings of trace events
   * in milliseconds since navigation start in addition to the standard microsecond monotonic timestamps.
   * @param {LH.Trace} trace
   * @return {Promise<LH.Artifacts.TraceOfTab>}
  */
  static async compute_(trace) {
    return LHTraceProcessor.computeTraceOfTab(trace);
  }
}

module.exports = makeComputedArtifact(TraceOfTab);
