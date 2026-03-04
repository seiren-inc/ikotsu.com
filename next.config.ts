import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/services/powdering',
        destination: '/services/powdered',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
