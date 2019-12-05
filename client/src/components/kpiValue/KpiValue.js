import React from 'react';

import CustomCard from '../CustomCard';

import styles from './KpiValue.module.css';

const KpiValue = ({ value, title, overlayInfo }) => {
  return (
    <CustomCard title={title} overlayInfo={overlayInfo}>
      <h1 className={styles.value}>€{value}</h1>
    </CustomCard>
  );
};

export default KpiValue;
