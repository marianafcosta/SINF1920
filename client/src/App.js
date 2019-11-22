import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import Overview from './pages/Overview';
import Financial from './pages/Financial';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
import SignIn from './pages/SignIn';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={({ location }) =>
                store.getState().auth.isAuthenticated ? (
                  <Overview />
                ) : (
                  <Redirect
                    to={{
                      pathname: '/login',
                      state: { from: location },
                    }}
                  />
                )
              }
            />
            <Route exact path="/login">
              <SignIn />
            </Route>
            <Route exact path="/Finances">
              <Financial />
            </Route>
            <Route exact path="/Purchases">
              <Purchases />
            </Route>
            <Route exact path="/Inventory">
              <Inventory />
            </Route>
            <Route exact path="/sales">
              <Sales />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
