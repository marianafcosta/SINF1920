import React, { useState, useEffect } from 'react';
import numeral from 'numeral';

import KpiTable from '../kpiTable';

import { fetchWarehouses } from '../../services/inventoryService';

const headers = [
  { name: 'id', label: 'ID' },
  { name: 'name', label: 'Name' },
  { name: 'amount', label: 'Current amount (€)' },
];

const Warehouses = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        const { data } = await fetchWarehouses();
        setTableData(
          data.map(({ id, name, amount }) => ({
            id,
            name,
            amount: numeral(amount).format('0.000a'),
          })),
        );
      } catch (e) {
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
    />
  );
};

export default Warehouses;
