var path = require("path");

module.exports = {
  mode: "development",
//   mode: "production",
  entry: {
    pageA: "./pageA",
    pageB: "./pageB",
    pageC: "./pageC",
  },
  optimization: {
    chunkIds: "named", // 指定打包过程中的chunkId，设为named会生成可读性好的chunkId，便于debug
    splitChunks: {
	  name:false, // name默认为true
      minSize: 0, // 默认30000（30kb），但是demo中的文件都很小，minSize设为0，让每个文件都满足大小条件
      cacheGroups: {
        commons: {
          chunks: "initial",
		  // 这表明将选择哪些 chunk 进行优化。当提供一个字符串，有效值为 all，async(异步) 和 initial(同步)。设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享。
		//   name: "commons",
          minChunks: 2, // 打包到commons的cacheGroups的分包需要满足至少被多少个包引入的规则 因为utility1只被pageA引入，所以不会打包到commons chunk 中
          maxInitialRequests: 5, // 默认为3 每个入口chunk最多由几个chunk分包组成，由于一开始设置的是3 所以即使utility3被引入了2两次 也没有被单独打包到commons chunk中 所以改成5看看utility3的打包情况
		  // 可以看到将maxInitialRequests改成5之后 pageB内有了utility3的分包
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor", 
		// 从打包结果上可以看出node_modules中的vendor1 和 vendor2 被打包到了同一个chunk vendor中，但是上面的common分包下的utility2和utility3却被打包成了commons-utility2_js.js 和 commons-utility3_js.js
		// 可以看出是因为我们在vendor包中加了name属性 如果我们将vendor中的那么属性去掉
		// 那么vendor1 和 vendor2 将被打包成 vendor-node_modules_vendor1_js.js 和 vendor-node_modules_vendor2_js.js
		// 如果给commons添加了name commons 那么commons中将会打包utility2和utility3被pageA pageB pageC引用
        },
      },
    },
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
};