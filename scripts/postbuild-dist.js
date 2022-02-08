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
    ./dist/index.js
    --compress
    --mangle
    --ecma 2018
    --output ./dist/index.js
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
const pathToAssets = join(__dirname, '../dist');

// Minify JS.
minifyWebComponent(pathToAssets);
