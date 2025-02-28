import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/capy-next-front" : "",
  images: { unoptimized: true }
};

export default nextConfig;
