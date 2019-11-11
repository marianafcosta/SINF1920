import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import './ListItems.css';

const ListItems = (
  <div>
    <ListItem button className="list-item active">
      <ListItemIcon color="inherit">
        <DashboardIcon color="inherit" />
      </ListItemIcon>
      <ListItemText primary="Overview" />
    </ListItem>
    <ListItem button className="list-item">
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Finance" />
    </ListItem>
    <ListItem button className="list-item">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Sales" />
    </ListItem>
    <ListItem button className="list-item">
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Purchases" />
    </ListItem>
    <ListItem button className="list-item">
      <ListItemIcon>
        <ImportContactsIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItem>
  </div>
);

export default ListItems;
