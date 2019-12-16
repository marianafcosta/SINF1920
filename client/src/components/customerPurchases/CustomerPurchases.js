import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import KpiTable from '../kpiTable';

import { fetchPurchases } from '../../services/customerService';

const headers = [
  { name: 'id', label: 'ID', link: 'products' },
  { name: 'name', label: 'Name' },
  { name: 'units', label: 'Units' },
  { name: 'value', label: 'Value' },
];

const CustomerPurchases = ({ customerId }) => {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);

      try {
        setLoading(true);
        const { data } = await fetchPurchases(customerId, 2019);
        setLoading(false);
        setPurchases(
          data.map(item => ({
            ...item,
            units: numeral(item.units).format('0a'),
            value: numeral(item.value).format('0.000a'),
          })),
        );
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, [customerId]);

  return (
    <KpiTable
      title="Purchases"
      overlayInfo="dkfngçsdasfsd"
      headers={headers}
      data={purchases}
      error={error}
      loading={loading}
    />
  );
};

CustomerPurchases.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default CustomerPurchases;
