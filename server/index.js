const express = require('express');
const compression = require('compression');
const app = express();
const port = 3000;

const QARouter = require('./routes.js');

app.use(compression());
app.use('/qa', QARouter);

// app.use('/products/:productid', express.static('dist'));
// app.get('/', (req, res) => {
//   // res.redirect('/products/8');
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
