class Products {
    constructor(
        id,
        name,
        image_url,
        category_id,
    ) {
        this._id = id;
        this._name = name;
        this._image_url = image_url;
        this._category_id = category_id;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get image_url() {
        return this._image_url;
    }

    get category_id() {
        return this._category_id;
    }
}

module.exports = Products;