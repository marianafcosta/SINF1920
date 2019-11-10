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

import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/SignIn';

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
                  <Dashboard />
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
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
