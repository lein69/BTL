const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.post('/update-products', (req, res) => {
  const updatedProducts = req.body;
  fs.writeFileSync('products.json', JSON.stringify(updatedProducts, null, 2));
  res.send('Products updated successfully!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});