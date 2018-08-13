# doc-js-webpack-dev-with-proxy-for-express

In this example, we will learn how to setup a React-based web app that is served from a local development server, and, at the same time, to have this application to load JSON data from another local server using Express. The logical issue that arises relates to cross-domain access; because your app is first served by the Webpack development server — let's say it comes from the localhost:8080. With that, XMLHTTPRequest access to other server-port is not allowed.

In this proposed solution, we will simply setup a proxy server using Webpack's configuration, which is intended to allow both the development environment and the API server working at the same time.  

## What are the sources and repositories here for?

The source in this repository is just kept for the sake of referencing the history of the project changes.

## Preparing your React-based app with Webpack and Babel (for ES6 and React support)

First, let's create a new directory:

```
mkdir myProject
```


nvm use 8.6.0

npm install react react-dom --save
npm install webpack webpack-dev-server babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-2 --save-dev
