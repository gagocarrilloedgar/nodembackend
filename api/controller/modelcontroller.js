const db = require("../models");
const Models = db.Models;
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
        brandId: req.body.brandId
    };

    // Save User in the database
    Models.create(part)
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

// Retrieve all Users from the database.
exports.getRwheel = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Models.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};

// Find a single model with an uuid
exports.findOne = (req, res) => {
    Models.findOne({
        where: { id: req.params.id },
        include: [{ all: true, nested: true }
        ]
    })
        .then(data => res.send(data))
        .catch(err => console.log(err));
};

// Update a User by the uuid in the request
exports.update = (req, res) => {
    Models.update(
        {
            name: req.body.name,
            brandId: req.body.brandId
        },
        { where: { id: req.params.id } }
    )
        .then(data => res.send(data))
        .catch(err => console.log(err));
};

// Delete a User with the specified uuid in the request
exports.delete = (req, res) => {
    Models.findOne({ where: { id: req.params.id },force: true })
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

