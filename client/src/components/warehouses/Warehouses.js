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

  const fetchData = async () => {
    const { data } = await fetchWarehouses();
    setTableData(
      data.map(({ id, name, amount }) => ({
        id,
        name,
        amount: numeral(amount).format('0.000a'),
      })),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KpiTable
      title="Warehouses"
      overlayInfo="ksadjf"
      headers={headers}
      data={tableData}
    />
  );
};

export default Warehouses;
