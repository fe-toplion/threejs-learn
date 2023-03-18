let path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 不同页面的名字
const pageNames = ["threejs", "photoSphereViewer"];

// 创建 new HtmlWebpackPlugin({...}) 的工厂函数
const HtmlpluginArr = (pageNames) => {
  return pageNames.map(
    (pageName) =>
      new HtmlWebpackPlugin({
        template: `./src/${pageName}/index.html`,
        filename: `${pageName}/index.html`, // 必须加后缀名，不可使用[ext]
        chunks: [`${pageName}`], // 指定入口文件，与entry中的key一致
        hot: true, // 开启热更新
      })
  );
};

module.exports = {
  mode: "development",
  entry: {
    threejs: "./src/threejs/index.js",
    photoSphereViewer: "./src/photoSphereViewer/index.js",
  },
  output: {
    filename: "[name]/index.js",
    path: path.resolve("dist"),
    publicPath: "",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
    ]
  },
  plugins: [...HtmlpluginArr(pageNames)],
  devServer: {
    port: 8080,
    compress: true,
    open: true,
    client: { progress: true },
    static: {
      directory: path.join(__dirname, "static"),
      publicPath: "/static",
    },
  },
  watch: true,
};
