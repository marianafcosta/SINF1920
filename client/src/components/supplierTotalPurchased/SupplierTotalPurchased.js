import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { fetchTotalPurchased } from '../../services/supplierService';

import KpiValue from '../kpiValue';

const SupplierTotalPurchased = ({ id }) => {
  const [totalPurchased, setTotalPurchased] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchTotalPurchased(id, 2019);
        setLoading(false);
        setTotalPurchased(data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [id]);

  return (
    <KpiValue
      title="Total Purchased"
      overlayInfo="Total value purchased by a Supplier"
      value={numeral(totalPurchased).format('0.0a')}
      unit="€"
      error={error}
      loading={loading}
    />
  );
};

SupplierTotalPurchased.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SupplierTotalPurchased;
