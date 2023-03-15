/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'www.canva.com',
      'as1.ftcdn.net',
      'media.istockphoto.com',
      'cdn.sanity.io',
    ],
  },
};
