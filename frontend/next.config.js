/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  generateEtags: false,
  webpack: (config, { dev }) => {
    return config;
  },
}

module.exports = nextConfig
