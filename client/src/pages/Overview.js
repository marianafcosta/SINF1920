import React from 'react';
import Layout from '../components/layout/Layout';
import CustomCard from '../components/CustomCard/CustomCard';
import TableCard from '../components/TableCard/TableCard';

const Overview = () => (
  <Layout>
    <CustomCard
      title="Sales vs Expenses"
      overlayInfo="testing overlay descriptions"
    >
      <TableCard
        headers={[
          { name: 'id', label: 'ID' },
          { name: 'name', label: 'Name' },
          { name: 'topProduct', label: 'Top Product' },
          { name: 'amount', label: 'Amount' },
        ]}
        data={[
          {
            id: 1,
            name: 'Mariana Costa',
            topProduct: 'Razor JK341',
            amount: 340,
          },
          {
            id: 2,
            name: 'Pedro Fernandes',
            topProduct: "Macbook Pro 15'",
            amount: 1230,
          },
          {
            id: 3,
            name: 'Andre Esteves',
            topProduct: 'MSI G723',
            amount: 3420,
          },
          {
            id: 4,
            name: 'Pedro Silva',
            topProduct: 'Razor JK341',
            amount: 3340,
          },
          {
            id: 5,
            name: 'Mariana Costa',
            topProduct: 'Razor JK341',
            amount: 340,
          },
          {
            id: 6,
            name: 'Pedro Fernandes',
            topProduct: "Macbook Pro 15'",
            amount: 1230,
          },
          {
            id: 7,
            name: 'Andre Esteves',
            topProduct: 'MSI G723',
            amount: 3420,
          },
          {
            id: 8,
            name: 'Pedro Silva',
            topProduct: 'Razor JK341',
            amount: 3340,
          },
        ]}
      />
    </CustomCard>
  </Layout>
);

export default Overview;
