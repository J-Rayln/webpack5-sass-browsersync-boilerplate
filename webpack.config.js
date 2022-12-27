const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { argv } = require('process');

const config = {
	entry: {
		main: ['./src/js/main.js', './src/scss/main.scss'],
	},
	output: {
		path: path.resolve(__dirname, 'assets'),
		filename: './js/[name].min.js',
		clean: true,
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						// options: {
						// 	importLoaders: 1,
						// },
					},
					'postcss-loader',
				],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: './img/[name][ext]',
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: './css/[name].min.css',
		}),
		new BrowserSyncPlugin(
			{
				proxy: 'http://webpack5.local',
				files: [
					'./assets/css/**/*.css',
					'./assets/js/**/*.js',
					'./**/*.php',
				],
				injectCss: true,
			},
			{
				reload: true,
			}
		),
	],
};

module.exports = config;
