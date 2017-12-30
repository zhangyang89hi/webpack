var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index:'./index.js',
	},
	output: {
		path: __dirname+'/dist',
		publicPath:'',
		filename: 'js/[name].js',
		// chunkFilename: 'js/[id].chunk.js'   //chunk生成的配置
    },
  plugins:[
		new htmlWebpackPlugin({
      filename: './dist/index.html',
			template: 'index.html',
			title:'',
			hash: true,
			inject: true,
			chunks: ['index'],
			// date : new Date(),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
      // ,chunksSortMode: 'dependency'
		}),
		new htmlWebpackPlugin({
      filename: './dist/category.html',
			template: 'index.html',
			title:'',			
			hash: true,
			inject: true,
			chunks: ['index'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
			}
		}),
		new htmlWebpackPlugin({
      filename: './dist/index.html',
			template: 'index.html',
			title:'',
			hash: true,
			inject: true,
			chunks: ['index'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
		}),
	],
	module: {
		loaders: [{
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader']
		},
		{
			test: /\.scss$/,
			loaders: ['style-loader', 'css-loader','sass-loader']
		},
		{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'img/[name].[hash:7].[ext]'
			}
		},
		{
		  test: /\.(woff2?|woff|eot|svg|ttf|otf)(\?.*)?$/,
		  loader: 'url-loader',
		  options: {
			limit: 10000,
			name: './fonts/[name].[hash:7].[ext]'
		  }
		}
	]
	}
};