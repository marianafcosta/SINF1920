import axios from 'axios';

const baseUrl = '/api/sales';

const fetchCustomerInfo = id => axios.get(`${baseUrl}/customers/${id}`);

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

export {
  fetchTopProducts,
  fetchTopClients,
  fetchSalesByLocation,
  fetchCustomerInfo,
};
