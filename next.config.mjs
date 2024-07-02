/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**",
        port: "",
        protocol: "https",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
