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

module.exports = (server, basePrimaveraUrl) => {
  // server.get('/api/inventory/products', (req, res) => {
  //   const options = {
  //     method: 'GET',
  //     url: `${basePrimaveraUrl}/materialsCore/materialsItems`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   if (!global.primaveraRequests)
  //     return res.json({ msg: 'Primavera token missing' });

  //   return global.primaveraRequests(options, function(error, response, body) {
  //     if (error) throw new Error(error);
  //     let products = [];
  //     if (!JSON.parse(body).message) {
  //       products = processProducts(JSON.parse(body));
  //     }
  //     res.json(products);
  //   });
  // });

  server.get('/api/inventory/stock', (req, res) => {
    const options = {
      method: 'GET',
      url: `${basePrimaveraUrl}/materialsCore/materialsItems`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (!global.primaveraRequests)
      return res.json({ msg: 'Primavera token missing' });

    return global.primaveraRequests(options, function(error, response, body) {
      if (error) throw new Error(error);
      let stock = 0;
      if (!JSON.parse(body).message) {
        stock = processStock(JSON.parse(body));
      }
      res.json(stock);
    });
  });

  server.get('/api/inventory/warehouses', (req, res) => {
    const options = {
      method: 'GET',
      url: `${basePrimaveraUrl}/materialscore/materialsitems`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (!global.primaveraRequests)
      return res.json({ msg: 'Primavera token missing' });

    return global.primaveraRequests(options, function(error, response, body) {
      if (error) throw new Error(error);
      res.json(processWarehouses(JSON.parse(body)));
    });
  });
};
