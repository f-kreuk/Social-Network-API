const { User, Thought } = require("../models");

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            .select("-__v");
            return res.status(200).json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //get single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})
            .select("-__v");
            if (!thought) {
                return res.status(404).json({ message: "No thought with that Id!"});
            }
            return res.status(200).json(thought);    
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }  
    },

    // create thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)
            .select("-__v");
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            )
            .select("-__v");
            return res.status(200).json({thought, user});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {new: true}
            )
            .select("-__v");
            if (!thought) {
                return res.status(404).json({message: "No thought with this Id!"});
            }
            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                {_id: req.params.thoughtId}
            )
            .select("-__v");
            if (!thought) {
                return res.status(404).json({ message: "No thought with this Id!"});
            }
            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //create reaction
    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}}
            );
            if (!reaction) {
                return res.status(404).json({ message: "No thought with this Id!"});
            }
            return res.status(200).json(reaction);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //delete reaction
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {_id: req.params.reactionId}}},
                {new: true}
            );
            if (!reaction) {
                return res.status(404).json({message: "Check your thought and reaction Id!"});
            }
            return res.status(200).json(reaction);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },   
};

