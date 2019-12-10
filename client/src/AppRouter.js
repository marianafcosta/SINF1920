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
import Product from './pages/Product';
import Supplier from './pages/Supplier';

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

const AppRouter = ({ user }) => (
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
      <PrivateRoute
        exact
        path="/products/:id"
        roles={['CEO', 'Sales Manager', 'Inventory Manager']}
      >
        <Product />
      </PrivateRoute>
      <PrivateRoute
        exact
        path="/suppliers/:id"
        roles={['CEO', 'Purchases Manager', 'Inventory Manager']}
      >
        <Supplier />
      </PrivateRoute>
      <Route exact path="/login">
        {user ? redirectTo(user.role) : <SignIn />}
      </Route>
    </Switch>
  </Router>
);

AppRouter.defaultProps = {
  user: null,
};

AppRouter.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
};

export default connect(({ auth }) => ({
  user: auth.user,
}))(AppRouter);
