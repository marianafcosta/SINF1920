import React from 'react';
import PropTypes from 'prop-types';

import CustomCard from '../CustomCard';

import styles from './KpiInfoList.module.css';

const KpiInfoList = ({ title, overlayInfo, data }) => {
  return (
    <CustomCard title={title} overlayInfo={overlayInfo}>
      <ul className={styles.list}>
        {data.map(item => (
          <div className={styles.listItem}>
            <strong className={styles.label}>{item.label}</strong>
            <strong className={styles.description}>{item.description}</strong>
          </div>
        ))}
        <li></li>
      </ul>
    </CustomCard>
  );
};

KpiInfoList.propTypes = {
  title: PropTypes.string.isRequired,
  overlayInfo: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
};

export default KpiInfoList;
