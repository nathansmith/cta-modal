// =======
// Import.
// =======

const { join } = require('path');
const { execSync } = require('child_process');
const { minifyWebComponent } = require('./minifyWebComponent');

// =========
// Commands.
// =========

let CLI_COMMAND = `
  terser
  ./dist/cta-modal.js
  --compress booleans_as_integers=true
  --ecma 2020
  --mangle
  --mangle-props regex=/^_/
  --output ./dist/cta-modal.js
`;

CLI_COMMAND = CLI_COMMAND.trim().replace(/\s+/g, ' ');

// =============
// Run commands.
// =============

global.console.log(CLI_COMMAND);
execSync(CLI_COMMAND);

// ============================
// Minify JS template literals.
// ============================

// Get directory.
const pathToFolder = join(__dirname, '../dist');

// Minify JS.
minifyWebComponent(pathToFolder);
