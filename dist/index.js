"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
``;
const productSlaves_1 = require("./data/productSlaves");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// middleware
const parserMiddleWare = (0, body_parser_1.default)();
app.use(parserMiddleWare);
// requests
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/slaves', (req, res) => {
    if (req.query.title) {
        const filteredProduct = productSlaves_1.productSlaves.filter(item => item.title.indexOf(String(req.query.title)) > -1);
        res.send(filteredProduct);
    }
    else {
        res.send(productSlaves_1.productSlaves);
    }
});
app.get('/slaves/:slavesTitle', (req, res) => {
    const prodVan = productSlaves_1.productSlaves.filter(item => item.title === req.params.slavesTitle);
    prodVan ? res.send(prodVan) : res.sendStatus(404);
});
app.get('/slaves/:slavesTitle/:id', (req, res) => {
    const prodId = productSlaves_1.productSlaves.filter(item => item.id === +req.params.id);
    if (prodId) {
        res.send(prodId);
    }
    else {
        res.sendStatus(404);
    }
});
app.delete("/slaves/:id", (req, res) => {
    for (let i = 0; i < productSlaves_1.productSlaves.length; i++) {
        if (productSlaves_1.productSlaves[i].id === +req.params.id) {
            productSlaves_1.productSlaves.splice(i, 1);
            res.sendStatus(204);
            return;
        }
        else {
            res.sendStatus(404);
        }
    }
});
app.post("/slaves", (req, res) => {
    const newProduct = { id: +(new Date()), title: JSON.stringify(req.body.title), price: 1500 };
    productSlaves_1.productSlaves.push(newProduct);
    res.status(201);
    res.send(productSlaves_1.productSlaves);
});
app.put("/slaves/:id", (req, res) => {
    let product = productSlaves_1.productSlaves.find(item => item.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.send(product).sendStatus(200);
    }
    else {
        res.send(404);
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
