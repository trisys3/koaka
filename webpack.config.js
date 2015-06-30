'use strict';

var config = {
  loaders: [
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }
  ]
};

module.exports = config;
