const path = require('path');

module.exports = (env) =>
{
  const isProduction = env === 'production';

  return {
      mode: 'development',
      entry: './src/app.js',
      output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "styles.css"
        })
      ],
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }, 
          {
            test: /\.s?css$/,
            use: [
              isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: 'css-loader',
                options: {sourceMap: true}
              },
              {
                loader: 'sass-loader',
                options: {sourceMap: true}
              }
            ]
          }
        ]
      },
      devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
      devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
      }
    } 
}
