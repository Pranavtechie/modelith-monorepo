/** @type {import('next').NextConfig} */
const nextConfig = {
	ssg: false,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
