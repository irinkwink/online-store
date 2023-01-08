import path from 'path';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import EslintPlugin from 'eslint-webpack-plugin';
// import FontPreloadPlugin from 'webpack-font-preload-plugin';

const PAGES = ['index', 'cart', 'product', 'page404'];

const baseConfig = {
  entry: path.resolve(__dirname, 'src/index'),
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'index.d.ts')],
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          },
          'group-css-media-queries-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: 'asset/resource',
      },
      {
        test: /\.webmanifest$/i,
        use: 'webpack-webmanifest-loader',
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new EslintPlugin({
      extensions: ['ts'],
    }),
    // new FontPreloadPlugin({
    //   extensions: ['woff2', 'woff'],
    //   crossorigin: true,
    //   loadType: 'preload',
    // }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, `src/index.html`),
    //   filename: `index.html`,
    // }),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, `src/${page}.html`),
          filename: `${page}.html`,
        })
    ),
    new CleanWebpackPlugin(),
  ],
};

module.exports = ({ mode }: typeof baseConfig) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
