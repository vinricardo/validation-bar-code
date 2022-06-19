const Jasmine = require("jasmine");
const jasmine = new Jasmine();
jasmine.loadConfig({
  spec_dir: "specs",
  spec_files: ["**/*[sS]pec.js"],
  helpers: ["helpers/**/*.js"],
  random: false,
  seed: null,
  stopSpecOnExpectationFailure: false,
});
jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

const JasmineConsoleReporter = require("jasmine-console-reporter");
const reporter = new JasmineConsoleReporter({
  colors: 1,
  cleanStack: 1,
  verbosity: 4,
  listStyle: "indent",
  timeUnit: "ms",
  timeThreshold: { ok: 500, warn: 1000, ouch: 3000 },
  activity: true,
  emoji: true,
  beep: true,
});

jasmine.env.clearReporters();
jasmine.addReporter(reporter);
jasmine.execute();
