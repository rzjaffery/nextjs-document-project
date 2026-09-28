import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '*.comicvine.com',
            },
            {
                protocol: 'https',
                hostname: '*.comicvine.com',
            },
            {
                protocol: 'https',
                hostname: 'comicvine.gamespot.com',
            },
            {
                protocol: 'https',
                hostname: '*.cbsistatic.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
