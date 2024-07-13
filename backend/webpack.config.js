import { fileURLToPath } from 'url';
import path from 'path';

// Use fileURLToPath and path to define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default {
  entry: './src/index.js', // Your entry file
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2', // Ensures output is compatible with Node.js
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
