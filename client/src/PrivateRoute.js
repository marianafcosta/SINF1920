import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ children, user, roles, path, exact }) => {
  console.log(user);

  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) =>
        user && user.role && roles.includes(user.role) ? (
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
};

PrivateRoute.defaultProps = {
  exact: false,
  user: null,
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(({ auth }) => ({
  user: auth.user,
}))(PrivateRoute);
