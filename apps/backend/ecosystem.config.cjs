module.exports = {
	apps: [
		{
			name: "modelith-monorepo-backend",
			script: "bun dist/index.js",
			interpreter: "none",
			env: {
				NODE_ENV: "production",
			},
		},
	],
};
