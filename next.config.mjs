/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'img.alicdn.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'pimg.damai.cn',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'wticket.chncpa.org',
                port: '',
            },
            {
                protocol: 'https',
                hostname: '**.meituan.net',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'img.lengliwh.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'cdn.ticketmars.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'img01.yzcdn.cn',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'cdn.ticketmars.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: '**.piaoxingqiu.cn',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 's2.showstart.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: '**.livelab.com.cn',
                port: '',
            },
        ],
    },
    async rewrites() {
        return [{
            source: '/es/:path*',
            destination: 'http://101.43.216.60:9200/:path*'
        }];
    }
};

export default nextConfig;
