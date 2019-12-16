import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Sidebar from './Sidebar';
import Appbar from './Appbar';
import Page from '../common/Page';
import './layout.css';

function Copyright() {
  return (
    <Typography variant="body2" color="primary" align="center">
      Copyright ©{' '}
      <Link color="inherit" href="/">
        EEC - 360º Company Dashboard
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    boxShadow: 'none',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    backgroundColor: '#262626',
    color: 'white',
    borderBottom: '0px solid #FFFBA1!important',
  },
  typography: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '3rem',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#262626',
    borderBottom: '1px solid #FFFBA1!important',
    boxShadow: 'none',
  },
  yearIndicator: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffba1',
    borderRadius: '50px',
    padding: '0px 15px',
    color: '#262626',
    marginRight: 'auto',
    marginLeft: '1.5em',
  },
  yearIndicatorIcon: {
    color: '#262626',
    marginRight: '0.5em',
  },
  appBarShift: {
    marginLeft: 0,
    width: '100%',
  },
  appBarShiftCEO: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    fontSize: '32px',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#FFFBA1',
    borderRight: '0px solid #FFFBA1!important',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#262626',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    color: 'white',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  yellow: {
    color: '#FFFBA1',
  },
  listBorder: {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
}));

const Layout = ({ children, user, pageName }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Page title={pageName}>
      <div className={classes.root}>
        <CssBaseline />
        <Appbar
          pageName={pageName}
          handleDrawerOpen={handleDrawerOpen}
          classes={classes}
          open={open}
          user={user}
        />
        {user.role === 'CEO' && (
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose,
              ),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <Typography
                className={classes.typography}
                component="h1"
                variant="h6"
                noWrap
              >
                <FlashOnIcon className={classes.yellow} />
                EEC
              </Typography>
              <IconButton color="inherit" onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List className="listBorder">
              <Sidebar pageName={pageName} user={user} />
            </List>
          </Drawer>
        )}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {children}
          </Container>
          <Copyright />
        </main>
      </div>
    </Page>
  );
};

Layout.defaultProps = {
  user: null,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({ role: PropTypes.string }),
  pageName: PropTypes.string.isRequired,
};

export default connect(({ auth }) => ({
  user: auth.user,
}))(Layout);
