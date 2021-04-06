class ProductProviders {
    constructor(
        products_id,
        providers_id,
        price,
        available,
    ) {
        this._products_id = products_id;
        this._providers_id = providers_id;
        this._price = price;
        this._available = available;
    }

    get products_id() {
        return this._products_id;
    }

    get providers_id() {
        return this._providers_id;
    }

    get price() {
        return this._price;
    }

    get available() {
        return this._available;
    }
}

module.exports = ProductProviders;