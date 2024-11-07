module.exports = {
	apps: [
		{
			name: "modelith-monorepo-backend",
			script: "bun dist/index.js",
			interpreter: "bun",
			env: {
				NODE_ENV: "production",
			},
		},
	],
};
