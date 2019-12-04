import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  children,
  isAuthenticated,
  user,
  roles,
  path,
  exact,
}) => (
  <Route
    exact={exact}
    path={path}
    render={({ location }) =>
      isAuthenticated && user.role && roles.includes(user.role) ? (
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
  user: null,
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  roles: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  user: auth.user,
}))(PrivateRoute);
