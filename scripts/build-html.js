// =======
// Import.
// =======

const { execSync } = require('child_process');

// =========
// Commands.
// =========

let CLI_COMMAND = `
  vite build
  --base=./
  --config vite.config.js
`;

CLI_COMMAND = CLI_COMMAND.trim().replace(/\s+/g, ' ');

// =============
// Run commands.
// =============

global.console.log(CLI_COMMAND);
execSync(CLI_COMMAND);
