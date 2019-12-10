import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import KpiInfoList from '../components/kpiInfoList';
import Layout from '../components/layout/Layout';

import fetchSupplierInfo from '../services/suppliersService';

const Supplier = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchSupplierInfo(id);
      setSupplier(data);
    };
    fetchData();
  }, [id]);

  return (
    <Layout pageName={`Supplier ${supplier ? `- ${supplier.name}` : ''}`}>
      {supplier !== null && (
        <KpiInfoList
          title="Supplier information"
          overlayInfo="Something happened"
          data={[
            supplier.partyKey
              ? { label: 'Supplier', description: `${supplier.partyKey}` }
              : {},
            supplier.name
              ? { label: 'Name', description: `${supplier.name}` }
              : {},
            supplier.streetName
              ? {
                  label: 'Address',
                  description: `${supplier.streetName} ${supplier.buildingNumber}`,
                }
              : {},
            supplier.cityName
              ? { label: 'City', description: `${supplier.cityName}` }
              : {},
            supplier.country
              ? { label: 'Country', description: `${supplier.country}` }
              : {},
            supplier.postalZone
              ? { label: 'Postal Code', description: `${supplier.postalZone}` }
              : {},
            supplier.telephone
              ? {
                  label: 'Telephone Number',
                  description: `${supplier.telephone}`,
                }
              : {},
            supplier.name
              ? { label: 'Fax Number', description: `${supplier.name}` }
              : {},
            supplier.electronicMail
              ? { label: 'E-mail', description: `${supplier.electronicMail}` }
              : {},
            supplier.contactName
              ? { label: 'Fiscal Name', description: `${supplier.contactName}` }
              : {},
            supplier.companyTaxID
              ? {
                  label: 'Fiscal Number',
                  description: `${supplier.companyTaxID}`,
                }
              : {},
            supplier.paymentMethod
              ? {
                  label: 'Payment Method',
                  description: `${supplier.paymentMethodDescription}`,
                }
              : {},
          ]}
        />
        // pending purchases
        // total purchases
      )}
    </Layout>
  );
};

export default Supplier;
