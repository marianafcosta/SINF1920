module.exports = (server, db) => {
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
};
