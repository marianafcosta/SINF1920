import axios from 'axios';

const baseUrl = '/api/customers';

const fetchPurchases = (customerId, year) =>
  axios.get(`${baseUrl}/${customerId}/purchases`); // TODO year

export { fetchPurchases };
