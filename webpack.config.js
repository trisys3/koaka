'use strict';

module.exports = config;

var config = {
  loaders: [
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }
  ]
};
