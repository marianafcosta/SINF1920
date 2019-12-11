import axios from 'axios';

const baseUrl = '/api/purchases';

const fetchProductBacklog = () => axios.get(`${baseUrl}/product-backlog`);

const fetchPurchases = monthly =>
  axios.get(baseUrl, {
    params: {
      monthly,
    },
  });

export { fetchProductBacklog, fetchPurchases };
