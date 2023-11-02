// this will be the controller for users
const { User, Thought } = require("../models");

module.exports = {

    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
            .populate("thoughts")
            .populate("friends")
            .select("-__v");
        return res.status(200).json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // get single user
    getSingleUser(req, res) {

    },

    // create user
    createUser(req, res) {

    },

    // update user
    updateUser(req, res) {

    },

    // delete user
    deleteUser(req, res) {

    },

    // create friend
    createFriend(req, res) {

    },

    // delete friend
    deleteFriend(req, res) {

    },
};