import axios from 'axios';

const baseUrl = '/api/sales';

const fetchCustomerInfo = id => axios.get(`${baseUrl}/customers/${id}`);

const fetchTopProducts = () => axios.get(`${baseUrl}/top-products`);

const fetchTopClients = () => {
  return axios.get(`${baseUrl}/topClients`, {});
};

const fetchSalesByLocation = () => {
  return axios.get(`${baseUrl}/location`, {});
};

export {
  fetchTopProducts,
  fetchTopClients,
  fetchSalesByLocation,
  fetchCustomerInfo,
};
