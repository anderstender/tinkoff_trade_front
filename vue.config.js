module.exports = {
  outputDir: '../public/',
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    extract: false,
    sourceMap: false,
  },
  runtimeCompiler: true,
  parallel: true,
  publicPath: "",
  configureWebpack: {
    output: {
      filename: '[name].min.js',
    },
    devServer: {
      watchOptions: {
        poll: true
      }
    },
    context: __dirname,
    node: {
      __filename: true
    },
    plugins: [
      function () {},
    ]
  },
};
