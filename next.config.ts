import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // static export for GitHub Pages (output goes to ./out)
  output: "export",
  // no image-optimization server on static hosting
  images: { unoptimized: true },
};

export default nextConfig;
