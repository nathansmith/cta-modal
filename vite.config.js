export default {
	server: {
		open: '/',
		port: 1234,
	},
	build: {
		outDir: 'build',
		rollupOptions: [
			{
				input: 'index.html',
			},
		],
	},
};
