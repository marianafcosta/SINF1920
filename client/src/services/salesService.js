import axios from 'axios';

const baseUrl = '/api/sales';

const fetchTopProducts = () => axios.get(`${baseUrl}/top-products`);

export { fetchTopProducts };
