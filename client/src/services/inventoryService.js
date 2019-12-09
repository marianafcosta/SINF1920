import axios from 'axios';

const baseUrl = '/api/inventory';

const fetchProducts = () => axios.get(`${baseUrl}/products`);

// eslint-disable-next-line
export { fetchProducts };
