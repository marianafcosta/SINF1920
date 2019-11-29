module.exports = (server, db) => {
  server.get('/api/product/:id', (req, res) => {
    const idProd = req.params.id;
    // const db = JSON.parse(data);
    const array = db.MasterFiles.Product;
    console.log(array);
    res.json(db.MasterFiles.Product);
  });
};
