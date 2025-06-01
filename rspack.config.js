import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';

export default defineConfig({
  entry: './src/index.tsx',
  mode: 'development',
  devtool: 'source-map',
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
    })
  ],
  devServer: {
    static: './public',
    port: 3001,
    hot: true,
    open: true
  }
});