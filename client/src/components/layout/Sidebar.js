import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { Link } from 'react-router-dom';
import './layout.css';
import { connect } from 'react-redux';

const Sidebar = ({ pageName, user }) => {
  const links = [
    {
      name: 'Overview',
      link: '/',
      icon: <DashboardIcon />,
    },
    {
      name: 'Finances',
      link: '/finances',
      icon: <AttachMoneyIcon />,
    },
    {
      name: 'Sales',
      link: '/sales',
      icon: <ShoppingCartIcon />,
    },
    {
      name: 'Purchases',
      link: '/purchases',
      icon: <ListAltIcon />,
    },
    {
      name: 'Inventory',
      link: '/inventory',
      icon: <ImportContactsIcon />,
    },
  ];

  const pathsForRole = {
    `CEO`: ['/', '/finances', '/sales', '/purchases', '/inventory'],
    'Head of Finances': ['/finances'],
    'Sales Manager': ['/sales'],
    'Purchases Manager': ['/purchases'],
    'Inventory Manager': ['/inventory'],
  };

  return (
    <div className="linkUI">
      {links.filter(({link}) => pathsForRole[user.role].includes(link)).map(({ name, link, icon }) => (
        <Link to={link} key={name}>
          <ListItem
            button
            className={clsx('list-item', pageName === name ? 'active' : '')}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        </Link>
      ))}
    </div>
  );
};

Sidebar.defaultProps = {
  user: null
}

Sidebar.propTypes = {
  pageName: PropTypes.string.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string
  })
};


export default connect(({ auth }) => ({
  user: auth.user
}))(Sidebar);