import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos éditoriales servies depuis Sanity (CDN d'assets) — voir
    // CLAUDE.md §4/§6. Les placeholders restent en CSS pur tant que les
    // vraies photos ne sont pas disponibles, donc aucun autre domaine
    // n'est nécessaire pour l'instant.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
