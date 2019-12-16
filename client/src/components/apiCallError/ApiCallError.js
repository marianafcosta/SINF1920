import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import styles from './apiCallError.module.css';

const ApiCallError = () => (
  <>
    <div className={styles.icon}>
      <ErrorOutlineIcon htmlColor="#FF5252" fontSize="large" />
    </div>
    <p className={styles.lead}>Could not fetch this information!</p>
  </>
);

export default ApiCallError;
