/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const images = {
  domains: ['34.101.87.163:5000']
}



module.exports = {
  nextConfig,
  images
}
