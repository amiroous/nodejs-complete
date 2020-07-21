const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(errorRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.listen(3000);
