import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Remove unsupported experimental options
  output: 'standalone', // Use standalone mode for Netlify compatibility
};

export default nextConfig;
