// =======
// Import.
// =======

const { execSync } = require('child_process');

// =========
// Commands.
// =========

let CLI_COMMAND = `
  prettier
  --write
  ./*.{css,html,js,json,md,scss,ts}
  **/*.{css,html,js,json,md,scss,ts}
`;

CLI_COMMAND = CLI_COMMAND.trim().replace(/\s+/g, ' ');

// =============
// Run commands.
// =============

global.console.log(CLI_COMMAND);
execSync(CLI_COMMAND);
