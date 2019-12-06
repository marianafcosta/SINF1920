import React from 'react';
import PropTypes from 'prop-types';

import CustomCard from '../CustomCard';

import styles from './KpiValue.module.css';

const KpiValue = ({ value, title, overlayInfo }) => {
  return (
    <CustomCard title={title} overlayInfo={overlayInfo}>
      <h1 className={styles.value}>€{value}</h1>
    </CustomCard>
  );
};

KpiValue.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overlayInfo: PropTypes.string.isRequired,
};

export default KpiValue;
