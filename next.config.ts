import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'comicvine.gamespot.com',
            },
            {
                protocol: 'https',
                hostname: '*.cbsistatic.com',
            },
        ],
    },
};

export default nextConfig;
