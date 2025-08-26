// next.config.mjs — без basePath и assetPrefix
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,

  // НИКАКОГО basePath / assetPrefix:
  // basePath: undefined,
  // assetPrefix: undefined,

  images: {
    // Без кастомного path, иначе снова будет /default-channel/_next/image
    unoptimized: true,       // оставим как у тебя, если нужно Next/Image без оптимизатора
    formats: ["image/webp"], // опционально
  },

  // AMP и прочие места тоже не должны ссылаться на /default-channel
  experimental: {},
};

export default nextConfig;
