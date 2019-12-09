import axios from 'axios';

const baseUrl = id => `/api/products/${id}`;

const fetchProductUnitsSold = (id, monthly) =>
  axios.get(`${baseUrl(id)}/units-sold${monthly ? '?monthly=true' : ''}`);

const fetchUnitsInStock = id => {
  return axios.get(`${baseUrl(id)}/units-in-stock`);
};

const fetchProductInfo = id => axios.get(`${baseUrl(id)}`);

export { fetchProductUnitsSold, fetchProductInfo, fetchUnitsInStock };
