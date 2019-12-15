const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const jsonServer = require('json-server');

const request = require('request');

dotenv.config();

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: 'client/build',
});
const PORT = process.env.PORT || 5000;
const basePrimaveraUrl = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}`;

const SalesController = require('./modules/sales');
const FinancialController = require('./modules/financial');
const ProductController = require('./modules/product');
const InventoryController = require('./modules/inventory');
const PurchasesController = require('./modules/purchases');
const SuppliersController = require('./modules/suppliers');
const AuthController = require('./modules/auth');
// eslint-disable-next-line no-underscore-dangle
const db = router.db.__wrapped__;

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

const loginPrimavera = () => {
  const options = {
    method: 'POST',
    url: 'https://identity.primaverabss.com/connect/token',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    formData: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: 'application',
      grant_type: 'client_credentials',
    },
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    const jsonF = JSON.parse(response.body);
    global.primaveraRequests = request.defaults({
      headers: { Authorization: `Bearer ${jsonF.access_token}` },
    });
  });
};

loginPrimavera();

SalesController(server, db);
FinancialController(server, db);
ProductController(server, db, basePrimaveraUrl);
InventoryController(server, basePrimaveraUrl);
PurchasesController(server, basePrimaveraUrl);
SuppliersController(server, basePrimaveraUrl);
AuthController(server);

server.get('/api/year', (req, res) => {
  res.json({ year: parseInt(db.Header.FiscalYear, 10) });
});

// Set static folder in production
if (process.env.NODE_ENV === 'production') {
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

process.on('SIGINT', () => {
  console.log('Bye bye!');
  process.exit();
});

server.use(router);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
