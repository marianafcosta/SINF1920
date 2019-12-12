import React, { useEffect, useState } from 'react';
import numeral from 'numeral';

import CustomCard from '../CustomCard';
import TableCard from '../TableCard';

import { fetchSuppliers } from '../../services/purchasesService';

const headers = [
  { name: 'id', label: 'ID', link: 'suppliers' },
  { name: 'name', label: 'Name' },
  { name: 'value', label: 'Value (€)' },
  { name: 'units', label: 'Units' },
];

const Suppliers = () => {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    const { data } = await fetchSuppliers();
    setTableData(
      data.map(supplier => ({
        id: supplier.id,
        name: supplier.name,
        value: numeral(supplier.value).format('0.0a'),
        units: numeral(supplier.units).format('0.0a'),
      })),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CustomCard title="Suppliers" overlayInfo="something something suppliers">
      <TableCard headers={headers} data={tableData} />
    </CustomCard>
  );
};

export default Suppliers;
