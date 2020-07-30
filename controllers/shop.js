const Product = require("../models/Product");

module.exports.getIndex = (req, res, next) => {

    Product.getAll((products) => {
        const pageData = {
            path: "/",
            pageTitle: "Shop",
            products: products,
            hasProducts: products.length
        };

        res.render('shop/index', pageData);
    });
};


module.exports.getProducts = (req, res, next) => {

    Product.getAll((products) => {
        const pageData = {
            path: "/products",
            pageTitle: "Products",
            products: products,
            hasProducts: products.length
        };

        res.render('shop/products', pageData);
    });
};


module.exports.getCart = (req, res, next) => {
    const pageData = {
        path: "/cart",
        pageTitle: "Shopping Cart",
    };

    res.render('shop/cart', pageData);
};

module.exports.postCart = (req, res, next) => {
    console.log('POST::Add To Cart');
    res.redirect('/');
};

module.exports.getOrders = (req, res, next) => {
    const pageData = {
        path: "/orders",
        pageTitle: "Orders",
    };

    res.render('shop/orders', pageData);
};


module.exports.getCheckout = (req, res, next) => {
    const pageData = {
        path: "/checkout",
        pageTitle: "Checkout",
    };

    res.render('shop/checkout', pageData);
};
