import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true
              },
              transform: {
                react: {
                  runtime: 'automatic'
                }
              }
            }
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './public/index.html'
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: 'public',
          to: '.',
          globOptions: {
            ignore: ['**/index.html'] // index.htmlはHtmlRspackPluginが処理するので除外
          }
        }
      ]
    })
  ],
  devServer: {
    static: './public',
    port: 3001,
    hot: true,
    open: true
  }
});