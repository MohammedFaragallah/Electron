import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './reducers';

import VideoSelectScreen from './screens/VideoSelectScreen';
import ConvertScreen from './screens/ConvertScreen';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Switch>
              <Route path="/convert" component={ConvertScreen} />
              <Route path="/" component={VideoSelectScreen} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
