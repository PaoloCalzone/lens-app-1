/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "ipfs.infura.io",
      "avatar.tobi.sh",
      "lens.infura-ipfs.io",
      "statics-mumbai-lens-staging.s3.eu-west-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
