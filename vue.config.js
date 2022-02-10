module.exports = {
  devServer: {
    proxy: 'https://mock.vouchconcierge.com',
  },
  transpileDependencies: [
    /\bvue-awesome\b/
  ]
};
