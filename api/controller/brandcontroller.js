const db = require("../models");
const Brands = db.Brands;
const Op = db.Sequelize.Op;

//Create and Save a new User
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const part = {
        name: req.body.name,
    };

    // Save User in the database
    Brands.create(part)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });

};

// Find a single User with an uuid

exports.getBrands = (req, res) => Brands.findAll({
    include: [
        { model: db.Models }
    ]
}
).then(allBikes => res.send(allBikes));



// Find a single brand with an uuid
exports.findOne = (req, res) => {
    Brands.findOne({
        where: {
            id: req.params.id,
            include: [{ all: true, nested: true }
            ]
        }
    })
        .then(data => res.send(data))
        .catch(err => console.log(err));
};

// Update a User by the uuid in the request
exports.update = (req, res) => {
    Brands.update(
        {
            name: req.body.name
        },
        { where: { id: req.params.id } }
    )
        .then(data => res.send(data))
        .catch(err => console.log(err));
};

// Delete a User with the specified uuid in the request
exports.delete = (req, res) => {
    Brands.findOne({ where: { id: req.params.id }, force: true })
        .then(
            data => {
                data.destroy();
                res.redirect('/api/brands');
            }
        )
        .catch(err => {
            console.log(err)
        })
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    Brands.destroy(
        {
            where: {}, force: true
        }).then(res.send({ message: "All brands have been deleted" })).catch(err => { console.log(err) })
};
