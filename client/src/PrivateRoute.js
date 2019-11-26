import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ children, isAuthenticated, path, exact }) => (
  <Route
    exact={exact}
    path={path}
    render={({ location }) =>
      isAuthenticated ? (
        children
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
);

PrivateRoute.defaultProps = {
  exact: false,
  isAuthenticated: null,
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
};

export default connect(({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
}))(PrivateRoute);
