import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import KpiTable from '../kpiTable';

import { fetchPendingPurchases } from '../../services/supplierService';

const headers = [
  { name: 'id', label: 'Reference' },
  { name: 'date', label: 'Purchase Date', date: true },
  { name: 'value', label: 'Value (€)', number: true, format: '0.00a' },
];

const SupplierPendingPurchases = ({ id }) => {
  const [pendingPurchases, setPendingPurchases] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchPendingPurchases(id);
        setLoading(false);
        setPendingPurchases(data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [id]);

  return (
    <KpiTable
      title="Pending purchases"
      overlayInfo="Purchases pending from this Supplier"
      headers={headers}
      data={pendingPurchases}
      error={error}
      loading={loading}
    />
  );
};

SupplierPendingPurchases.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SupplierPendingPurchases;
