// DOM test setup: accessibility matchers (jest-axe).
const { toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);
