/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 對靜態網站部署非常重要
  reactStrictMode: false,
  eslint: {
    // ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // 靜態輸出需要
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    unoptimized: true,
  },
  // output: 'export', // don't use with `next start` or api route
  // distDir: 'dist',
  // avoid cors with proxy
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3005/:path*', // Proxy to Backend
  //     },
  //   ]
  // },
}

module.exports = nextConfig
