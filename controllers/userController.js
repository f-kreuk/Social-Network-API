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
                return res.status(404).json({ message: 'No user with this id!'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body }
                { new: true}
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with this id!'});
            }
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user with this id!'});
            }
            // need to delete the thoughts too
            await Thought.deleteMany({ _id: { $in: user.thoughts }});
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // create friend
    async createFriend(req, res) {
        try {
            const friend = await.User.findOneAndUpdate(
                { _id: req.params.userId },
                //
            )
        }
    },

    // delete friend
    deleteFriend(req, res) {

    },
};