import React, { Component } from 'react';
import APITester from './APITester';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1 className="App-title">
            Webpack development and API JSON via Proxy
          </h1>
          <APITester />
      </div>
    );
  }
}

export default App;
