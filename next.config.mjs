/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true
    },
    async rewrites() {
        return [{
            source: '/es/:path*',
            destination: "http://101.43.216.60:9200/:path*"
        }];
    }
};

export default nextConfig;
