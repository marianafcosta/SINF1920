import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';

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

const CustomCard = ({ children, title, overlayInfo, isOverlaySet }) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      {isOverlaySet && <h1>{overlayInfo}</h1>}
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
  overlayInfo: 'No description provided',
  isOverlaySet: false,
};

CustomCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  overlayInfo: PropTypes.string,
  isOverlaySet: PropTypes.bool,
};

const mapStateToProps = state => ({
  isOverlaySet: state.overlay,
});

export default connect(
  mapStateToProps,
  {},
)(CustomCard);
