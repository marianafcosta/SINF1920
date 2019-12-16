import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import CustomCard from '../CustomCard';

import styles from './KpiValue.module.css';

const KpiValue = ({
  value,
  unit,
  title,
  overlayInfo,
  format,
  error,
  loading,
}) => (
  <CustomCard
    title={`${title}${unit !== null ? ` (${unit})` : ''}`}
    overlayInfo={overlayInfo}
    error={error}
    loading={loading}
  >
    <div className={styles.valueWrapper}>
      <h1 className={styles.value}>
        {format ? numeral(value).format(format) : value}
      </h1>
    </div>
  </CustomCard>
);

KpiValue.defaultProps = {
  unit: null,
  format: null,
  error: false,
  loading: false,
};

KpiValue.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.string,
  title: PropTypes.string.isRequired,
  overlayInfo: PropTypes.string.isRequired,
  format: PropTypes.string,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

export default KpiValue;
