import React, { Component } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
// import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// const { ipcRenderer } = window.require('electron');

class App extends Component {
  render() {
    return <div className="app">{this.props.children}</div>;
  }
}

export default connect()(App);
