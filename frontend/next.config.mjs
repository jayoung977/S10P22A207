/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.(mp3|ogg|wav|flac)$/i,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "/_next/static/sounds",
            outputPath: "static/sounds",
            name: "[name].[ext]",
            esModule: false,
          },
        },
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/_next/static/videos/",
              outputPath: "static/videos/",
              name: "[name].[hash].[ext]",
            },
          },
        ],
      }
    );

    return config;
  },
  images: {
    domains: ["aceternity.com", "zigeumbucket.s3.ap-northeast-2.amazonaws.com"],
  },
  output: "standalone",
};

export default nextConfig;
