const path = require("path");
const PugPlugin = require("pug-plugin");

module.exports = {
  devtool: "source-map",
  output: {
    clean: true,
    path: path.join(__dirname, "dist"),
  },

  entry: {
    // define Pug files here
    "pages/gui-page": "./src/pages/gui-page/gui-page.pug",
    index: "./src/pages/landing-page/landing-page.pug",
    "pages/search-page": "./src/pages/search-page/search-page.pug",
    "pages/registration-page":
      "./src/pages/registration-page/registration-page.pug",
    "pages/signin-page": "./src/pages/signin-page/signin-page.pug",
    "pages/room-pages/room-page-id-888":
      "./src/pages/room-pages/room-page-id-888/room-page-id-888.pug",
    "pages/room-pages/room-page-id-840":
      "./src/pages/room-pages/room-page-id-840/room-page-id-840.pug",
    "pages/room-pages/room-page-id-980":
      "./src/pages/room-pages/room-page-id-980/room-page-id-980.pug",
    "pages/room-pages/room-page-id-856":
      "./src/pages/room-pages/room-page-id-856/room-page-id-856.pug",
    "pages/room-pages/room-page-id-740":
      "./src/pages/room-pages/room-page-id-740/room-page-id-740.pug",
    "pages/room-pages/room-page-id-982":
      "./src/pages/room-pages/room-page-id-982/room-page-id-982.pug",
    "pages/room-pages/room-page-id-678":
      "./src/pages/room-pages/room-page-id-678/room-page-id-678.pug",
    "pages/room-pages/room-page-id-450":
      "./src/pages/room-pages/room-page-id-450/room-page-id-450.pug",
    "pages/room-pages/room-page-id-350":
      "./src/pages/room-pages/room-page-id-350/room-page-id-350.pug",
    "pages/room-pages/room-page-id-666":
      "./src/pages/room-pages/room-page-id-666/room-page-id-666.pug",
    "pages/room-pages/room-page-id-444":
      "./src/pages/room-pages/room-page-id-444/room-page-id-444.pug",
    "pages/room-pages/room-page-id-352":
      "./src/pages/room-pages/room-page-id-352/room-page-id-352.pug",
  },

  plugins: [
    new PugPlugin({
      pretty: true, // formatting HTML, useful for development mode
      js: {
        // output filename of extracted JS file from source script
        filename: "assets/js/[name].js",
      },
      css: {
        // output filename of extracted CSS file from source style
        filename: "assets/css/[name].css",
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader, // Pug loader
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ["css-loader", "sass-loader"],
      },

      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: "./assets/fonts/[name][ext]",
        },
      },

      {
        test: /\.(png|jpg|jpeg|ico|svg)/,
        type: "asset/resource",
        generator: {
          filename: "./assets/img/[name][ext]",
        },
      },
    ],
  },
};
