import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const Appbar = ({ pageName, classes, open, handleDrawerOpen }) => (
  <AppBar
    position="absolute"
    className={clsx(classes.appBar, open && classes.appBarShift)}
  >
    <Toolbar className={classes.toolbar}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        className={classes.title}
      >
        {pageName}
      </Typography>
      <Link color="inherit" href="/login">
        Log in
      </Link>
    </Toolbar>
  </AppBar>
);

Appbar.propTypes = {
  pageName: PropTypes.string.isRequired,
  classes: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};

export default Appbar;
