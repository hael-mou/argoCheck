import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   typescript: {
    ignoreBuildErrors: true,
  },

allowedDevOrigins: [
    "169.254.8.117",
    "137.184.98.100",
  ],
};

export default nextConfig;
