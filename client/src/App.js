import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/SignIn';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
