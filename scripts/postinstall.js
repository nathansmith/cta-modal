// =======
// Import.
// =======

const { existsSync } = require('fs');
const { execSync } = require('child_process');

// ================
// Check existence.
// ================

const distFolderExists = existsSync('dist');
const srcFolderExists = existsSync('src');

// =============
// CLI commands.
// =============

const COMMAND_COPY = 'mv ./dist/* ./';
const COMMAND_DELETE = 'rimraf ./dist';

/*
=====
NOTE:
=====

	We only want to do cleanup if we are in the
	"distribution" mode. Ignore if "source" mode.
*/
const doCleanup = distFolderExists && !srcFolderExists;

// Cleanup necessary?
if (doCleanup) {
	execSync(COMMAND_COPY);
	execSync(COMMAND_DELETE);
}
