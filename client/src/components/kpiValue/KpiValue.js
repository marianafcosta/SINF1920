import React from 'react';
import PropTypes from 'prop-types';

import CustomCard from '../CustomCard';

import styles from './KpiValue.module.css';

const KpiValue = ({ value, unit, title, overlayInfo }) => {
  return (
    <CustomCard
      title={`${title}${unit !== null ? ` (${unit})` : ''}`}
      overlayInfo={overlayInfo}
    >
      <h1 className={styles.value}>{value}</h1>
    </CustomCard>
  );
};

KpiValue.defaultProps = {
  unit: null,
};

KpiValue.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.string,
  title: PropTypes.string.isRequired,
  overlayInfo: PropTypes.string.isRequired,
};

export default KpiValue;
