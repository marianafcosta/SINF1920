import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import KpiTable from '../kpiTable';

import { fetchTopClients } from '../../services/salesService';

const headers = [
  { name: 'id', label: 'Consumer', link: 'customers' },
  { name: 'total', label: 'Total Spent (€)', number: true, format: '0.00a' },
  { name: 'purchases', label: 'Purchases' },
];

const TopCustomers = ({ year }) => {
  const [topAccounts, setTopAccounts] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const res = await fetchTopClients(year);
        setLoading(false);
        setTopAccounts({
          clients: res.data,
        });
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, [year]);

  useEffect(() => {
    updateTable();
    // eslint-disable-next-line
  }, [topAccounts]);

  return (
    <KpiTable
      title="Top customers"
      overlayInfo="Information about the Top Customers"
      headers={headers}
      data={tableData}
      error={error}
      loading={loading}
    />
  );
};

TopCustomers.propTypes = {
  year: PropTypes.number.isRequired,
};

export default connect(({ year }) => ({ year }))(TopCustomers);
