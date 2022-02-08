// =======
// Import.
// =======

const { copy } = require('fs-extra');

// =============
// Run commands.
// =============

copy('./coverage/lcov-report', './html/coverage');
copy('./dist', './html/dist');
