import type { NextConfig } from "next";

const tourIsolationHeaders = [
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/MarafeiEducationPlatform/",
          destination: "/MarafeiEducationPlatform/index.htm",
        },
        {
          source: "/fonts/noto-sans-regular.woff2",
          destination: "/MarafeiEducationPlatform/fonts/Noto%20Sans%20Regular.woff2",
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/MarafeiEducationPlatform",
        headers: tourIsolationHeaders,
      },
      {
        source: "/MarafeiEducationPlatform/:path*",
        headers: tourIsolationHeaders,
      },
    ];
  },
};

export default nextConfig;
