const path = require("path");
const name = "TS-VUE";
const sourceMap = process.env.NODE_ENV === "development";

const devServerPort = 9527;
const mockServerPort = 9528;

module.exports = {
  publicPath: "/", // 基本路径
  outputDir: "dist", // 输出文件目录
  lintOnSave: process.env.NODE_ENV === "development", // eslint-loader 是否在保存的时候检查
  chainWebpack: config => {
    // Provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set("name", name);
  },
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === "production") {
  //     // 为生产环境修改配置...
  //     config.mode = "production";
  //   } else {
  //     // 为开发环境修改配置...
  //     config.mode = "development";
  //   }

  //   Object.assign(config, {
  //     // 开发生产共同配置
  //     resolve: {
  //       extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
  //       alias: {
  //         vue$: "vue/dist/vue.js",
  //         "@": path.resolve(__dirname, "./src"),
  //         "@c": path.resolve(__dirname, "./src/components"),
  //         utils: path.resolve(__dirname, "./src/utils"),
  //         less: path.resolve(__dirname, "./src/less"),
  //         views: path.resolve(__dirname, "./src/views"),
  //         assets: path.resolve(__dirname, "./src/assets"),
  //         com: path.resolve(__dirname, "./src/components"),
  //         store: path.resolve(__dirname, "./src/store"),
  //         mixins: path.resolve(__dirname, "./src/mixins")
  //       }
  //     }
  //   });
  // },
  productionSourceMap: sourceMap, // 生产环境是否生成 sourceMap 文件
  css: {
    // css相关配置
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  devServer: {
    open: true,
    compress: true,
    host: "localhost",
    port: devServerPort,
    hot: true,
    proxy:
      "https://vue-typescript-admin-mock-server.armour.now.sh/mock-api/v1/",
    // proxy: {
    //   // 设置代理
    //   // proxy all requests starting with /api to jsonplaceholder
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: `http://localhost:${mockServerPort}/mock-api/v1`,
    //     changeOrigin: true,
    //     pathRewite: {
    //       ["^" + process.env.VUE_APP_BASE_API]: ""
    //     }
    //   }
    // },
    before: app => {} // 用于在服务器内部所有中间件执行前定义自定义处理程序，即此选项可在本地模拟服务器数据返回。参考https://github.com/lbwa/set/issues/8
  },
  // 第三方插件配置
  pluginOptions: {
    // style-resources-loader(https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader)
    // 导入一些公共的样式文件，比如：variables / mixins / functions，避免在每个样式文件中手动的@import导入
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "src/styles/_variables.scss"),
        path.resolve(__dirname, "src/styles/_mixins.scss")
      ]
    }
  }
};
