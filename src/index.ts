import express from "express";
import bodyParser from "body-parser";``
import {productSlaves} from "./data/productSlaves";

const app = express()
const port = process.env.PORT || 5000

// middleware
const parserMiddleWare = bodyParser();
app.use(parserMiddleWare)



// requests
app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get('/slaves', (req, res) => {
    if(req.query.title ) {

        const filteredProduct = productSlaves.filter(item => item.title.indexOf(String(req.query.title)) > -1);
        res.send(filteredProduct);
    } else {
        res.send(productSlaves)
    }
})

app.get('/slaves/:slavesTitle', (req, res) => {
    const prodVan = productSlaves.filter(item => item.title === req.params.slavesTitle)
    prodVan ? res.send(prodVan) : res.sendStatus(404);
})


app.get('/slaves/:slavesTitle/:id', (req, res) => {
    const prodId = productSlaves.filter(item => item.id ===  +req.params.id )
    if (prodId) {
        res.send(prodId)
    } else {
        res.sendStatus(404)
    }
})


app.delete("/slaves/:id", (req,res) => {
    for (let i:number = 0; i < productSlaves.length; i++) {
        if (productSlaves[i].id === +req.params.id) {
            productSlaves.splice(i, 1)
            res.sendStatus(204);
            return
        } else {
            res.sendStatus(404)
        }
    }
})

app.post("/slaves", (req, res)=>{
    const newProduct = {id: +(new Date()), title: JSON.stringify(req.body.title), price: 1500}
    productSlaves.push(newProduct);
    res.status(201)
    res.send(productSlaves)
})

app.put("/slaves/:id", (req, res) =>{
    let product = productSlaves.find(item => item.id === +req.params.id);

    if(product) {
        product.title =  req.body.title;
        res.send(product).sendStatus(200)
    } else {
        res.send(404)
    }


})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})