//User model

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
            required: true,
            unique: true,
            trim: true,
        },
        // utilized the match and validate properties as suggested in https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }, 
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

const User = model('user', userSchema);

module.exports = User;