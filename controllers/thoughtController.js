const { User, Thought } = require("../models");

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            return res.status(200).json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //get single thought
    async getSingleThought(req, res) {

    },

    // create thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            );
            return res.status(200).json({thought,user});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // update thought
    async updateThought(req, res) {

    },

    //delete thought
    async deleteThought(req, res) {

    },

    //create reaction
    async createReaction(req, res) {

    },

    //delete reaction
    async deleteReaction(req, res) {

    },   
};

