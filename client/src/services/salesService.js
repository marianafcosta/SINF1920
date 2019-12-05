import axios from 'axios';

const baseUrl = '/api/sales';

const fetchTopProducts = () => axios.get(`${baseUrl}/top-products`);

// eslint-disable-next-line
export { fetchTopProducts };
