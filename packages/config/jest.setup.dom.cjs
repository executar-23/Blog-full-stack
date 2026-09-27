// DOM test setup: DOM matchers (jest-dom) and accessibility matchers (jest-axe).
require('@testing-library/jest-dom');
const { toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);
