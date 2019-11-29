import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './CustomCard.css';

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
});

const CustomCard = ({
  children,
  title,
  overlayInfo,
  isOverlaySet,
  animation,
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
      <Card className={classes.card}>
        {animation && (isOverlaySet || isOverlayAnimationRunning) && (
          <Card
            className={classNames('overlay', !isOverlaySet ? 'collapsing' : '')}
            onAnimationEnd={handleOverlayAnimationStatus}
          >
            <p>
              <strong>{title}: </strong>
              {overlayInfo}
            </p>
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
  animation: true,
};

CustomCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  overlayInfo: PropTypes.string,
  isOverlaySet: PropTypes.bool,
  animation: PropTypes.bool,
};

const mapStateToProps = state => ({
  isOverlaySet: state.overlay.isSet,
});

export default connect(
  mapStateToProps,
  {},
)(CustomCard);
