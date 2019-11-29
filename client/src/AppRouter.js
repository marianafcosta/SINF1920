import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';

import Overview from './pages/Overview';
import Financial from './pages/Financial';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
import SignIn from './pages/SignIn';

const AppRouter = ({ isAuthenticated }) => (
  <Router>
    <Switch>
      <PrivateRoute exact path="/">
        <Overview />
      </PrivateRoute>
      <PrivateRoute exact path="/finances">
        <Financial />
      </PrivateRoute>
      <PrivateRoute exact path="/purchases">
        <Purchases />
      </PrivateRoute>
      <PrivateRoute exact path="/inventory">
        <Inventory />
      </PrivateRoute>
      <PrivateRoute exact path="/sales">
        <Sales />
      </PrivateRoute>
      <Route exact path="/login">
        {isAuthenticated ? <Redirect to="/" /> : <SignIn />}
      </Route>
    </Switch>
  </Router>
);

AppRouter.defaultProps = {
  isAuthenticated: null,
};

AppRouter.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default connect(({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
}))(AppRouter);
