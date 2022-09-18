var path = require("path");
// 如果项目仅仅只在pageA中引入async1 和 async2 那么 utility1 不会被单独打包出来
// 因为：utility1.js 同时被 pageA.js，async1.js，async2.js 三个模块引用，照理应该命中 commons 缓存组的规则，从而被单独提取成一个 chunk，
// 然而结果是它依然打包在 pageA.js 中。这是因为 async1.js，async2.js 都是 pageA.js 的懒加载模块，
// 而 pageA.js 同步引用了 utility1.js，所以在加载 async1.js，async2.js 时 utility1.js 已经有了，直接拿来用即可，所以就没必要提出一个新的 chunk，白白增加一个请求。
// 如果想要utility1被单独提取出来可以在pageB页面中异步加载async1和async2
module.exports = {
	mode: "development",
	// mode: "production",
	entry: {
		pageA: "./pageA",
		pageB: "./pageB",
		pageC: "./pageC"
	},
	optimization: {
		chunkIds: "named",
		splitChunks: {
			minSize: 0,
			name:false,
			cacheGroups: {
				commons: {
					chunks: "all",//加入按需加载后，设为all将所有模块包括在优化范围内
					// name: "commons",
					minChunks: 2,
					maxInitialRequests: 5, // 默认为3，无法满足我们的分包数量
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					// priority: 10,
					// enforce: true
				}
			}
		}
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
	}
};
