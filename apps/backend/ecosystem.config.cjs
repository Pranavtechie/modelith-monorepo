module.exports = {
	apps: [
		{
			name: "modelith-monorepo-backend",
			script: "./server-executable-file",
			interpreter: "none",
			env: {
				NODE_ENV: "production",
			},
		},
	],
};
