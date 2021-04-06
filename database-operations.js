const configrations = require('./config/db-connection');
const {Client} = require('pg');

// Fetching data from callback of database
function fetch_products(data) {
    let lst_products = [];

    for (let i = 0; i < data.length; i++) {
        lst_products.push({
            PRODUCT_ID_ENTRY: data[i].id,
            PRODUCT_NAME_ENTRY: data[i].name,
            PRODUCT_PRICE_ENTRY: data[i].price,
            PRODUCT_IMAGE_URL_ENTRY: data[i].image_url,
        });
    }
    return lst_products;
}

module.exports = {
    Toggle: async function Toggle(product_id, provider_id) {
        let isSuccess = false;
        const db = new Client(configrations);
        try {
            await db.connect();
            const {rows} = await db.query("SELECT * FROM PRODUCT_PROVIDERS " + 
                                      "WHERE PRODUCTS_ID = $1 AND PROVIDERS_ID = $2",
                                                             [product_id, provider_id]);
            if (rows.length > 0) {
                const availability = !rows[0].available;
                await db.query("UPDATE PRODUCT_PROVIDERS " + 
                                    "SET AVAILABLE = $1 " + 
                                        "WHERE PRODUCTS_ID = $2 AND PROVIDERS_ID = $3",
                                            [availability, product_id, provider_id]);
            }
            isSuccess = true;
        }
        catch (e) {
            console.log("Toggle function throw exception: " + e);
        }
        finally {
            await db.end();
        }
        return isSuccess;
    },
    Get_Product: async function get_product(category_id) {
        let products = [];
        const db = new Client(configrations);
        try {
            await db.connect();
            const data = (await db.query("SELECT P.ID, P.NAME, P.IMAGE_URL, PP.PRICE " +
                                                "FROM PRODUCTS AS P " +
                                                "INNER JOIN PRODUCT_PROVIDERS AS PP " +
                                                "ON P.ID = PP.PRODUCTS_ID " +
                                                "WHERE P.CATEGORY_ID = $1 AND PP.AVAILABLE = true " +
                                                "AND PP.PRICE = ( " +
                                                    "SELECT MIN(S.PRICE) " +
                                                    "FROM PRODUCT_PROVIDERS AS S " +
                                                    "WHERE S.PRODUCTS_ID = P.ID " +
                                                    ") ORDER BY P.ID", 
                                                        [category_id])).rows;
            products = fetch_products(data);
        }
        catch (e) {
            console.log("Getting product throw exception: " + e);
        }
        finally {
            await db.end();
        }
        return products;
    }
}