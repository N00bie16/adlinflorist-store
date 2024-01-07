/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["tailwindui.com", "res.cloudinary.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:3000/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
