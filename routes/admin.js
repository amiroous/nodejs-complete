const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send(`
        <h1>Add Product Page</h1>
        <form action="/admin/product" method="post">
            <input name="productName" type="text" />
            <button type="submit">Add Product</button>
        </form>
    `);
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
