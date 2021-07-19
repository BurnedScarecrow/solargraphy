module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Solargraphy";
      return args;
    });
  },
  publicPath: process.env.NODE_ENV === "production" ? "/solargraphy/" : "/",
};
