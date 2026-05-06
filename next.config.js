/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // Force non-www → www (fixes duplicate page / canonical issue)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'pida-lab.com' }],
        destination: 'https://www.pida-lab.com/:path*',
        permanent: true,   // 301 redirect — tells Google which is canonical
      },
    ]
  },
}

module.exports = nextConfig
