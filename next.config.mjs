/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/panel",
        destination: "https://api.thomasgaudin.xyz/panel",
        permanent: false,
      },
      {
        source: "/panel/:path*",
        destination: "https://api.thomasgaudin.xyz/panel/:path*",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.thomasgaudin.xyz",
        port: "443",
        pathname: "/**",
      },
      // Ajoutez ici votre domaine de production
      // {
      //   protocol: 'https',
      //   hostname: 'votre-domaine.com',
      //   pathname: '/**',
      // },
    ],
    // Désactiver l'optimisation uniquement en développement
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
