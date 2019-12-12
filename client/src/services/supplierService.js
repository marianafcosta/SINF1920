import axios from 'axios';

const baseUrl = id => `/api/suppliers/${id}`;

const fetchPendingPurchases = id =>
  axios.get(`${baseUrl(id)}/pending-purchases`);

const fetchTotalPurchased = (id, year) =>
  axios.get(`${baseUrl(id)}/total-purchased`, {
    params: {
      year,
    },
  });

export { fetchPendingPurchases, fetchTotalPurchased };
