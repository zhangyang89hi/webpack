
var path = require("path");
var glob = require('glob');
var htmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
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
	],
	module: {
		loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
              }
        },
        {
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

var f = glob.sync('./html/*.html');
for(var i=0; i<f.length; i++){
    var name = path.basename(f[i]);
    var basename = path.basename(f[i],'.html');
    var fi = f[i];

    var htmlPlugin = new htmlWebpackPlugin({
        filename: name,
        template: path.resolve(__dirname, fi),
        chunks: ['commons', basename],
        hash: true,
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        }
    });
    webpackConfig.plugins.push(htmlPlugin);
}

console.log("webpackConfig.plugins:\n");
console.log(webpackConfig.plugins);
console.log("webpackConfig.plugins[0].chunks:\n");
console.log(webpackConfig.plugins[0].options.chunks);


module.exports = webpackConfig;