import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, CssBaseline, Button, makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import WarningIcon from '@material-ui/icons/Warning';
import Page from '../components/common/Page';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: '#262626',
    },
  },
  lead: {
    color: 'white',
    fontSize: '2rem',
  },
  icon: {
    transform: 'scale(4)',
    marginBottom: '2rem',
  },
  button: {
    margin: theme.spacing(2, 0, 1),
    backgroundColor: '#FFFBA1',
    color: '#262626',
    borderRadius: '23px',
    padding: '0.5rem 3rem',
    textTransform: 'none',
    fontSize: '1.5rem',
    lineHeight: '1.5rem',
    '&:hover': {
      backgroundColor: '#fff96e',
    },
  },
}));

const NotFound = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Page title="Not Found">
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <WarningIcon className={classes.icon} htmlColor="#FFFBA1" />
        </Grid>
        <Grid item className={classes.lead}>
          Oops! The page you tried to access doesn&apos;t exist!
        </Grid>
        <Grid item>
          <Button
            startIcon={<HomeIcon />}
            className={classes.button}
            onClick={() => history.push('/')}
            size="large"
          >
            Homepage
          </Button>
        </Grid>
      </Grid>
    </Page>
  );
};

export default NotFound;
