import React from 'react';
import PropTypes from 'prop-types';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CustomCard from '../CustomCard';

import styles from './apiCallError.module.css';

const ApiCallError = ({ title }) => (
  <CustomCard title={title} animation={false}>
    <div className={styles.icon}>
      <ErrorOutlineIcon htmlColor="#FF5252" fontSize="large" />
    </div>
    <p className={styles.lead}>Could not fetch this information!</p>
  </CustomCard>
);

ApiCallError.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ApiCallError;
