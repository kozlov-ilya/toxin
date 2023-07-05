const path = require('path');
const PugPlugin = require('pug-plugin');

module.exports = {
  output: {
    clean: true,
    path: path.join(__dirname, 'dist'),
  },

  entry: {
    // define Pug files here
    'pages/index': './src/pages/index/index.pug',
  },

  plugins: [
    new PugPlugin({
      pretty: true, // formatting HTML, useful for development mode
      js: {
        // output filename of extracted JS file from source script
        filename: 'assets/js/[name].js',
      },
      css: {
        // output filename of extracted CSS file from source style
        filename: 'assets/css/[name].css',
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
        use: ['css-loader', 'sass-loader'],
      },

      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: './assets/fonts/[name][ext]',
        },
      },

      {
        test: /\.(png|jpg|jpeg|ico|svg)/,
        type: 'asset/resource',
        generator: {
          filename: './assets/img/[name][ext]',
        },
      },
    ],
  },
}
