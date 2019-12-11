import axios from 'axios';

const baseUrl = '/api/purchases';

const fetchProductBacklog = () => axios.get(`${baseUrl}/product-backlog`);

const fetchPurchases = monthly =>
  axios.get(baseUrl, {
    params: {
      monthly,
      year: 2019,
    },
  });

const fetchSuppliers = () =>
  axios.get(`/api/suppliers`, {
    params: {
      year: 2019, // TODO
    },
  }); // TODO not sure where to put this

export { fetchProductBacklog, fetchPurchases, fetchSuppliers };
