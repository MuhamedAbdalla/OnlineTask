const express = require("express");
const body_parser = require("body-parser");
const cors = require('cors');
const constants = require('./config/constants');
const db_queries = require('./database-operations');

const port = 3000;
const app = express();

app.use(body_parser.json());
app.use(cors());

// Product for page
app.get(constants.GET_PRODUCT_PAGE_ENDPOINT, async (req, res, next) => {
    const category_id = req.body.category_id;

    res.product_list = await db_queries.Get_Product(category_id);
    next();
}, paginating_model);

// Middleware
function paginating_model(req, res) {
    const page = req.query.page;
    const limit = (req.body.n !== undefined ? req.body.n : constants.LIMIT);
    const startIndex = (page - 1) * limit;
    let lst_products = [];

    for (let i = startIndex; i < Math.min(startIndex + limit, res.product_list.length); i++) {
        lst_products.push(res.product_list[i]);
    }
    res.product_list = lst_products;
    res.send(res.product_list);
}

// Toggle endPoint
app.put(constants.TOGGLE_ENDPOINT, async (req, res) => {
    let product_id = req.body.product_id;
    let provider_id = req.body.provider_id;
    
    const isSuccess = await db_queries.Toggle(product_id, provider_id);

    if (isSuccess) {
        res
        .status(200)
        .send("Success!!");
    }
    res
    .status(500)
    .send("Something went wrong!!");
});

app.listen(port, async () => {
    console.log("Server is listening on port " + port);
});