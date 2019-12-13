import axios from 'axios';

const baseUrl = '/api/customers';

// eslint-disable-next-line
const fetchPurchases = (customerId, year) =>
  axios.get(`${baseUrl}/${customerId}/purchases`); // TODO year

// eslint-disable-next-line
export { fetchPurchases };
