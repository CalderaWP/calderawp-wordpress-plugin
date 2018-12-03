const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

const blockDefinitions = require('./blocks.json');
const blockSlugs = [];
blockDefinitions.blocks.forEach(block => {
	blockSlugs.push(block.slug)
});
const pluginSlugs = [];
blockDefinitions.plugins.forEach(plugin => {
	pluginSlugs.push(plugin.slug)
});


/**
 * External dependencies
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Main CSS loader for everything but blocks..
const cssExtractTextPlugin = new ExtractTextPlugin({
	filename: "./src/[name]/build/style.css"
});

// Configuration for the ExtractTextPlugin.
const extractConfig = {
	use: [
		{loader: "raw-loader"},
		{
			loader: "postcss-loader",
			options: {
				plugins: [require("autoprefixer")]
			}
		},
		{
			loader: "sass-loader",
			query: {
				outputStyle:
					"production" === process.env.NODE_ENV ? "compressed" : "nested"
			}
		}
	]
};

const entryPointNames = [
	...blockSlugs,
	...pluginSlugs
];

const externals = {
	react: "React"
};
entryPointNames.forEach(entryPointName => {
	externals["@calderaWordPressPlugin/" + entryPointName] = {
		this: ["calderaWordPressPlugin", entryPointName]
	};
});


const wpDependencies = [
	"components",
	"element",
	"blocks",
	"utils",
	"date",
	"data",
	"i18n",
	"editPost",
	"plugins",
	"apiRequest",
	"editor",
	"compose",
	"plugins"
];
wpDependencies.forEach(wpDependency => {
	externals["@wordpress/" + wpDependency] = {
		this: ["wp", wpDependency]
	};
});

const entry = entryPointNames.reduce((memo, entryPointName) => {
	if (blockSlugs.includes(entryPointName)) {
		memo[entryPointName] = "./src/blocks/" + entryPointName + "/index.js";
	} else {
		memo[entryPointName] = "./src/plugins/" + entryPointName + "/index.js";
	}
	return memo;
}, {});
entry.entryTableFront = "./src/blocks/" + 'entryTable' + "/front.js";
const config = {
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	entry,
	externals,
	output: {
		filename: "build/[name]/index.js",
		path: __dirname,
		library: ["calderaFormsWordPressPlugin", "[name]"],
		libraryTarget: "this"
	},
	resolve: {
		modules: [__dirname, "node_modules"]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.s?css$/,
				use: cssExtractTextPlugin.extract(extractConfig)
			}
		]
	},
	plugins: [cssExtractTextPlugin, FlowBabelWebpackPlugin],
	stats: {
		children: false
	}
};

module.exports = config;
