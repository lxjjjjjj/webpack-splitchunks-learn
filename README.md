# webpack-examples
Webpack examples for practice

webpack官网splitchunks的讲解 https://webpack.docschina.org/plugins/split-chunks-plugin/
webpack github的各种特性的example讲解 https://github.com/webpack/webpack/tree/main/examples

启动 全局安装webpack webpack-cli 然后在各个目录下运行命令

npx webpack build --config ./webpack.config.js --stats verbose

```
- minSize(默认 30000)：使得比这个值大的模块才会被提取。
- minChunks（默认 1）：用于界定至少重复多少次的模块才会被提取。
- maxInitialRequests（默认 3）：一个代码块最终就会对应一个请求数，所以该属性决定入口最多分成的代码块数量，太小的值会使你无论怎么分割，都无法让入口的代码块变小。
- maxAsyncRequests（默认 5）：同上，决定每次按需加载时，代码块的最大数量。
- test：通过正则表达式精准匹配要提取的模块，可以根据项目结构制定各种规则，是手动优化的关键。
```

splitChunks.maxAsyncRequests
number = 30
按需加载时的最大并行请求数。

splitChunks.maxInitialRequests
number = 30
入口点的最大并行请求数。