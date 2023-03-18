const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pageNames = fs.readdirSync(`${__dirname}/src`);

const getEntry = () => {
  const entry = {};
  pageNames.forEach(item => {
    entry[item] = path.resolve(__dirname, 'src', item, 'index.js');
  });
  return entry;
}

// 创建 new HtmlWebpackPlugin({...}) 的工厂函数
const HtmlpluginArr = (pageNames) => {
  return pageNames.map(
    (pageName) =>
      new HtmlWebpackPlugin({
        template: `${__dirname}/public/index.html`,
        filename: `${pageName}/index.html`, // 必须加后缀名，不可使用[ext]
        chunks: [`${pageName}`], // 指定入口文件，与entry中的key一致
        hot: true, // 开启热更新
      })
  );
};

module.exports = {
  mode: "development",
  entry: getEntry(),
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
