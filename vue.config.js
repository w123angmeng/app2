const { defineConfig } = require("@vue/cli-service");
const { name } = require('./package');
// module.exports = defineConfig({
module.exports = {
      publicPath: "/",
  transpileDependencies: true,
  devServer: {
    hot: true,
    port: 8082,
    host: "localhost",
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
    //   jsonpFunction: `webpackJsonp_${name}`,
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    }
    
  },
};
