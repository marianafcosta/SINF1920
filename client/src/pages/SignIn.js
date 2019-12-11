import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import SignInForm from '../components/SignIn/SignInForm';
import Page from '../components/common/Page';

const SignIn = () => (
  <Page title="Login">
    <CssBaseline />
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={4}>
        <SignInForm />
      </Grid>
    </Grid>
  </Page>
);

export default SignIn;
