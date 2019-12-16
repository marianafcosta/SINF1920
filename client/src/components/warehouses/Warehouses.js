import React, { useState, useEffect } from 'react';
import numeral from 'numeral';

import KpiTable from '../kpiTable';
import ApiCallError from '../apiCallError';

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
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  return error ? (
    <ApiCallError title="Warehouses" />
  ) : (
    <KpiTable
      title="Warehouses"
      overlayInfo="ksadjf"
      headers={headers}
      data={tableData}
    />
  );
};

export default Warehouses;
