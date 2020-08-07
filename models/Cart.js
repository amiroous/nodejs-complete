const fs = require("fs");
const path = require("../util/path");

const file = path + '/data/cart.json';

module.exports = class Cart {

    static addProduct(id, productPrice) {

        fs.readFile(file, (err, fileContent) => {

            /**
             * Create OR Fetch Cart Data
             */

            let cart = {
                products: [],
                totalPrice: 0
            };

            if(!err) {
                cart = JSON.parse(fileContent);
            }

            /**
             * Analyze Cart Data
             */
            let theProduct = null;
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];

            if(existingProduct) {
                theProduct = {
                    ...existingProduct,
                    qty: existingProduct.qty + 1
                }
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = theProduct;
            } else {
                theProduct = {
                    id: id,
                    qty: 1
                }
                cart.products = [...cart.products, theProduct];
            }

            cart.totalPrice += +productPrice;

            fs.writeFile(file, JSON.stringify(cart), (err) => {
                console.log(err);
            });

        });
    }

    static removeProduct(id, productPrice) {

        fs.readFile(file, (err, fileContent) => {

            if(err) {
                // No Cart Found
                return;
            }

            const cart = JSON.parse(fileContent);
            const product = cart.products.find(prod => prod.id === id);

            if(!product) {
                return;
            }

            const updatedCartProducts = cart.products.filter(prod => prod.id !== id);
            cart.products = [...updatedCartProducts];
            cart.totalPrice -= (+productPrice * product.qty);

            fs.writeFile(file, JSON.stringify(cart), (err) => {
                console.log(err);
            });

        });
    }

    static getCart(cb) {

        fs.readFile(file, (err, fileContent) => {

            if(err) {
                // No Cart Found
                return cb(null);
            }

            const cart = JSON.parse(fileContent);
            cb(cart);
        });
    }
};
