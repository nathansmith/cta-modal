module.exports = {
	env: {
		browser: true,
		jest: true,
		node: true,
	},
	extends: [
		// React & Prettier.
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	ignorePatterns: [
		// Exclude generated files.
		'/build',
		'/coverage',
		'/dist',
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'func-style': [
			'error',
			'expression',
			{
				allowArrowFunctions: true,
			},
		],
		'no-console': [
			'error',
			{
				allow: ['warn', 'error'],
			},
		],
		'no-var': 'error',
		'no-unused-vars': 'error',
		'prefer-arrow-callback': 'error',
		'prefer-const': 'error',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
