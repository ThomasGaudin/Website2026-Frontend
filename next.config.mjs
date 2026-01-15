/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/panel",
        destination: "http://localhost:8000/panel",
        permanent: false,
      },
      {
        source: "/panel/:path*",
        destination: "http://localhost:8000/panel/:path*",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
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
