const db = require("../models");
const Users = db.Users;

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
    const user = {
        name: req.body.name,
        password: req.body.password,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        email: req.body.email,
        id_doc: req.body.id_doc,
        phone: req.body.phone
    };

    // Save User in the database
    Users.create(user)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });

};

exports.login = (req, res) => {

    Users.findOne({
        where: {
            email: req.body.email,
            password: req.body.password,
        },
        include:
            [{ all: true, nested: true }
            ]
    }).then(user => {
        if (user) {
            res.status(200).send(user);
            //print(user.body);
        } else {
            res.status(404).send({
                message: " Error while trying to login a user"
            });
        }
    });

}

// Get only users without the relations
exports.findAll = (req, res) => Users.findAll().then(allUsers => res.send(allUsers)).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
    })
});


exports.getUsers = (req, res) => Users.findAll({ include: [{ all: true, nested: true }] }).then(allUsers => res.send(allUsers)).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
    })
});


// Find a single User with all the realtions using a uuid
exports.findOne = (req, res) => {
    const uuid = req.body.uuid;

    Users.findByPk(uuid, {
        include:
            [{ all: true, nested: true }
            ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + uuid
            });
        });
}

// Update a User by the uuid in the request
exports.update = (req, res) => {
    Users.update(
        {
            name: req.body.name,
            password: req.body.password,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            email: req.body.email,
            id_doc: req.body.id_doc,
            phone: req.body.phone
        },
        { where: { uuid: req.params.uuid } }
    )
        .then(data => res.send(data))
        .catch(err => console.log(err));
};

// Delete a User with the specified uuid in the request
exports.delete = (req, res) => {
    Users.findOne({ where: { uuid: req.params.uuid }, force: true })
        .then(
            data => {
                data.destroy();
                res.redirect('/api/users');
            }
        )
        .catch(err => {
            console.log(err)
        })
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    Users.destroy(
        {
            where: {},
            force: true
        }
    )
        .then(res.send({ message: "All users have been deleted" }))
        .catch(err => {
            console.log(err)
        });
};

