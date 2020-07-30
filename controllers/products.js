const Product = require("../models/product");

module.exports.getAddProduct = (req, res, next) => {
    const pageData = {
        path: "/admin/add-product",
        pageTitle: "Add Product"
    };

    res.render('add-product', pageData);
};

module.exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();

    res.redirect('/');
};

module.exports.getProducts = (req, res, next) => {

    Product.getAll((products) => {
        const pageData = {
            path: "/",
            pageTitle: "Shop",
            products: products,
            hasProducts: products.length
        };

        res.render('shop', pageData);
    });
};
