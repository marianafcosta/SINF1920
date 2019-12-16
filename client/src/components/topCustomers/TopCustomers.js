import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import KpiTable from '../kpiTable';

import { fetchTopClients } from '../../services/salesService';

const headers = [
  { name: 'id', label: 'Consumer', link: 'customers' },
  { name: 'total', label: 'Total Spent (€)' },
  { name: 'purchases', label: 'Purchases' },
];

const TopCustomers = ({ year }) => {
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
    const res = await fetchTopClients(year);
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
    <KpiTable
      title="Top customers"
      overlayInfo="lskdfa"
      headers={headers}
      data={tableData}
    />
  );
};

TopCustomers.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(TopCustomers);
