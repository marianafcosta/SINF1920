import axios from 'axios';

const baseUrl = '/api/purchases';

const fetchProductBacklog = () => axios.get(`${baseUrl}/product-backlog`);

// eslint-disable-next-line
export { fetchProductBacklog };
