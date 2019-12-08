import React from 'react';
import PropTypes from 'prop-types';

import CustomCard from '../CustomCard';

import styles from './KpiValue.module.css';

const KpiValue = ({ value, title, overlayInfo, money }) => {
  return (
    <CustomCard title={title} overlayInfo={overlayInfo}>
      <h1 className={styles.value}>{`${money ? '€' : ''} ${value}`}</h1>
    </CustomCard>
  );
};

KpiValue.defaultProps = {
  money: true,
};

KpiValue.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overlayInfo: PropTypes.string.isRequired,
  money: PropTypes.bool,
};

export default KpiValue;
