import type { NextConfig } from "next";

const /* `nextConfig` is a configuration object for a Next.js application. In this specific case, it is
configuring the Next.js image optimization feature by specifying a remote pattern for images
to be optimized from a specific hostname using HTTPS protocol. */
  nextConfig: NextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "placehold.jp",
        },
      ],
    },
  };

export default nextConfig;
