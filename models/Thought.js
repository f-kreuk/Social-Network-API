//Thoughts model

const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        //utilized the following resource to set default timestamp to now: https://stackoverflow.com/questions/35501273/what-is-the-difference-between-date-now-and-date-now-in-mongoose
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          getters: true,
        },
      }
);

const Thought = model('Thought', thoughtSchema)