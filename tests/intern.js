
const unitTests = [
  'tests/unit/01-root-equal',
  'tests/unit/02-root-attr',
  'tests/unit/03-child-equal',
  'tests/unit/04-child-attr',
  'tests/unit/05-child-multi',
  'tests/unit/06-child-reorder',
  'tests/unit/07-deep-equal',
  'tests/unit/08-deep-inequal',
  'tests/unit/09-dom-root',
  'tests/unit/10-dom-attr',
  'tests/unit/11-huge-tree',
];

//const unitTests = require('fs').readdirSync('./unit');
// Learn more about configuring this file at <https://theintern.github.io/intern/#configuration>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites
define({
  // Non-functional test suite(s) to run in each browser
  suites: unitTests,

  reporters: [
    { id: 'Pretty' }
  ],

  // A regular expression matching URLs to files that should not be included in code coverage analysis
  excludeInstrumentation: /^(?:tests|node_modules)\//
});
