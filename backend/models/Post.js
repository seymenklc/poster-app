const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    content: String,
    username: String,
    createdAt: String,
    updatedAt: String,
    comments: [{
        content: String,
        username: String,
        createdAt: String
    }],
    likes: [{
        username: String
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema); 