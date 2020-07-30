const Product = require("../models/Product");

module.exports.getProducts = (req, res, next) => {

    Product.getAll((products) => {
        const pageData = {
            path: "/admin/products",
            pageTitle: "Admin Products",
            products: products,
            hasProducts: products.length
        };

        res.render('admin/products', pageData);
    });
};


module.exports.getAddProduct = (req, res, next) => {
    const pageData = {
        path: "/admin/add-product",
        pageTitle: "Add Product"
    };

    res.render('admin/add-product', pageData);
};

module.exports.postAddProduct = (req, res, next) => {

    const { title, description, imageUrl, price } = req.body;

    const product = new Product({ title, description, imageUrl, price });

    product.save();

    res.redirect('/');
};


module.exports.getEditProduct = (req, res, next) => {
    const pageData = {
        path: "/admin/edit-product",
        pageTitle: "Edit Product"
    };

    res.render('admin/edit-product', pageData);
};

module.exports.postEditProduct = (req, res, next) => {

    const { title, description, imageUrl, price } = req.body;

    const product = new Product({ title, description, imageUrl, price });

    product.save();

    res.redirect('/');
};
