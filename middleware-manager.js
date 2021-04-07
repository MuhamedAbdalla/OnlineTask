const constants = require('./config/constants');

module.exports = {
  paginationMiddlware: function paginatingModel(req, res) {
    const page = req.query.page;
    const limit = req.body.n !== undefined ? req.body.n : constants.LIMIT;
    const start_index = (page - 1) * limit;
    const end_index = Math.min(start_index + limit, res.product_list.length);
    let lst_products = [];

    for (let i = start_index; i < end_index; i++) {
      lst_products.push(res.product_list[i]);
    }
    res.product_list = lst_products;
    res.send(res.product_list);
  },
};
