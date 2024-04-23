/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    instrumentationHook: true,
    serverActions: {
      allowedOrigins: ['localhost:8080'],
    },
  },
};

export default nextConfig;
