import axios from 'axios';

const baseUrl = '/api/sales';

const fetchTopProducts = () => axios.get(`${baseUrl}/top-products`);

const fetchTopClients = year => {
  return axios.get(`${baseUrl}/topClients`, {
    params: {
      year,
    },
  });
};

const fetchSalesByLocation = year => {
  return axios.get(`${baseUrl}/location`, {
    params: {
      year,
    },
  });
};

export { fetchTopProducts, fetchTopClients, fetchSalesByLocation };
