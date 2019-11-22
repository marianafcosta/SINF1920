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
    position: 'relative',
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
  overlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    flex: '1',
    zIndex: '9999',
    minWidth: 275,
    boxShadow: 'none !important',
    backgroundColor: '#262626',
    borderRadius: '25px',
    padding: '15px',
  },
});

const CustomCard = ({ children, title, overlayInfo, isOverlaySet }) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        {isOverlaySet && (
          <Card className={classes.overlay}>
            <p>{overlayInfo}</p>
          </Card>
        )}
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
