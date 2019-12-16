import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import KpiTable from '../kpiTable';

import { fetchPendingPurchases } from '../../services/supplierService';

const headers = [
  { name: 'id', label: 'Reference' },
  { name: 'date', label: 'Purchase Date', date: true },
  { name: 'value', label: 'Value (€)', number: true },
];

const SupplierPendingPurchases = ({ id }) => {
  const [pendingPurchases, setPendingPurchases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchPendingPurchases(id);
      setPendingPurchases(data);
    };

    fetchData();
  }, [id]);

  return (
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
