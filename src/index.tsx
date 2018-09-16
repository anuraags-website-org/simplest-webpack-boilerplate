import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { match, Route, RouteComponentProps, Switch  } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';

import * as styles from './index.css';

class App extends React.Component {
  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>,
  document.getElementById('app'),
);