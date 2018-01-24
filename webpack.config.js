var path = require('path');
var webpack = require('webpack');

var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		index:'./src/index.js',
		cart:'./src/cart.js',
		category:'./src/category.js',
		// jquery:'./src/js/jquery-3.2.1.min.js'
		// commons: './src/common.js'
	},
	output: {
		path: __dirname+'/dist',
		publicPath:'',
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].chunk.js'   //chunk生成的配置
		},
	// externals: {
	// 		'jquery': 'window.jQuery',
	// 		'$': 'window.jQuery'
	// },
  plugins:[
		// new webpack.HashedModuleIdsPlugin(),
		// new webpack.ProvidePlugin({
		// 	$: 'jquery',
		// 	jQuery: 'jquery',
		// 	'window.jQuery': 'jquery',
		// 	'widnow.$': 'jquery'
		// }),
		new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, './node_modules')
          ) === 0
        )
      }
		}),
		new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
			chunks: ['vendor']
			// minChunks: Infinity
		}),
		new htmlWebpackPlugin({
      filename: 'index.html',
			template: 'src/index.html',
			title:'',
			hash: true,
			inject: true,
			chunks: ['manifest','vendor','index'],
			// date : new Date(),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
      // ,chunksSortMode: 'dependency'
		}),
		new htmlWebpackPlugin({
      filename: 'category.html',
			template: 'src/category.html',
			title:'',
			hash: true,
			inject: true,
			chunks: ['manifest','vendor','category'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
			}
		}),
		new htmlWebpackPlugin({
      filename: 'cart.html',
			template: 'src/cart.html',
			title:'',
			hash: true,
			inject: true,
			chunks: ['manifest','vendor','cart'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
		}),
		// new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
		// }),
		new ExtractTextPlugin({
      filename: '[name].css'
		})
	],
	module: {
		rules: [{
			test: /zyy\.js$/,
			use: {
				loader: 'bundle-loader',
				options:{
					name: '[name]'
				}
			}
		},
		{
			test: require.resolve('jquery'),
			use: [{
				loader: 'expose-loader',
				options: 'jQuery'
			},
			{
				loader: 'expose-loader',
				options: '$'
			},
		]
		},{
			test: /\.css$/,
			// loaders: ['style-loader', 'css-loader', "postcss-loader"]
			use:ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader:"css-loader",
					options:{
						minimize: true
					}
				},
					'postcss-loader']
			})
		},
		{
			test: /\.scss$/,
			// loader: ['style-loader', 'css-loader', "postcss-loader", 'sass-loader']
			use:ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader',
						options:{
							minimize: true
						}
					}, 
					'postcss-loader', 
					'sass-loader']
			})
		},
		{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader'
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
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'media/[name].[hash:7].[ext]'
			}
		},
		{
			test: /\.(woff2?|woff|eot|svg|ttf|otf)(\?.*)?$/,
		  loader: 'url-loader',
		  options: {
			limit: 10000,
			name: './fonts/[name].[hash:7].[ext]'
		  }
		}]
	}
};