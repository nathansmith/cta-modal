// =======
// Import.
// =======

const { join } = require('path');
const { readdirSync, readFileSync, writeFileSync } = require('fs');

// ==========
// Constants.
// ==========

const EMPTY_STRING = '';
const SPACE = ' ';

// =============================================
// Helper: minify CSS & HTML in a Web Component.
// =============================================

const minifyWebComponent = (pathToFolder) => {
  // Get files.
  const files = readdirSync(pathToFolder);

  // Loop through.
  files.forEach((file) => {
    // Encoding.
    const encoding = 'utf8';
    const options = { encoding };

    // JS file?
    if (file.match(/\.js$/)) {
      // Get file path.
      const pathToFile = join(pathToFolder, file);

      // Get file text.
      let t = readFileSync(pathToFile, options);

      // Globals without `window` prefix.
      t = t.replace(/window\./g, EMPTY_STRING);

      // Whitespace.
      t = t.trim();
      t = t.replace(/\\t/g, EMPTY_STRING);
      t = t.replace(/\\n/g, SPACE);
      t = t.replace(/\s+/g, SPACE);

      // CSS animation names.
      t = t.replace(/HIDE-DIALOG/g, 'a');
      t = t.replace(/SHOW-DIALOG/g, 'b');
      t = t.replace(/HIDE-OVERLAY/g, 'c');
      t = t.replace(/SHOW-OVERLAY/g, 'd');

      // CSS class names.
      t = t.replace(/cta-modal__close/g, 'c');
      t = t.replace(/cta-modal__dialog/g, 'd');
      t = t.replace(/cta-modal__focus-trap/g, 'f');
      t = t.replace(/cta-modal__overlay/g, 'o');
      t = t.replace(/cta-modal__scroll/g, 's');

      // Attributes.
      t = t.replace(/='-1'/g, '=-1');
      t = t.replace(/='0'/g, '=0');
      t = t.replace(/='c'/g, '=c');
      t = t.replace(/='d'/g, '=d');
      t = t.replace(/='f'/g, '=f');
      t = t.replace(/='o'/g, '=o');
      t = t.replace(/='s'/g, '=s');
      t = t.replace(/='button'/g, '=button');
      t = t.replace(/='dialog'/g, '=dialog');
      t = t.replace(/='display:none'/g, '=display:none');
      t = t.replace(/='false'/g, '=false');
      t = t.replace(/='hidden'/g, '=hidden');
      t = t.replace(/='modal'/g, '=modal');
      t = t.replace(/='true'/g, '=true');

      // Exclamation point.
      t = t.replace(/\s+!/g, '!');
      t = t.replace(/!\s+/g, '!');

      // Pound sign.
      t = t.replace(/\s+#/g, '#');
      t = t.replace(/#\s+/g, '#');

      // Multi-line strings.
      t = t.replace(/`\s+/g, '`');
      t = t.replace(/\s+`/g, '`');

      // "Less than" brackets.
      t = t.replace(/<\s+/g, '<');
      t = t.replace(/\s+</g, '<');

      // "Greater than" brackets.
      t = t.replace(/>\s+/g, '>');
      t = t.replace(/\s+>/g, '>');

      // Commas.
      t = t.replace(/,\s+/g, ',');
      t = t.replace(/\s+,/g, ',');

      // Colons.
      t = t.replace(/:\s+/g, ':');
      t = t.replace(/\s+:/g, ':');

      // Semicolons.
      t = t.replace(/;\s+/g, ';');
      t = t.replace(/\s+;/g, ';');

      // "Open" curly brackets.
      t = t.replace(/\s+{/g, '{');
      t = t.replace(/{\s+/g, '{');

      // "Close" curly brackets.
      t = t.replace(/\s+}/g, '}');
      t = t.replace(/}\s+/g, '}');

      // "Open" parenthesis.
      t = t.replace(/\s+\(/g, '(');
      t = t.replace(/\(\s+/g, '(');

      // "Close" parenthesis.
      t = t.replace(/\s+\)/g, ')');
      t = t.replace(/\)\s+/g, ')');

      // Last semicolon per block.
      t = t.replace(/;}/g, '}');

      // Overwrite file.
      writeFileSync(pathToFile, t, options);
    }
  });
};

// =======
// Export.
// =======

module.exports = { minifyWebComponent };
