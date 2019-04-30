const {resolve} = require("path")

module.exports = {
	mode: "production",
	entry: './src/app.ts',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
			},
		]
	},
	resolve: {
		extensions: ['.ts']
	},
	output: {
		filename: 'index.js',
		path: resolve(__dirname, './bin'),
	}
};
