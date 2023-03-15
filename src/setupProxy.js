const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/list",
    createProxyMiddleware({
      target: "https://itunes.apple.com/us/rss",
      changeOrigin: true,
      pathRewrite: {
        "^/list/": "/", // remove base path
      },
    })
  );

  app.use(
    "/podcast/details",
    createProxyMiddleware({
      target: "https://itunes.apple.com",
      changeOrigin: true,
      pathRewrite: {
        "^/podcast/details/": "/", // remove base path
      },
    })
  );
};
