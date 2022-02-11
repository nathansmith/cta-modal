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

      // Trim last CSS semi-colon.
      fileText = fileText.replace(/;}/g, '}');
      fileText = fileText.replace(/;\s+}/g, '}');

      // Trim exclamation point.
      fileText = fileText.replace(/\s+!/g, '!');
      fileText = fileText.replace(/!\s+/g, '!');

      // Trim pound sign.
      fileText = fileText.replace(/\s+#/g, '#');
      fileText = fileText.replace(/#\s+/g, '#');

      // Trim multi-line strings.
      fileText = fileText.replace(/`\s+/g, '`');
      fileText = fileText.replace(/\s+`/g, '`');

      // Trim "less than" brackets.
      fileText = fileText.replace(/<\s+/g, '<');
      fileText = fileText.replace(/\s+</g, '<');

      // Trim "greater than" brackets.
      fileText = fileText.replace(/>\s+/g, '>');
      fileText = fileText.replace(/\s+>/g, '>');

      // Trim commas.
      fileText = fileText.replace(/,\s+/g, ',');
      fileText = fileText.replace(/\s+,/g, ',');

      // Trim colons.
      fileText = fileText.replace(/:\s+/g, ':');
      fileText = fileText.replace(/\s+:/g, ':');

      // Trim semicolons.
      fileText = fileText.replace(/;\s+/g, ';');
      fileText = fileText.replace(/\s+;/g, ';');

      // Trim "open" curly brackets.
      fileText = fileText.replace(/\s+{/g, '{');
      fileText = fileText.replace(/{\s+/g, '{');

      // Trim "close" curly brackets.
      fileText = fileText.replace(/\s+}/g, '}');
      fileText = fileText.replace(/}\s+/g, '}');

      // Trim "open" parenthesis.
      fileText = fileText.replace(/\s+\(/g, '(');
      fileText = fileText.replace(/\(\s+/g, '(');

      // Trim "close" parenthesis.
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
