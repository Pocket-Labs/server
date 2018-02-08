import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <p> React.js using NPM, Babel6 and Webpack</p>;
  }
}

render(<App/>, document.getElementById('app'));
