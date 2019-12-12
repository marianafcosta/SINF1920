const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const jsonServer = require('json-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const request = require('request');
const moment = require('moment');

const auth = require('./middleware/auth');

dotenv.config();

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: 'client/build',
});
const PORT = process.env.PORT || 5000;
const basePrimaveraUrl = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}`;

let primaveraRequests;

const SalesController = require('./modules/sales');
const FinancialController = require('./modules/financial');
const ProductController = require('./modules/product');
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
    primaveraRequests = request.defaults({
      headers: { Authorization: `Bearer ${jsonF.access_token}` },
    });
  });
};

loginPrimavera();

SalesController(server, db);
FinancialController(server, db);
ProductController(server, db);

// @route   POST api/auth
// @desc    Auth user
// @access  Public
server.post('/api/auth', (req, res) => {
  const { email, password } = req.body;
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const data = fs.readFileSync('users.json', 'utf8');
  const users = JSON.parse(data);
  const user = users.find(usr => usr.email === email);

  // Check for existing user
  if (!user) return res.status(400).json({ msg: 'User Does not exist' });

  // Validate password
  bcrypt.compare(password, user.password).then(isMatch => {
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      },
    );
    return true;
  });

  return true;
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
server.get('/api/auth/user', auth, (req, res) => {
  const data = fs.readFileSync('users.json', 'utf8');
  const users = JSON.parse(data);
  const user = users.find(usr => usr.id === req.user.id);
  delete user.password;
  res.json(user);
});

server.get('/api/expenses', auth, (req, res) => {
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/invoiceReceipt/expenses/`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.json(body);
  });
});

const processProductStock = product => {
  const totalStock = product.materialsItemWarehouses.reduce((acc, curr) => {
    return acc + curr.stockBalance;
  }, 0);
  return totalStock;
};

const processProductInfo = product => {
  return {
    barcode: product.barcode,
    description: product.description,
    code: product.itemKey,
  };
};

// TODO auth
server.get('/api/products/:id/units-in-stock', (req, res) => {
  const { id } = req.params;
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/materialscore/materialsitems/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    let totalStock = 0;
    if (!JSON.parse(body).message) {
      totalStock = processProductStock(JSON.parse(body));
    }
    res.json(totalStock);
  });
});

const processProducts = materials =>
  materials.map(({ itemKey, description, materialsItemWarehouses }) => ({
    id: itemKey,
    name: description,
    quantity: materialsItemWarehouses.reduce(
      (accum, val) => accum + val.stockBalance,
      0,
    ),
    value: materialsItemWarehouses.reduce(
      (accum, val) => accum + val.inventoryBalance.amount,
      0,
    ),
  }));

const processStock = materials =>
  materials.reduce(
    (accum, val) =>
      accum +
      val.materialsItemWarehouses.reduce(
        (accum2, val2) => accum2 + val2.inventoryBalance.amount,
        0,
      ),
    0,
  );

const processProductAveragePVP = product => {
  console.log(product);
  const { priceListLines } = product;
  const pvpSum = priceListLines.reduce(
    (acc, curr) => acc + curr.priceAmount.amount,
    0,
  );
  return Number((pvpSum / priceListLines.length).toFixed(2));
};

const processProductAverageCost = (orders, id) => {
  const costs = [];

  orders.forEach(({ documentLines }) => {
    costs.push(
      ...documentLines
        .filter(line => line.purchasesItem === id)
        .map(line => line.unitPrice.amount),
    );
  });

  return costs.reduce((accum, curr) => accum + curr, 0) / costs.length;
};

server.get('/api/inventory/products', (req, res) => {
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/materialsCore/materialsItems`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    let products = [];
    if (!JSON.parse(body).message) {
      products = processProducts(JSON.parse(body));
    }
    res.json(products);
  });
});

server.get('/api/purchases/product-backlog', (req, res) => {
  const options2 = {
    method: 'GET',
    url: `${basePrimaveraUrl}/purchases/orders`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const options1 = {
    method: 'GET',
    url: `${basePrimaveraUrl}/goodsReceipt/processOrders/1/1000?company=${process.env.COMPANY}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options1, function(error, response, body) {
    if (error) throw new Error(error);

    let productBacklog = 0;
    if (!JSON.parse(body).message) {
      const keys = JSON.parse(body).map(({ sourceDocKey }) => sourceDocKey);

      primaveraRequests(options2, (error2, response2, body2) => {
        if (error2) throw new Error(error2);

        if (!JSON.parse(body2).message) {
          let receipts = JSON.parse(body2);

          receipts = receipts.filter(({ naturalKey }) =>
            keys.find(key => naturalKey === key),
          );

          productBacklog = receipts.reduce(
            (accum, curr) => accum + curr.payableAmount.amount,
            0,
          );

          res.json(productBacklog);
        }
      });
    }
  });
});

const processPurchases = (orders, year) => {
  const monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  orders
    // eslint-disable-next-line eqeqeq
    .filter(order => moment(order.documentDate).year() == year)
    .forEach(({ documentDate, payableAmount }) => {
      const month = moment(documentDate).month();

      monthlyCumulativeValue[month] += payableAmount.amount;
    });

  return monthlyCumulativeValue;
};

server.get('/api/purchases', (req, res) => {
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/purchases/orders`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);

    let monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (!JSON.parse(body).message) {
      monthlyCumulativeValue = processPurchases(
        JSON.parse(body),
        req.query.year,
      );
    }
    res.json(monthlyCumulativeValue);
  });
});

server.get('/api/inventory/stock', (req, res) => {
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/materialsCore/materialsItems`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    let stock = 0;
    if (!JSON.parse(body).message) {
      stock = processStock(JSON.parse(body));
    }
    res.json(stock);
  });
});

