module.exports = {
	apps: [
		{
			name: "modelith-monorepo-backend",
			script: "./server",
			interpreter: "none",
			args: ["arg1", "arg2"],
			env: {
				NODE_ENV: "production",
			},
		},
	],
};
