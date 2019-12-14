const moment = require('moment');

const processPurchases = orders => {
  const monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  orders
    // eslint-disable-next-line eqeqeq
    .forEach(({ documentDate, payableAmount }) => {
      const month = moment(documentDate).month();

      monthlyCumulativeValue[month] += payableAmount.amount;
    });

  return monthlyCumulativeValue;
};

module.exports = (server, basePrimaveraUrl) => {
  server.get('/api/purchases', (req, res) => {
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

      let monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (!JSON.parse(body).message) {
        monthlyCumulativeValue = processPurchases(JSON.parse(body));
      }
      res.json(monthlyCumulativeValue);
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

    if (!global.primaveraRequests)
      return res.json({ msg: 'Primavera token missing' });

    return global.primaveraRequests(options1, function(error, response, body) {
      if (error) throw new Error(error);

      let productBacklog = 0;
      if (!JSON.parse(body).message) {
        const keys = JSON.parse(body).map(({ sourceDocKey }) => sourceDocKey);

        global.primaveraRequests(options2, (error2, response2, body2) => {
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
};
