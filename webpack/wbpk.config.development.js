import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dotenv from 'dotenv';
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { fileURLToPath } from 'url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
dotenv.config({ path: path.resolve(__dirname, `./`, `..`, `server`, `.env`) });  // env file
const env = process.env.NODE_ENV;
const envConfig = path.resolve(__dirname, `./`, `..`, `server`, `src`, `_configs`, `config.${ env }.js`) // config file

const plugins = [
  new CleanWebpackPlugin({
    cleanStaleWebpackAssets: true,
  }),
  new HtmlWebpackPlugin({
    title: `${envConfig.curr}`,
    template: `./webpack/templateFiles/index.${ env }.html`
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
  new WorkboxWebpackPlugin.GenerateSW({
    // These options encourage the ServiceWorkers to get in there fast 
    // and not allow any straggling "old" SWs to hang around.
    clientsClaim: true,
    skipWaiting: true,
    maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
  }),
  // new WorkboxWebpackPlugin.InjectManifest({
  //   swSrc: './src/sw.js', // path to your service worker file
  //   swDest: 'service-worker.js', // destination name for the output file
  // })
] 

if ( process.env.ANALYZE ) {
  plugins.push(new BundleAnalyzerPlugin());
}

export default {
  entry: './client_fe_mix/index.js',
  mode: `${ env }`,     //Use ENV file to decide mode
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, `..`, `build_${ env }`),
    filename: 'bundle.js',
  },
  module: {

    rules: [
      { 
        test: /\.jsx?/, 
        exclude: /node_modules/, 
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.txt/,
        type: 'asset/source',
      }
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, `..`, `build_${ env }`),
      publicPath: `build_${ env }`
    },
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        changeOrigin: true,
        secure: false, 
        target: `http://localhost:3030/`,
      },
      {
        context: ['/auth'],
        changeOrigin: true,
        secure: false, 
        target: `http://localhost:3030/`,
      },
    ],
  },
  plugins: plugins,

};