import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Container from './components/Container';

const App = () => (
  <div className="App">
    <Router>
      <Route component={() => <Container />} />
    </Router>
  </div>
);

export default App;
