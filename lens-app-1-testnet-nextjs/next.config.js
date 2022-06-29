/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.infura.io", "avatar.tobi.sh"],
  },
};

module.exports = nextConfig;
