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
import './layout.css';
import { NativeSelect } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import FlashOnIcon from '@material-ui/icons/FlashOn';
import BootstrapInput from '../common/BootstrapInput';
import { logout } from '../../actions/authActions';
import changeOverlayStatus from '../../actions/overlayActions';

const YellowSwitch = withStyles({
  switchBase: {
    color: 'rgba(255,251,161,0.7)',
    '&$checked': {
      color: 'rgba(255,251,161,1)',
    },
    '&$checked + $track': {
      backgroundColor: 'rgba(255,251,161,0.7)',
    },
  },
  checked: {},
  track: {},
})(Switch);

const Appbar = ({
  pageName,
  classes,
  open,
  handleDrawerOpen,
  doLogout,
  isOverlaySet,
  // eslint-disable-next-line
  changeOverlayStatus,
  user,
  year
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
      className={clsx(
        classes.appBar,
        open &&
          (user.role === 'CEO' ? classes.appBarShiftCEO : classes.appBarShift),
      )}
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
        {user.role !== 'CEO' && (
          <Typography
            className={classes.typography}
            component="h1"
            variant="h6"
            noWrap
          >
            <FlashOnIcon className={classes.yellow} />
            EEC
          </Typography>
        )}
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {pageName}
        </Typography>
        <YellowSwitch
          checked={isOverlaySet}
          onChange={handleOverlaySwitch}
          value="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <div>
          <Typography variant="h6" color="inherit" noWrap>
            {year}
          </Typography>
        </div>
        <div style={{ marginLeft: '12px' }}>
          <Typography variant="h6" color="inherit" noWrap>
            {user.role}
          </Typography>
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

Appbar.defaultProps = {
  user: null,
};

Appbar.propTypes = {
  pageName: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  doLogout: PropTypes.func.isRequired,
  isOverlaySet: PropTypes.bool.isRequired,
  changeOverlayStatus: PropTypes.func.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
};

const mapStateToProps = ({ overlay, year }) => ({
  isOverlaySet: overlay.isSet,
  year
});

const mapDispatchToProps = {
  doLogout: logout,
  changeOverlayStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appbar);
