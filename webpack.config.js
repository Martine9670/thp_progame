const path = require("path"); // Node.js module to handle file paths
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Generates index.html automatically
const Dotenv = require("dotenv-webpack"); // Loads environment variables from .env
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Extracts CSS into separate file

module.exports = {
  // Entry point: main JS file to start bundling
  entry: "./src/index.js",

  // Output: where the final bundle will be placed
  output: {
    path: path.resolve(__dirname, "dist"), // folder where bundle.js is generated
    filename: "bundle.js",                  // name of the bundled JS file
    publicPath: "/"                         // needed for SPA routing (#hash or history API)
  },

  // Development server settings
  devServer: {
    historyApiFallback: true, // allows SPA to handle routing without 404 errors
    port: 8080,               // port to open the app
    open: true                // automatically opens browser
  },

  // Loaders: tell webpack how to handle non-JS files
  module: {
    rules: [
      {
        test: /\.scss$/,    // target all SCSS files
        use: [
          MiniCssExtractPlugin.loader, // puts CSS into separate file (good for production)
          "css-loader",                // allows importing CSS into JS
          {
            loader: "sass-loader",     // compiles SCSS to CSS
            options: {
              sassOptions: {
                quietDeps: true        // hides warnings from Sass dependencies
              }
            }
          }
        ]
      }
    ]
  },

  // Plugins: extra tools to improve webpack
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html" // uses this HTML file as template
    }),
    new Dotenv(),                   // loads variables from .env automatically
    new MiniCssExtractPlugin({
      filename: "styles.css"        // name of the extracted CSS file
    })
  ],

  // Console output settings
  stats: {
    warningsFilter: [/sass/] // hide Sass warnings to keep console clean
  },

  // Mode: development (not minified, easier to debug)
  mode: "development"
};
