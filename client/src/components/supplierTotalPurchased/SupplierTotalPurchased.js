import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { fetchTotalPurchased } from '../../services/supplierService';

import KpiValue from '../kpiValue';
import ApiCallError from '../apiCallError';

const SupplierTotalPurchased = ({ id }) => {
  const [totalPurchased, setTotalPurchased] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchTotalPurchased(id, 2019);
        setTotalPurchased(data);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, [id]);

  return error ? (
    <ApiCallError title="Total Purchased" />
  ) : (
    <KpiValue
      title="Total Purchased"
      overlayInfo="something something gemp something"
      value={numeral(totalPurchased).format('0.0a')}
      unit="€"
    />
  );
};

SupplierTotalPurchased.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SupplierTotalPurchased;
