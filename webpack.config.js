var webpack = require("webpack")

module.exports = {
	entry: "./src/index.js",
	output: {
		path: "dist/assets",
		filename: "bundle.js",
		publicPath: "assets"
	},
	devServer: {
		contentBase: "./dist",
		proxy: {
			'/records': {
				target: 'http://localhost:5001',
				secure: false,
				changeOrigin: true
			}
         }
 	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_moudles)/,
				loader: ["babel-loader"],
				query: {
					presets: ["latest", "stage-0", "react"]
				}
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader!autoprefixer-loader"
			},
			{
				test: /\.scss$/,
				loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
			},
			{
				test: /\.woff$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
		    }, 
		    {
				test: /\.woff2$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
		    }, 
		    {
				test: /\.(eot|ttf|svg|gif|png)$/,
				loader: "file-loader"
		    }
		]
	},
	plugins:[
	    new webpack.ProvidePlugin({   
	        jQuery: 'jquery',
	        $: 'jquery',
	        jquery: 'jquery',
          	'window.jQuery': 'jquery',
 			Tether: 'tether'
	    })
]
}