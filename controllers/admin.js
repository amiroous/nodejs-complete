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

    const product = new Product({ id: null, title, description, imageUrl, price });

    product.save();

    res.redirect('/');
};


module.exports.getEditProduct = (req, res, next) => {

    const productId = req.params.productId;

    Product.getProductById(productId, (product) => {

        if(!product) {
            return res.redirect('/');
        }

        const pageData = {
            path: "/admin/edit-product",
            pageTitle: "Edit Product",
            product: product
        };

        res.render('admin/edit-product', pageData);
    });
};

module.exports.postEditProduct = (req, res, next) => {

    const { productId, title, description, imageUrl, price } = req.body;

    const product = new Product({ id: productId, title, description, imageUrl, price });

    product.save();

    res.redirect('/admin/products');
};


module.exports.postDeleteProduct = (req, res, next) => {

    const { productId } = req.body;

    Product.deleteProductById(productId)

    res.redirect('/admin/products');
};
