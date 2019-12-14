import React, { useState, useEffect } from 'react';

import CustomCard from '../CustomCard/CustomCard';
import TableCard from '../TableCard';

import { fetchTopClients } from '../../services/salesService';

const headers = [
  { name: 'id', label: 'Consumer', link: 'customers' },
  { name: 'total', label: 'Total Spent (€)' },
  { name: 'purchases', label: 'Purchases' },
];

const TopCustomers = () => {
  const [topAccounts, setTopAccounts] = useState(null);
  const [tableData, setTableData] = useState([]);

  const updateTable = () => {
    if (topAccounts) {
      setTableData(
        topAccounts.clients.map(account => {
          return {
            id: account.id,
            total: account.totalPurchased,
            purchases: account.nPurchases,
          };
        }),
      );
    }
  };

  const fetchData = async () => {
    const res = await fetchTopClients(2019);
    setTopAccounts({
      clients: res.data,
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateTable();
    // eslint-disable-next-line
  }, [topAccounts]);

  return (
    <CustomCard title="Top Customers" overlay="Testing">
      <TableCard headers={headers} data={tableData} />
    </CustomCard>
  );
};

export default TopCustomers;
