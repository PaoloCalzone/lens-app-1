/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lens.infura-ipfs.io",
      "ipfs.infura.io",
      "avatar.tobi.sh",
      "statics-mumbai-lens-staging.s3.eu-west-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
