import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

import KpiInfoList from '../components/kpiInfoList';
import Layout from '../components/layout/Layout';
import CustomerPurchases from '../components/customerPurchases';

import { fetchCustomerInfo } from '../services/salesService';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Customer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchCustomerInfo(id);
      setCustomer(data);
    };
    fetchData();
  }, [id]);

  return (
    <Layout pageName={`Customer ${customer ? `- ${customer.name}` : ''}`}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            {customer !== null && (
              <KpiInfoList
                title="Customer information"
                overlayInfo="Something happened"
                data={[
                  customer.partyKey
                    ? { label: 'ID', description: `${customer.partyKey}` }
                    : {},
                  customer.name
                    ? { label: 'Name', description: `${customer.name}` }
                    : {},
                  customer.streetName
                    ? {
                        label: 'Address',
                        description: `${customer.streetName} ${customer.buildingNumber}`,
                      }
                    : {},
                  customer.cityName
                    ? { label: 'City', description: `${customer.cityName}` }
                    : {},
                  customer.country
                    ? { label: 'Country', description: `${customer.country}` }
                    : {},
                  customer.postalZone
                    ? {
                        label: 'Postal Code',
                        description: `${customer.postalZone}`,
                      }
                    : {},
                  customer.telephone
                    ? {
                        label: 'Telephone Number',
                        description: `${customer.telephone}`,
                      }
                    : {},
                  customer.electronicMail
                    ? {
                        label: 'E-mail',
                        description: `${customer.electronicMail}`,
                      }
                    : {},
                  customer.contactName
                    ? {
                        label: 'Fiscal Name',
                        description: `${customer.contactName}`,
                      }
                    : {},
                  customer.companyTaxID
                    ? {
                        label: 'Fiscal Number',
                        description: `${customer.companyTaxID}`,
                      }
                    : {},
                  customer.paymentMethod
                    ? {
                        label: 'Payment Method',
                        description: `${customer.paymentMethodDescription}`,
                      }
                    : {},
                  customer.paymentTermDescription
                    ? {
                        label: 'Payment Description',
                        description: `${customer.paymentTermDescription}`,
                      }
                    : {},
                ]}
              />
            )}
          </Grid>
          <Grid item sm={12}>
            <CustomerPurchases customerId={id} />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Customer;
