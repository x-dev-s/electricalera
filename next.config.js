/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  distDir: "output",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  /**
   *
   * @param {import('webpack').Configuration} config
   * @param {import('next/dist/server/config-shared').WebpackConfigContext} context
   * @returns {import('webpack').Configuration}
   */
  webpack: (config) => {
    if (process.env.NEXT_OUTPUT_MODE !== "export" || !config.module) {
      return config;
    }
    config.module.rules?.push({
      test:/app\/admin/,
      loader: "ignore-loader",
    });
    return config;
  },
};

module.exports = nextConfig;