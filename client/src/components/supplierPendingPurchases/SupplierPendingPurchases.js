import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import KpiTable from '../kpiTable';
import ApiCallError from '../apiCallError';

import { fetchPendingPurchases } from '../../services/supplierService';

const headers = [
  { name: 'id', label: 'Reference' },
  { name: 'date', label: 'Purchase Date', date: true },
  { name: 'value', label: 'Value (€)', number: true },
];

const SupplierPendingPurchases = ({ id }) => {
  const [pendingPurchases, setPendingPurchases] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchPendingPurchases(id);
        setPendingPurchases(data);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, [id]);

  return error ? (
    <ApiCallError title="Pending purchases" />
  ) : (
    <KpiTable
      title="Pending purchases"
      overlayInfo="kajsdhfs"
      headers={headers}
      data={pendingPurchases}
    />
  );
};

SupplierPendingPurchases.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SupplierPendingPurchases;
