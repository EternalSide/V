/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["i.pinimg.com", "img.clerk.com", "files.edgestore.dev"],
	},
	experimental: {
		serverActions: true,
		mdxRs: true,
		serverComponentsExternalPackages: ["mongoose"],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
