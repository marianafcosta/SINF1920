import React from 'react';
import PropTypes from 'prop-types';

import CustomCard from '../CustomCard';

import styles from './KpiInfoList.module.css';

const KpiInfoList = ({ title, overlayInfo, data, error, loading }) => {
  return (
    <CustomCard
      title={title}
      overlayInfo={overlayInfo}
      error={error}
      loading={loading}
    >
      <ul className={styles.list}>
        {data.map(
          item =>
            Object.entries(item).length !== 0 && (
              <li className={styles.listItem} key={item.label}>
                <strong className={styles.label}>{item.label}</strong>
                <strong className={styles.description}>
                  {item.description}
                </strong>
              </li>
            ),
        )}
      </ul>
    </CustomCard>
  );
};

KpiInfoList.defaultProps = {
  error: false,
  loading: false,
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
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

export default KpiInfoList;
