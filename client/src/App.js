import React, { useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import AppRouter from './AppRouter';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Anaheim", sans-serif',
  },
});

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
