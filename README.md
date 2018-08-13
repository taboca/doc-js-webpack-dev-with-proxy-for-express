# doc-js-webpack-dev-with-proxy-for-express

In this example, we will learn how to setup a React-based web app that is served from a local development server, and, at the same time, to have this application to load JSON data from another local server using Express. The logical issue that arises relates to cross-domain access; because your app is first served by the Webpack development server — let's say it comes from the localhost:8080. With that, XMLHTTPRequest access to other server-port is not allowed.

In this proposed solution, we will simply setup a proxy server using Webpack's configuration, which is intended to allow both the development environment and the API server working at the same time.  

## What are the sources and repositories here for?

The source in this repository is just kept for the sake of referencing the history of the project changes. Throughout this page you will be able to see links to positions in the history of changes.   

## Making sure certain files are not to be in the version control

First, make sure your .gitignore does not include the ./myProject/node_modules and ./myProject/dist. Dist is where files will be automatically generated by Webpack (and Babel).

```
myProject/node_modules/
myProject/dist/
```

## Setup myProject

```
mkdir myProject
cd myProject
```

## Initialize package.json  

The setup here assumes NodeJS 8.6.0.

```
npm init  
```

## Install React, React-DOM, Webpack, Webpack-dev-server

And other preset definitions so that Babel can transpile ES2015, and React-based code.

```
npm install react react-dom --save
npm install webpack webpack-dev-server babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-2 --save-dev
```

## Setup scripts in the ./myProject/package.json

[Check so far tree at this stage](https://github.com/taboca/doc-js-webpack-dev-with-proxy-for-express/tree/8c2acc960ccb4ee9c043f160544b3cc0c964a929)

```
"scripts": {
  "start": "node app.js",
  "babel-start": "npm run build",
  "build": "webpack --mode development && cp src/index.html dist/index.html && webpack-dev-server --mode development --content-base src/ --inline --hot --history-api-fallback",
  "build:prod": "webpack --mode production && cp src/index.html dist/index.html"
},
```

## Preparing your React-based app with Webpack and Babel (for ES6 and React support)

Create your webpack.config.js

```
var path = require("path");
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
var config = {
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

```

As you try to execute with "npm run build", in the first time, you should be prompted to install a cli tool.

Do an initial test to check if the Webpack "npm run babel-start" script it properly generating your React code:

```
npm run babel-start
```

And test in the browser

```
http://localhost:8080
```

## Let's make an Node-based Express-based app.js server for serving the API

[Check the tree at this stage]()

```
'use strict';

const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/test', (req, res, next) => {

  var outputJSON = {
    'status' : null
  }

  console.log("Data received from client: ")
  console.log(req.body);

  res
    .status(200)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(outputJSON))
    .end();

});

// This cab be used in case you are serving production
//app.use('/', express.static(path.join(__dirname, 'dist')));

// [START listen]
const PORT = process.env.PORT || 8090;
app.listen(process.env.PORT || 8090, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END listen]
// [END app]

module.exports = app;

```
