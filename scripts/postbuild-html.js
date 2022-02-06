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
	html-minifier
	--input-dir ./html
	--output-dir ./html
	--file-ext html
	--collapse-whitespace
	--decode-entities
	--minify-css true
	--minify-js true
	--remove-comments
	--remove-redundant-attributes
	--remove-script-type-attributes
	--remove-style-link-type-attributes
	--use-short-doctype
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
const pathToAssets = join(__dirname, '../html/assets');

// Minify JS.
minifyWebComponent(pathToAssets);
