// =======
// Import.
// =======

const esbuild = require('esbuild');

// =========
// Commands.
// =========

const commands = {
  entryPoints: ['./src/assets/ts/cta-modal.ts'],
  target: [
    // Modern browsers.
    'chrome98',
    'edge98',
    'firefox97',
    'safari15',
  ],
  outfile: './dist/cta-modal.js',
};

// =============
// Run commands.
// =============

global.console.log('running esbuild…');
esbuild.build(commands);
