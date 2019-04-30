const {resolve} = require("path")

module.exports = {
	mode: "production",
	entry: './src/app.ts',
	watchOptions: {
		ignored: [/node_modules/, /js/],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
					experimentalWatchApi: true,
				},
			},
		]
	},
	resolve: {
		extensions: ['.ts']
	},
	output: {
		filename: 'index.js',
		path: resolve(__dirname, './example'),
	}
};
