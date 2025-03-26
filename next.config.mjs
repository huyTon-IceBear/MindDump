/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /**
   * Specifies the output mode for the build.
   * "standalone" copies only the necessary files for production deployment.
   */
  output: "standalone",

  /**
   * Custom webpack configuration.
   * @param {import('webpack').Configuration} config - The current webpack config
   * @param {Object} options - Build options
   * @param {boolean} options.isServer - Indicates if this is a server-side compilation
   * @returns {import('webpack').Configuration} Modified webpack config
   */
  webpack: (config, { isServer }) => {
    // Set infrastructure logging level to 'error'
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
};

export default nextConfig;
