module.exports = (server, db) => {
  server.get('/api/sales/revenue', (req, res) => {
    const salesInvoices = db.SourceDocuments.SalesInvoices.Invoice;
    const monthlyCumulative = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let invoiceDate;
    salesInvoices.forEach(invoice => {
      invoiceDate = new Date(invoice.InvoiceDate);
      // eslint-disable-next-line radix
      if (invoiceDate.getFullYear() === parseInt(req.query.year)) {
        // eslint-disable-next-line radix
        monthlyCumulative[parseInt(invoice.Period) - 1] =
          parseFloat(invoice.DocumentTotals.GrossTotal) +
          // eslint-disable-next-line radix
          monthlyCumulative[parseInt(invoice.Period) - 1];
      }
    });
    res.json({ monthlyCumulative });
  });

  server.get('/api/sales/top-products', (req, res) => {
    const startDate =
      'start-date' in req.query ? new Date(req.query['start-date']) : null;
    const endDate =
      'end-date' in req.query ? new Date(req.query['end-date']) : null;

    let products = {};

    db.SourceDocuments.SalesInvoices.Invoice.forEach(invoice => {
      const type = invoice.InvoiceType;

      if (
        !(
          invoice.Line.length &&
          (type === 'FT' || type === 'FS' || type === 'FR' || type === 'VD')
        )
      )
        return;

      const invoiceDate = new Date(invoice.InvoiceDate);
      if (
        (startDate === null || startDate <= invoiceDate) &&
        (endDate === null || invoiceDate <= endDate)
      ) {
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
      }
    });

    products = Object.keys(products)
      .sort((a, b) => products[b].Quantity - products[a].Quantity)
      .map(elem => ({
        id: elem,
        name: products[elem].ProductDescription,
        quantity: products[elem].Quantity,
        amount: `${(products[elem].Quantity * products[elem].UnitPrice).toFixed(
          2,
        )} €`,
      }));

    res.json(products);
  });
};
