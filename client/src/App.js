import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import setYear from './actions/yearActions';

import AppRouter from './AppRouter';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Anaheim", sans-serif',
  },
});

const App = ({ initYear }) => {
  useEffect(() => {
    initYear();
    // eslint-disable-next-year
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  );
};

App.propTypes = {
  initYear: PropTypes.func.isRequired,
};

export default connect(
  null,
  { initYear: setYear },
)(App);
