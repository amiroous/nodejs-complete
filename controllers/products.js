const products = [];

exports.getAddProduct = (req, res, next) => {
    const pageData = {
        path: "/admin/add-product",
        pageTitle: "Add Product"
    };
    res.render('add-product', pageData);
};

exports.postAddProduct = (req, res, next) => {
    products.push({
        title: req.body.title
    });
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    const pageData = {
        path: "/",
        pageTitle: "Shop",
        products: products,
        hasProducts: products.length
    };
    res.render('shop', pageData)
};
