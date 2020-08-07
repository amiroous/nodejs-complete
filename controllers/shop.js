const Product = require("../models/Product");
const Cart = require("../models/Cart");

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

module.exports.getProduct = (req, res, next) => {

    const productId = req.params.productId;

    Product.getProductById(productId, (product) => {
        const pageData = {
            path: `/products`,
            pageTitle: product.title,
            product: product,
        };

        res.render('shop/product-details', pageData);
    });
};


module.exports.getCart = (req, res, next) => {

    Cart.getCart((cart) => {

        if(!cart || !cart.products) {
            const pageData = {
                path: "/cart",
                pageTitle: "Shopping Cart",
                products: [],
                totalPrice: 0
            };

            return res.render('shop/cart', pageData);
        }

        const cartProductIds = cart.products.reduce((acc, cur) => [...acc, cur.id], []);

        Product.getAll((products) => {
            const cartProducts = products.reduce((cartProducts, cartProduct) => {

                if(cartProductIds.includes(cartProduct.id)) {

                    const cartProductQty = cart.products.find(item => item.id === cartProduct.id).qty;

                    const cartProductData = {
                        ...cartProduct,
                        qty: cartProductQty
                    };

                    return [...cartProducts, cartProductData];
                }
                return cartProducts;
            }, []);

            const pageData = {
                path: "/cart",
                pageTitle: "Shopping Cart",
                products: cartProducts,
                totalPrice: cart.totalPrice
            };

            res.render('shop/cart', pageData);
        });
    });
};

module.exports.postCart = (req, res, next) => {
    const { productId } = req.body;

    Product.getProductById(productId, (product) => {
        Cart.addProduct(productId, product.price);

        res.redirect('/cart');
    });
};

module.exports.postCartDeleteItem = (req, res, next) => {
    const { productId } = req.body;

    Product.getProductById(productId, (product) => {
        Cart.removeProduct(productId, product.price);
        res.redirect('/cart');
    });
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
