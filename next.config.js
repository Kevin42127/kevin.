/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental.appDir is no longer needed in Next.js 14+
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
