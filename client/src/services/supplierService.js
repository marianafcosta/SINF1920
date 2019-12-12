import axios from 'axios';

const baseUrl = '/api/suppliers';

const fetchPendingPurchases = id =>
  axios.get(`${baseUrl}/${id}/pending-purchases`);

// eslint-disable-next-line
export { fetchPendingPurchases };
