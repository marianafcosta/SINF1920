import axios from 'axios';

const baseUrl = '/api/inventory';

const fetchStock = () => axios.get(`${baseUrl}/stock`);

// eslint-disable-next-line
export { fetchStock };
