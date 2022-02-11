// =======
// Import.
// =======

const { join } = require('path');
const { readdirSync, readFileSync, writeFileSync } = require('fs');

// =============================================
// Helper: minify CSS & HTML in a Web Component.
// =============================================

const minifyWebComponent = (pathToAssets) => {
  // Get files.
  const files = readdirSync(pathToAssets);

  // Loop through.
  files.forEach((file) => {
    // Encoding.
    const encoding = 'utf8';
    const options = { encoding };

    // JS file?
    if (file.match(/.js$/)) {
      // Get file path.
      const pathToFile = join(pathToAssets, file);

      // Get file text.
      let fileText = readFileSync(pathToFile, options);

      // Raw globals, without `window` prefix.
      fileText = fileText.replace(/window\./g, '');

      // Minify whitespace.
      fileText = fileText.trim();
      fileText = fileText.replace(/\\t/g, '');
      fileText = fileText.replace(/\\n/g, ' ');
      fileText = fileText.replace(/\s+/g, ' ');

      // Minify CSS class names.
      fileText = fileText.replace(/cta-modal__close/g, 'c');
      fileText = fileText.replace(/cta-modal__dialog/g, 'd');
      fileText = fileText.replace(/cta-modal__focus-trap/g, 'f');
      fileText = fileText.replace(/cta-modal__overlay/g, 'o');
      fileText = fileText.replace(/cta-modal__scroll/g, 's');

      // Minify CSS animation names.
      fileText = fileText.replace(/HIDE-DIALOG/g, 'HD');
      fileText = fileText.replace(/SHOW-DIALOG/g, 'SD');
      fileText = fileText.replace(/HIDE-OVERLAY/g, 'HO');
      fileText = fileText.replace(/SHOW-OVERLAY/g, 'SO');

      // Minify last CSS semi-colon.
      fileText = fileText.replace(/;}/g, '}');
      fileText = fileText.replace(/;\s+}/g, '}');

      // Minify exclamation point.
      fileText = fileText.replace(/\s+!/g, '!');
      fileText = fileText.replace(/!\s+/g, '!');

      // Minify pound sign.
      fileText = fileText.replace(/\s+#/g, '#');
      fileText = fileText.replace(/#\s+/g, '#');

      // Minify multi-line strings.
      fileText = fileText.replace(/`\s+/g, '`');
      fileText = fileText.replace(/\s+`/g, '`');

      // Minify "less than" brackets.
      fileText = fileText.replace(/<\s+/g, '<');
      fileText = fileText.replace(/\s+</g, '<');

      // Minify "greater than" brackets.
      fileText = fileText.replace(/>\s+/g, '>');
      fileText = fileText.replace(/\s+>/g, '>');

      // Minify commas.
      fileText = fileText.replace(/,\s+/g, ',');
      fileText = fileText.replace(/\s+,/g, ',');

      // Minify colons.
      fileText = fileText.replace(/:\s+/g, ':');
      fileText = fileText.replace(/\s+:/g, ':');

      // Minify semicolons.
      fileText = fileText.replace(/;\s+/g, ';');
      fileText = fileText.replace(/\s+;/g, ';');

      // Minify "open" curly brackets.
      fileText = fileText.replace(/\s+{/g, '{');
      fileText = fileText.replace(/{\s+/g, '{');

      // Minify "close" curly brackets.
      fileText = fileText.replace(/\s+}/g, '}');
      fileText = fileText.replace(/}\s+/g, '}');

      // Minify "open" parenthesis.
      fileText = fileText.replace(/\s+\(/g, '(');
      fileText = fileText.replace(/\(\s+/g, '(');

      // Minify "close" parenthesis.
      fileText = fileText.replace(/\s+\)/g, ')');
      fileText = fileText.replace(/\)\s+/g, ')');

      // Write new file.
      writeFileSync(pathToFile, fileText, options);
    }
  });
};

// =======
// Export.
// =======

module.exports = { minifyWebComponent };
