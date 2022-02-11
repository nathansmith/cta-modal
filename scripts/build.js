// =======
// Import.
// =======

const { execSync } = require('child_process');

// =========
// Commands.
// =========

let CLI_COMMAND = `
  npm run build-dist

  &&

  npm run build-html
`;

CLI_COMMAND = CLI_COMMAND.trim().replace(/\s+/g, ' ');

// =============
// Run commands.
// =============

global.console.log(CLI_COMMAND);
execSync(CLI_COMMAND);
