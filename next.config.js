/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.iconscout.com",
      },
      {
        hostname: "utfs.io",
      },
    ],
  },
};

module.exports = nextConfig;
