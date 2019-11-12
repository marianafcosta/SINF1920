import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Overview from './components/dashboard/Overview';
import Financial from './components/Financial/Financial';
import Inventory from './components/Inventory/Inventory';
import Sales from './components/Sales/Sales';
import Purchases from './components/Purchases/Purchases';
import SignIn from './components/SignIn';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Overview />
          </Route>
          <Route exact path="/login">
            <SignIn />
          </Route>
          <Route exact path="/finances">
            <Financial />
          </Route>
          <Route exact path="/purchases">
            <Purchases />
          </Route>
          <Route exact path="/inventory">
            <Inventory />
          </Route>
          <Route exact path="/sales">
            <Sales />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
