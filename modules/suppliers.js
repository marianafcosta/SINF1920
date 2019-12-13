const moment = require('moment');
const { processProductSuppliers } = require('./utils');

const processTotalPurchased = (orders, supplier, year) =>
  orders
    .filter(
      ({ sellerSupplierParty, documentDate }) =>
        sellerSupplierParty === supplier &&
        moment(documentDate).year() === parseInt(year, 10),
    )
    .reduce((accum, order) => accum + order.payableAmount.amount, 0);

module.exports = (server, basePrimaveraUrl) => {
  server.get('/api/suppliers', (req, res) => {
    const options = {
      method: 'GET',
      url: `${basePrimaveraUrl}/purchases/orders`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (!global.primaveraRequests)
      return res.json({ msg: 'Primavera token missing' });

    return global.primaveraRequests(options, function(error, response, body) {
      if (error) throw new Error(error);
      res.json(processProductSuppliers(null, JSON.parse(body), req.query.year));
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

    if (!global.primaveraRequests)
      return res.json({ msg: 'Primavera token missing' });

    return global.primaveraRequests(options, function(error, response, body) {
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

    if (!global.primaveraRequests)
      return res.json({ msg: 'Primavera token missing' });

    return global.primaveraRequests(options1, function(error, response, body) {
      if (error) throw new Error(error);

      if (!JSON.parse(body).message) {
        const keys = JSON.parse(body)
          .filter(({ party }) => party === id)
          .map(({ sourceDocKey }) => sourceDocKey);

        global.primaveraRequests(options2, (error2, response2, body2) => {
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

    if (!global.primaveraRequests)
      return res.json({ msg: 'Primavera token missing' });

    return global.primaveraRequests(options, function(error, response, body) {
      if (error) throw new Error(error);

      let totalPurchased = 0;
      if (!JSON.parse(body).message) {
        const orders = JSON.parse(body);
        totalPurchased = processTotalPurchased(orders, id, year);
      }
      res.json(totalPurchased);
    });
  });
};
