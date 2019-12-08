const calculateSalesByLocation = sales => {
  /*
    [
      porto: {
        quantity:
        netTotal:
      },
      lisboa: {
        quantity:
        netTotal:
      },
    ]
  */

  const salesByLocation = {};
  const validTypes = ['FT', 'FS', 'FR', 'VD'];

  if (Array.isArray(sales)) {
    sales.forEach(sale => {
      if (!(sale.Line.length && validTypes.includes(sale.InvoiceType))) return;
      if (salesByLocation[sale.ShipTo.Address.City]) {
        salesByLocation[sale.ShipTo.Address.City].quantity += 1;
        salesByLocation[sale.ShipTo.Address.City].netTotal += parseFloat(
          sale.DocumentTotals.NetTotal,
        );
      } else {
        salesByLocation[sale.ShipTo.Address.City] = {
          quantity: 1,
          netTotal: parseFloat(sale.DocumentTotals.NetTotal),
        };
      }
    });
  } else {
    salesByLocation[sales.ShipTo.Address.City] = {
      quantity: 1,
      netTotal: parseFloat(sales.DocumentTotals.NetTotal),
    };
  }
  return salesByLocation;
};

module.exports = (server, db) => {
  server.get('/api/sales/revenue', (req, res) => {
    const salesInvoices = db.SourceDocuments.SalesInvoices.Invoice;
    const monthlyCumulative = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let invoiceDate;
    salesInvoices.forEach(invoice => {
      invoiceDate = new Date(invoice.InvoiceDate);
      if (invoiceDate.getFullYear() === parseInt(req.query.year, 10)) {
        monthlyCumulative[parseInt(invoice.Period, 10) - 1] =
          parseFloat(invoice.DocumentTotals.GrossTotal) +
          monthlyCumulative[parseInt(invoice.Period, 10) - 1];
      }
    });
    res.json({ monthlyCumulative });
  });

  server.get('/api/sales/top-products', (req, res) => {
    let products = {};
    const validTypes = ['FT', 'FS', 'FR', 'VD'];

    db.SourceDocuments.SalesInvoices.Invoice.forEach(invoice => {
      const type = invoice.InvoiceType;

      if (!(invoice.Line.length && validTypes.includes(type))) return;

      invoice.Line.forEach(line => {
        const { ProductCode, UnitPrice, ProductDescription, Quantity } = line;
        if (Object.prototype.hasOwnProperty.call(products, ProductCode)) {
          products[ProductCode].Quantity += parseInt(Quantity, 10);
        } else {
          products[ProductCode] = {
            ProductDescription,
            UnitPrice: parseFloat(UnitPrice, 10),
            Quantity: parseInt(Quantity, 10),
          };
        }
      });
    });

    products = Object.keys(products)
      .sort((a, b) => products[b].Quantity - products[a].Quantity)
      .map(productCode => ({
        id: productCode,
        name: products[productCode].ProductDescription,
        quantity: products[productCode].Quantity,
        value: Number(
          (
            products[productCode].Quantity * products[productCode].UnitPrice
          ).toFixed(2),
        ),
      }));

    res.json(products);
  });

  server.get('/api/sales/topClients', (req, res) => {
    const salesInvoices = db.SourceDocuments.SalesInvoices.Invoice;

    const clients = [];

    let invoiceDate;
    if (Array.isArray(salesInvoices)) {
      salesInvoices.forEach(invoice => {
        invoiceDate = new Date(invoice.InvoiceDate);
        if (invoiceDate.getFullYear() === parseInt(req.query.year, 10)) {
          const customerID = invoice.CustomerID;
          let purchased = 0;

          if (Array.isArray(invoice.Line)) {
            invoice.Line.forEach(line => {
              const { UnitPrice, Quantity } = line;
              purchased += UnitPrice * Quantity;
            });
          } else {
            purchased = invoice.Line.UnitPrice * invoice.Line.Quantity;
          }
          let exists = false;
          for (let i = 0; i < clients.length; i += 1) {
            if (clients[i].id === customerID) {
              exists = true;
              clients[i].nPurchases += 1;
              clients[i].totalPurchased += purchased;
              break;
            }
          }
          if (!exists) {
            clients.push({
              id: customerID,
              totalPurchased: purchased,
              nPurchases: 1,
            });
          }
        }
      });
    } else {
      const invoice = salesInvoices;
      invoiceDate = new Date(invoice.InvoiceDate);
      if (invoiceDate.getFullYear() === parseInt(req.query.year, 10)) {
        const customerID = invoice.CustomerID;
        let purchased = 0;

        if (Array.isArray(invoice.Line)) {
          invoice.Line.forEach(line => {
            const { UnitPrice, Quantity } = line;
            purchased += UnitPrice * Quantity;
          });
        } else {
          purchased = invoice.Line.UnitPrice * invoice.Line.Quantity;
        }
        let exists = false;
        for (let i = 0; i < clients.length; i += 1) {
          if (clients[i].id === customerID) {
            exists = true;
            clients[i].nPurchases += 1;
            clients[i].totalPurchased += purchased;
            break;
          }
        }
        if (!exists) {
          clients.push({
            id: customerID,
            totalPurchased: purchased,
            nPurchases: 1,
          });
        }
      }
    }

    for (let i = 0; i < clients.length; i += 1) {
      clients[i].totalPurchased = parseFloat(clients[i].totalPurchased).toFixed(
        2,
      );
    }

    const sorted = clients.sort((a, b) => a.totalPurchased > b.totalPurchased);
    res.json(sorted.slice(0, 5));
  });

  server.get('/api/sales/location', (req, res) => {
    const sales = db.SourceDocuments.SalesInvoices.Invoice;
    const salesByLocation = calculateSalesByLocation(sales);
    res.json(salesByLocation);
  });
};
