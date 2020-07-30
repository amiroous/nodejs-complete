const fs = require("fs");
const path = require("../util/path");

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

    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(file, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static getAll(cb) {
        getProductsFromFile(cb);
    }
};
