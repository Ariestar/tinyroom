const path = require("path");
// const CompressionPlugin = require("compression-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	mode: "production",
	entry: ["./src/scripts/index.js"],
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	plugins:[
		// new  CompressionPlugin({
		// 	filename: 'index.gz', //  使得多个.gz文件合并成一个文件，这种方式压缩后的文件少，建议使用
        //             algorithm: 'gzip', // 官方默认压缩算法也是gzip
        //             test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/, // 使用正则给匹配到的文件做压缩，这里是给html、css、js以及字体（.ttf和.woff和.eot）做压缩
        //             threshold: 10240, //以字节为单位压缩超过此大小的文件，使用默认值10240吧
        //             minRatio: 0.8, // 最小压缩比率，官方默认0.8
        //             //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
        //             // 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
        //             deleteOriginalAssets: false
		// })
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg)$/i,
				type: "asset/resource",
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
};
