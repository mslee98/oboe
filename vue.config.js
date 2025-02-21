module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // target: "http://localhost:5000",
        // target: "http://43.202.111.35",  // AWS 3DConv 서버
        target: "http://43.203.102.51",  // AWS TMS 서버
      },
      "/napi": {
        // target: "http://localhost:5000",   // Local서버
        target: "http://43.202.111.35",   // AWS서버
      },
      /* 2024.12.03 Front > public/font 폴더로 변경하여 Proxy 제거
      "/file": {
        target: "http://localhost:5000",
      },
      "/cctv": {
        target: "http://localhost:5000",
      },
      "/font": {
        target: "http://localhost:5000",
      },
      //////////////////////////////////// */
      "/test": {
        target: "http://localhost:5000",
      },
      "/tms": {
        target: "http://43.203.102.51",
      },
      "/sse": {
        target: "http://localhost:5000",
        ws: true,
        changeOrigin: true,
      },
    },
    compress: false
  },

  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "3D Conv Viewer";
      return args;
    });
  },
};

/*
  var serverLoc = "http://localhost:5000";
  var serverAWS = "http://43.202.111.35";
*/
