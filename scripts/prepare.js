// =======
// Import.
// =======

const { execSync } = require('child_process');
const { existsSync } = require('fs');

// ===========
// File paths.
// ===========

const FILE_COMMIT = './.husky/pre-commit';
const FILE_HUSKY = './.husky/_/husky.sh';

// =========
// Commands.
// =========

const CLI_COMMIT = 'npx husky add .husky/pre-commit "npx lint-staged"';
const CLI_HUSKY = 'npx husky install';

// ==============
// Husky install.
// ==============

if (!existsSync(FILE_HUSKY)) {
  global.console.log(CLI_HUSKY);
  execSync(CLI_HUSKY);
}

// ====================
// Add pre-commit hook.
// ====================

if (!existsSync(FILE_COMMIT)) {
  global.console.log(CLI_COMMIT);
  execSync(CLI_COMMIT);
}