// TODO auth
server.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/materialscore/materialsitems/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  console.log(id);

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    let productInfo;
    if (!JSON.parse(body).message) {
      productInfo = processProductInfo(JSON.parse(body));
    }
    res.json(productInfo);
  });
});

server.get('/api/products/:id/average-pvp', (req, res) => {
  const { id } = req.params;
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/salescore/salesitems/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  console.log(id);

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    let averagePVP;
    if (!JSON.parse(body).message) {
      averagePVP = processProductAveragePVP(JSON.parse(body));
    }
    res.json(averagePVP);
  });
});

server.get('/api/products/:id/average-cost', (req, res) => {
  const { id } = req.params;
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/purchases/orders`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    let averageCost = 0;
    if (!JSON.parse(body).message) {
      averageCost = processProductAverageCost(JSON.parse(body), id);
    }
    res.json(averageCost);
  });
});

server.get('/api/suppliers/:id', (req, res) => {
  const { id } = req.params;
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/purchasesCore/supplierParties/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.json(JSON.parse(body));
  });
});

server.get('/api/suppliers/:id/pending-purchases', (req, res) => {
  const { id } = req.params;
  const options2 = {
    method: 'GET',
    url: `${basePrimaveraUrl}/purchases/orders`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const options1 = {
    method: 'GET',
    url: `${basePrimaveraUrl}/goodsReceipt/processOrders/1/1000?company=${process.env.COMPANY}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options1, function(error, response, body) {
    if (error) throw new Error(error);

    if (!JSON.parse(body).message) {
      const keys = JSON.parse(body)
        .filter(({ party }) => party === id)
        .map(({ sourceDocKey }) => sourceDocKey);

      primaveraRequests(options2, (error2, response2, body2) => {
        if (error2) throw new Error(error2);

        if (!JSON.parse(body2).message) {
          let pendingPurchases = JSON.parse(body2);

          pendingPurchases = pendingPurchases
            .filter(({ naturalKey }) => keys.find(key => naturalKey === key))
            .map(({ naturalKey, documentDate, payableAmount }) => ({
              id: naturalKey,
              date: documentDate,
              value: payableAmount.amount,
            }));

          res.json(pendingPurchases);
        }
      });
    }
  });
});

const processTotalPurchased = (orders, supplier, year) =>
  orders
    .filter(
      ({ sellerSupplierParty, documentDate }) =>
        sellerSupplierParty === supplier &&
        moment(documentDate).year() === parseInt(year, 10),
    )
    .reduce((accum, order) => accum + order.payableAmount.amount, 0);

server.get('/api/suppliers/:id/total-purchased', (req, res) => {
  const { id } = req.params;
  const { year } = req.query;

  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/purchases/orders`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);

    let totalPurchased = 0;
    if (!JSON.parse(body).message) {
      const orders = JSON.parse(body);
      totalPurchased = processTotalPurchased(orders, id, year);
    }
    res.json(totalPurchased);
  });
});

server.get('/api/sales/customers/:id', (req, res) => {
  const { id } = req.params;
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/salescore/customerParties/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.json(JSON.parse(body));
  });
});

const processProductSuppliers = (product, orders, year) => {
  const suppliers = {};
  if (orders) {
    orders
      // eslint-disable-next-line
      .filter(order => moment(order.documentDate).year() == year)
      .forEach(order => {
        order.documentLines
          .filter(line => (product ? line.purchasesItem === product : true))
          .forEach(lineParsed => {
            if (suppliers[order.sellerSupplierParty]) {
              suppliers[order.sellerSupplierParty].value += Number(
                lineParsed.grossValue.amount,
              );
              suppliers[order.sellerSupplierParty].value += Number(
                lineParsed.quantity,
              );
            } else {
              suppliers[order.sellerSupplierParty] = {
                id: order.sellerSupplierParty,
                name: order.sellerSupplierPartyName,
                value: Number(lineParsed.grossValue.amount),
                units: Number(lineParsed.quantity),
              };
            }
          });
      });
  }
  return Object.keys(suppliers).map(supplier => suppliers[supplier]);
};

server.get('/api/products/:id/suppliers', (req, res) => {
  const { id } = req.params;
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/purchases/orders`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.json(processProductSuppliers(id, JSON.parse(body), req.query.year));
  });
});

server.get('/api/suppliers', (req, res) => {
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/purchases/orders`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    res.json(processProductSuppliers(null, JSON.parse(body), req.query.year));
  });
});

const processWarehouses = items => {
  const warehouses = {};
  if (items) {
    items.forEach(item => {
      item.materialsItemWarehouses.forEach(materialsItem => {
        if (warehouses[materialsItem.warehouse]) {
          warehouses[materialsItem.warehouse].amount +=
            materialsItem.inventoryBalance.reportingAmount; // ?? or just .amount
        } else {
          warehouses[materialsItem.warehouse] = {
            id: materialsItem.warehouse,
            name: materialsItem.warehouseDescription,
            amount: materialsItem.inventoryBalance.reportingAmount,
          };
        }
      });
    });
  }
  return Object.keys(warehouses).map(warehouse => warehouses[warehouse]);
};

server.get('/api/inventory/warehouses', (req, res) => {
  const options = {
    method: 'GET',
    url: `${basePrimaveraUrl}/materialscore/materialsitems`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!primaveraRequests) return res.json({ msg: 'Primavera token missing' });

  return primaveraRequests(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(processWarehouses(JSON.parse(body)));
    res.json(processWarehouses(JSON.parse(body)));
  });
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
