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
};
