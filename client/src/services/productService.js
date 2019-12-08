import axios from 'axios';

const baseUrl = id => `/api/products/${id}`;

const fetchProductUnitsSold = id => axios.get(`${baseUrl(id)}/units-sold`);

const fetchProductInfo = id => axios.get(`${baseUrl(id)}`);

export { fetchProductUnitsSold, fetchProductInfo };
