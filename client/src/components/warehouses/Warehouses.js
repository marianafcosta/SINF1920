import React, { useState, useEffect } from 'react';

import KpiTable from '../kpiTable';

import { fetchWarehouses } from '../../services/inventoryService';

const headers = [
  { name: 'id', label: 'ID' },
  { name: 'name', label: 'Name' },
  {
    name: 'amount',
    label: 'Current amount (€)',
    number: true,
    format: '0.00a',
  },
];

const Warehouses = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchWarehouses();
        setLoading(false);
        setTableData(
          data.map(({ id, name, amount }) => ({
            id,
            name,
            amount,
          })),
        );
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <KpiTable
      title="Warehouses"
      overlayInfo="Information about the Warehouses: ID, Name and Current amount in euros "
      headers={headers}
      data={tableData}
      error={error}
      loading={loading}
    />
  );
};

export default Warehouses;
