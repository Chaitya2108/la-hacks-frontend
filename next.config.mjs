/** @type {import('next').NextConfig} */

const nextConfig = {
// allow images from discord
images: {
  domains: ['cdn.discordapp.com', 'localhost'],
},
    // bypass cors on localhost
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:path*',
            },
        ];
    },
};

export default nextConfig;
