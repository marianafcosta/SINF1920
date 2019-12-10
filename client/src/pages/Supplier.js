import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../components/layout/Layout';

import fetchSupplierInfo from '../services/suppliersService';


const Supplier = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchSupplierInfo(id); // TODO
      console.log(data);
      setSupplier(data);
    };
    fetchData();
  }, [id]);

  return (
    <Layout
      pageName={`Supplier ${supplier ? `- ${supplier.name}` : ''}`}
    >
      HII
    </Layout>
  );
};

export default Supplier;
