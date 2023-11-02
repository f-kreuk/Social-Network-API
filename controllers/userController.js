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
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate("thoughts")
            .populate("friends")
            .select("-__v");
            if (!user) {
                return res.status(404).json([ message: 'No user with this id!']);
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
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