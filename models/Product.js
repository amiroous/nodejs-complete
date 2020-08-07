const fs = require("fs");
const path = require("../util/path");

const Cart = require('./Cart');

const file = path + '/data/products.json';

const getProductsFromFile = (cb) => {

    fs.readFile(file, (err, fileContent) => {
        if(err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {

    constructor({ id, title, imageUrl, description, price }) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile((products) => {

            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                products[existingProductIndex] = this;
            } else {
                this.id = Math.random().toString();
                products.push(this);
            }

            fs.writeFile(file, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static getAll(cb) {
        getProductsFromFile(cb);
    }

    static getProductById(id, cb) {
        getProductsFromFile((products) => {
            cb(products.find(product => product.id === id));
        });
    }

    static deleteProductById(id) {
        getProductsFromFile((products) => {
            const updatedProducts = products.filter(prod => prod.id !== id);
            const product = products.find(prod => prod.id === id);

            fs.writeFile(file, JSON.stringify(updatedProducts), (err) => {

                if(!err) {
                    Cart.removeProduct(id, product.price);
                }

                console.log(err);
            });
        });
    }
};
