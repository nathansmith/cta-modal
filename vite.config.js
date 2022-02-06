export default {
	server: {
		open: '/',
		port: 1234,
	},
	build: {
		outDir: 'html',
		rollupOptions: {
			input: 'index.html',
		},
	},
};
