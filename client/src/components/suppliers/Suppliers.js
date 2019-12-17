import React, { useEffect, useState } from 'react';

import KpiTable from '../kpiTable';

import { fetchSuppliers } from '../../services/purchasesService';

const headers = [
  { name: 'id', label: 'ID', link: 'suppliers' },
  { name: 'name', label: 'Name' },
  { name: 'value', label: 'Value (€)', number: true },
  { name: 'units', label: 'Units', number: true },
];

const Suppliers = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      try {
        setLoading(true);
        const { data } = await fetchSuppliers();
        setLoading(false);
        setTableData(
          data.map(supplier => ({
            id: supplier.id,
            name: supplier.name,
            value: supplier.value,
            units: supplier.units,
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
      title="Suppliers"
      overlayInfo="Information about the Suppliers: Name, Value and number of Units"
      headers={headers}
      data={tableData}
      error={error}
      loading={loading}
    />
  );
};

export default Suppliers;
