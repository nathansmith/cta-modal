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

			// Minify whitespace.
			fileText = fileText.trim();
			fileText = fileText.replace(/\s+/g, ' ');

			// Trim string start.
			fileText = fileText.replace(/` /g, '`');

			// Trim string end.
			fileText = fileText.replace(/ `/g, '`');

			// Trim "less than" brackets.
			fileText = fileText.replace(/< /g, '<');
			fileText = fileText.replace(/ </g, '<');

			// Trim "greater than" brackets.
			fileText = fileText.replace(/> /g, '>');
			fileText = fileText.replace(/ >/g, '>');

			// Trim commas.
			fileText = fileText.replace(/, /g, ',');
			fileText = fileText.replace(/ ,/g, ',');

			// Trim colons.
			fileText = fileText.replace(/: /g, ':');
			fileText = fileText.replace(/ :/g, ':');

			// Trim semicolons.
			fileText = fileText.replace(/; /g, ';');
			fileText = fileText.replace(/ ;/g, ';');

			// Trim "open" curly brackets.
			fileText = fileText.replace(/ {/g, '{');
			fileText = fileText.replace(/{ /g, '{');

			// Trim "close" curly brackets.
			fileText = fileText.replace(/ }/g, '}');
			fileText = fileText.replace(/} /g, '}');

			// Write new file.
			writeFileSync(pathToFile, fileText, options);
		}
	});
};

// =======
// Export.
// =======

module.exports = { minifyWebComponent };
