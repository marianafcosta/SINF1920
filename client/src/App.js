import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import store from './store';

import AppRouter from './AppRouter';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Anaheim", sans-serif',
  },
});


const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </MuiThemeProvider>
);

export default App;
