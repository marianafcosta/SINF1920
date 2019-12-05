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
        amount: `${(
          products[productCode].Quantity * products[productCode].UnitPrice
        ).toFixed(2)} €`,
      }));

    res.json(products);
  });
};
