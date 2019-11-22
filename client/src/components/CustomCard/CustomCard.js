import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';

import './CustomCard.css';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    boxShadow: 'none !important',
    backgroundColor: '#262626',
    borderRadius: '25px',
    padding: '15px',
  },
  cardContainer: {
    border: '2px #fffba1',
    borderRadius: '25px',
    padding: '2px 2px 10px 2px',
    backgroundColor: '#fffba1',
  },
  cardTitle: {
    margin: '0',
    color: 'white',
    padding: '5px',
  },
});

const CustomCard = ({ children, title }) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <h1 className={classes.cardTitle}>{title}</h1>
        {children}
      </Card>
    </div>
  );
};

CustomCard.defaultProps = {
  children: <></>,
  title: '',
};

CustomCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default CustomCard;
