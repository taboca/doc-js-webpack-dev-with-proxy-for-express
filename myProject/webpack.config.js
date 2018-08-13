var path = require("path");
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
var config = {
    devServer: {
      proxy: {
        "/api/*": {
          target: "http://localhost:8090",
          secure: false,
          rewrite: function(req, options) {
            //you can handle rewrite here if you need to
          }
        },

      }
    },
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            }
        ]
    }
};
module.exports = config;
