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

const redirectTo = role => {
  const paths = {
    CEO: '/',
    'Head of Finances': '/finances',
    'Sales Manager': '/sales',
    'Purchases Manager': '/purchases',
    'Inventory Manager': '/inventory',
  };

  return <Redirect to={paths[role]} />;
};

const AppRouter = ({ isAuthenticated, user }) => (
  <Router>
    <Switch>
      <PrivateRoute exact path="/" roles={['CEO']}>
        <Overview user={user} />
      </PrivateRoute>
      <PrivateRoute exact path="/finances" roles={['CEO', 'Head of Finances']}>
        <Financial user={user} />
      </PrivateRoute>
      <PrivateRoute
        exact
        path="/purchases"
        roles={['CEO', 'Purchases Manager']}
      >
        <Purchases user={user} />
      </PrivateRoute>
      <PrivateRoute
        exact
        path="/inventory"
        roles={['CEO', 'Inventory Manager']}
      >
        <Inventory user={user} />
      </PrivateRoute>
      <PrivateRoute exact path="/sales" roles={['CEO', 'Sales Manager']}>
        <Sales user={user} />
      </PrivateRoute>
      <Route exact path="/login">
        {isAuthenticated ? redirectTo(user.role) : <SignIn />}
      </Route>
    </Switch>
  </Router>
);

AppRouter.defaultProps = {
  isAuthenticated: null,
  user: null,
};

AppRouter.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
};

export default connect(({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  user: auth.user,
}))(AppRouter);
