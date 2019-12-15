const { processProductSuppliers } = require('./utils');

const processProductStock = product => {
  const totalStock = product.materialsItemWarehouses.reduce((acc, curr) => {
    return acc + curr.stockBalance;
  }, 0);
  return totalStock;
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

const processProductInfo = product => ({
  barcode: product.barcode,
  description: product.description,
  code: product.itemKey,
});

const processProductAveragePVP = product => {
  const { priceListLines } = product;
  const pvpSum = priceListLines.reduce(
    (acc, curr) => acc + curr.priceAmount.amount,
    0,
  );
  return Number((pvpSum / priceListLines.length).toFixed(2));
};

module.exports = (server, db, basePrimaveraUrl) => {
  server.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const options = {
      method: 'GET',
      url: `${basePrimaveraUrl}/materialscore/materialsitems/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (!global.primaveraRequests)
      return res.json({ msg: 'Primavera token missing' });

    return global.primaveraRequests(options, function(error, response, body) {
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

    if (!global.primaveraRequests)
      return res.json({ msg: 'Primavera token missing' });

    return global.primaveraRequests(options, function(error, response, body) {
      if (error) throw new Error(error);
      let averagePVP;
      if (!JSON.parse(body).message) {
        averagePVP = processProductAveragePVP(JSON.parse(body));
      }
      res.json(averagePVP);
    });
  });

  server.get('/api/products/:id/units-in-stock', (req, res) => {
    const { id } = req.params;
    const options = {
      method: 'GET',
      url: `${basePrimaveraUrl}/materialscore/materialsitems/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (!global.primaveraRequests)
      return res.json({ msg: 'Primavera token missing' });

    return global.primaveraRequests(options, function(error, response, body) {
      if (error) throw new Error(error);
      let totalStock = 0;
      if (!JSON.parse(body).message) {
        totalStock = processProductStock(JSON.parse(body));
      }
      res.json(totalStock);
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

    if (!global.primaveraRequests)
      return res.json({ msg: 'Primavera token missing' });

    return global.primaveraRequests(options, function(error, response, body) {
      if (error) throw new Error(error);
      let averageCost = 0;
      if (!JSON.parse(body).message) {
        averageCost = processProductAverageCost(JSON.parse(body), id);
      }
      res.json(averageCost);
    });
  });

  server.get('/api/products/:id/units-sold', (req, res) => {
    const { id } = req.params;
    const invoices = db.SourceDocuments.SalesInvoices.Invoice;

    const monthlyCumulativeUnits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthlyCumulativeValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let unitsSold = 0;
    let value = 0;

    invoices.forEach(({ Line, Period }) => {
      if (Array.isArray(Line)) {
        Line.forEach(({ ProductCode, Quantity, UnitPrice }) => {
          if (ProductCode === id) {
            if (req.query.monthly) {
              monthlyCumulativeUnits[parseInt(Period, 10) - 1] =
                monthlyCumulativeUnits[parseInt(Period, 10) - 1] +
                parseInt(Quantity, 10);
              monthlyCumulativeValue[parseInt(Period, 10) - 1] =
                monthlyCumulativeValue[parseInt(Period, 10) - 1] +
                parseFloat(Quantity * UnitPrice, 10);
            } else {
              unitsSold += parseInt(Quantity, 10);
              value += parseFloat(Quantity * UnitPrice, 10);
            }
          }
        });
      } else if (Line.ProductCode === id) {
        if (req.query.monthly) {
          monthlyCumulativeUnits[parseInt(invoices.Period, 10) - 1] = parseInt(
            Line.Quantity,
            10,
          );
          monthlyCumulativeValue[parseInt(invoices.Period, 10) - 1] = parseInt(
            Line.Quantity * Line.UnitPrice,
            10,
          );
        } else {
          unitsSold += parseInt(Line.Quantity, 10);
          value += parseFloat(Line.Quantity * Line.UnitPrice, 10);
        }
      }
    });

    if (req.query.monthly) {
      res.json({
        unitsSold: monthlyCumulativeUnits,
        value: monthlyCumulativeValue,
      });
    } else {
      res.json({
        unitsSold,
        value: Number(value.toFixed(2)),
      });
    }
  });

  server.get('/api/products/:id/suppliers', (req, res) => {
    const { id } = req.params;
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
      res.json(processProductSuppliers(id, JSON.parse(body), req.query.year));
    });
  });
};
