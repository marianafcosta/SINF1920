module.exports = (server, db) => {
  server.get('/api/products/:id/units-sold', (req, res) => {
    const { id } = req.params;
    const invoices = db.SourceDocuments.SalesInvoices.Invoice;

    let unitsSold = 0;
    let value = 0;

    invoices.forEach(({ Line }) => {
      if (Array.isArray(Line)) {
        Line.forEach(({ ProductCode, Quantity, UnitPrice }) => {
          if (ProductCode === id) {
            unitsSold += parseInt(Quantity, 10);
            value += parseFloat(Quantity * UnitPrice, 10);
          }
        });
      } else if (Line.ProductCode === id) {
        unitsSold += parseInt(Line.Quantity, 10);
        value += parseFloat(Line.Quantity * Line.UnitPrice, 10);
      }
    });

    res.json({
      unitsSold,
      value: Number(value.toFixed(2)),
    });
  });
};
