/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client'],
  devIndicators: false,

  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
