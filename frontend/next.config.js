/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: '',
  basePath: '',
  webpack: (config, { dev }) => {
    return config;
  },
}

module.exports = nextConfig
