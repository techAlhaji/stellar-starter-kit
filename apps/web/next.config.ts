import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@stellar-starter-kit/ui',
    '@stellar-starter-kit/wallets',
    '@stellar-starter-kit/contracts',
  ],
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@stellar-starter-kit/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@stellar-starter-kit/wallets': path.resolve(__dirname, '../../packages/wallets/src'),
      '@stellar-starter-kit/contracts': path.resolve(__dirname, '../../packages/contracts/src'),
    };
    return config;
  },
};

export default nextConfig;
