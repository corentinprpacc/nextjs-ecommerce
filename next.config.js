/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
})

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.nike.com",
        port: "",
      },
    ],
  },
}

module.exports = withPWA(nextConfig)
