import type { NextConfig } from "next";
import PWAConfig from "next-pwa";

const withPWA = PWAConfig({
  dest: "public"
});

const nextConfig: NextConfig = {
  /* config options here */
  output: process.env.NEXT_OUTPUT,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ref: https://nextjs.org/docs/app/guides/progressive-web-apps#8-securing-your-application
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default withPWA(nextConfig);
