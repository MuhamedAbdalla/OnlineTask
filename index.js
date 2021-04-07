const express = require("express");
const body_parser = require("body-parser");
const cors = require('cors');
const constants = require('./config/constants');
const db_queries = require('./db-queries');
const middlware_manager = require('./middleware-manager');

const port = process.env.PORT || 3000;
const app = express();

app.use(body_parser.json());
app.use(cors());

// Product for page
app.get(constants.GET_PRODUCT_PAGE_ENDPOINT, async (req, res, next) => {
    const category_id = req.body.category_id;

    res.product_list = await db_queries.getProduct(category_id);
    next();
}, middlware_manager.paginationMiddlware);

// Toggle endPoint
app.post(constants.TOGGLE_ENDPOINT, async (req, res) => {
    let product_id = req.body.product_id;
    let provider_id = req.body.provider_id;
    
    const is_success = await db_queries.toggle(product_id, provider_id);

    if (is_success) {
        res
        .status(constants.OK)
        .send("Success!!");
    }
    else {
        res
        .status(constants.INTERNAL_SERVER_ERROR)
        .send("Something went wrong!!");
    }
});

app.listen(port, async () => {
    console.log("Server is listening on port " + port);
});