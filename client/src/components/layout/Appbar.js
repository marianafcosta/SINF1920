import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import './layout.css';
import { NativeSelect } from '@material-ui/core';

import { logout } from '../../actions/authActions';
import changeOverlayStatus from '../../actions/overlayActions';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 12,
    position: 'relative',
    backgroundColor: '#FFFBA1',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '5px 44px 5px 12px',
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 12,
      borderColor: '#80bdff',
      backgroundColor: '#FFFBA1',
    },
  },
}))(InputBase);

const Appbar = ({
  pageName,
  classes,
  open,
  handleDrawerOpen,
  doLogout,
  isOverlaySet,
  // eslint-disable-next-line
  changeOverlayStatus,
}) => {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [date, setDate] = React.useState('');
  const openUser = Boolean(anchorEl);

  const handleChange = event => {
    setDate(event.target.value);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOverlaySwitch = () => {
    changeOverlayStatus();
  };

  return (
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
        <Switch
          checked={isOverlaySet}
          onChange={handleOverlaySwitch}
          value="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <div>
          <NativeSelect
            value={date}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <option value={2019}>2019</option>
            <option value={2018}>2018</option>
            <option value={2017}>2017</option>
            <option value={2016}>2016</option>
          </NativeSelect>
        </div>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle className="yellow fontSize" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openUser}
            onClose={handleClose}
            className="menu-items"
          >
            <MenuItem
              onClick={() => {
                doLogout();
                history.push('/login');
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Appbar.propTypes = {
  pageName: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  doLogout: PropTypes.func.isRequired,
  isOverlaySet: PropTypes.bool.isRequired,
  changeOverlayStatus: PropTypes.func.isRequired,
};

const mapStateToProps = ({ overlay }) => ({
  isOverlaySet: overlay.isSet,
});

const mapDispatchToProps = {
  doLogout: logout,
  changeOverlayStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appbar);
