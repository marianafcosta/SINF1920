import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CircularProgress } from '@material-ui/core';

import './CustomCard.css';

import ApiCallError from '../apiCallError';

const useStyles = makeStyles({
  card: {
    minWidth: 'auto',
    boxShadow: 'none !important',
    backgroundColor: '#262626',
    borderRadius: '25px',
    padding: '15px',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContainer: {
    border: '2px #fffba1',
    borderRadius: '25px',
    height: '100%',
    padding: '2px 2px 10px 2px',
    backgroundColor: '#fffba1',
  },
  cardTitle: {
    margin: '0',
    color: 'white',
    padding: '5px',
  },
  loadingWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  loadingIcon: {
    margin: '0.5em 0',
    color: '#fffba1',
  },
});

const CustomCard = ({
  children,
  title,
  overlayInfo,
  isOverlaySet,
  firstToggle,
  animation,
  padding,
  error,
  loading,
}) => {
  const classes = useStyles();
  const [isOverlayAnimationRunning, setIsOverlayAnimationRunning] = useState(
    false,
  );

  const handleOverlayAnimationStatus = () => {
    setIsOverlayAnimationRunning(false);
  };

  useEffect(() => {
    setIsOverlayAnimationRunning(true);
  }, [isOverlaySet]);

  return (
    <div className={classes.cardContainer}>
      <Card className={classNames(classes.card, padding)}>
        {animation &&
          (isOverlaySet || isOverlayAnimationRunning) &&
          firstToggle && (
            <Card
              className={classNames(
                'overlay',
                !isOverlaySet ? 'collapsing' : '',
              )}
              onAnimationEnd={handleOverlayAnimationStatus}
            >
              <p>
                <strong>{title}: </strong>
                {overlayInfo}
              </p>
            </Card>
          )}
        <h1 className={classes.cardTitle}>{title}</h1>
        {// eslint-disable-next-line
        error ? (
          <ApiCallError />
        ) : loading ? (
          <div className={classes.loadingWrapper}>
            <CircularProgress className={classes.loadingIcon} />
          </div>
        ) : (
          children
        )}
      </Card>
    </div>
  );
};

CustomCard.defaultProps = {
  children: <></>,
  title: '',
  overlayInfo: 'No description provided',
  isOverlaySet: false,
  firstToggle: false,
  animation: true,
  padding: '',
  error: false,
  loading: false,
};

CustomCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  overlayInfo: PropTypes.string,
  isOverlaySet: PropTypes.bool,
  firstToggle: PropTypes.bool,
  animation: PropTypes.bool,
  padding: PropTypes.string,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  isOverlaySet: state.overlay.isSet,
  firstToggle: state.overlay.firstToggle,
});

export default connect(
  mapStateToProps,
  {},
)(CustomCard);
