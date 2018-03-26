const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');

const join = path.join;
const resolve = path.resolve;

const root = resolve(__dirname);
const src = join(root, 'src');

const makePcssLoader = () => {
  return {
    test: /\.pcss$/,
    loaders: [
      'style-loader',
      'css-loader?sourceMap&modules&camelCase&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]',
      'postcss-loader',
    ],
    exclude: path.resolve(__dirname, 'node_modules'),
  };
};

module.exports = {
  entry: src,
  output: {
    filename: 'bundle.js',
    path: join(root, '/dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      makePcssLoader(),
      {
        // Matches vendor styles (in node_modules)
        // Bundles css without transforms / modules
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?localIdentName=[name]---[local]---[hash:base64:5]',
        ],
        include: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&camelCase&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]',
          'postcss-loader',
          'sass-loader',
        ],
        exclude: /(node_modules)/,
      },

      /* Script / JSON Files */
      {
        // JS files that live outside of node_modules get transpiled without react
        test: /\.js$/,
        loaders: [
          'babel-loader?presets[]=es2015,presets[]=stage-2'
        ],
        exclude: /(node_modules)/,
      },
      {
        // All JSX files get transpiled with react
        test: /\.jsx$/,
        loaders: [
          'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-2'
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.json$/,
        loaders: ['json'],
        exclude: /(node_modules)/,
      },

      /* Image Files */
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        loaders: ['url-loader?limit=10000'],
      },
      {
        test: /\.svg(\?\S*)?$/,
        loaders: ['url-loader?mimetype=image/svg+xml&limit=10000'],
      },
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: 'src/assets/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      components: join(src, 'components')
    },
  },
}
