class Categories {
    constructor(
        id,
        name,
        parent_id,
    ) {
        this._id = id;
        this._name = name;
        this._parent_id = parent_id;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get parent_id() {
        return this._parent_id;
    }
}

module.exports = Categories;