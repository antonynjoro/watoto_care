/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.googleusercontent.com',
          port: '',
          pathname: '**',
        },
        {protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '**',}
      ],
    },
    experimental: {
      serverActions: true
    },
  };
  
  module.exports = nextConfig;
  