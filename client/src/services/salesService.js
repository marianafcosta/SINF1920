import axios from 'axios';

const baseUrl = '/api/sales';

const fetchTopProducts = () => axios.get(`${baseUrl}/top-products`);

const fetchTopClients = year =>
  axios.get(`${baseUrl}/topClients`, {
    params: {
      year,
    },
  });

export { fetchTopProducts, fetchTopClients };
