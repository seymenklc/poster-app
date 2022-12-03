const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: [4, 'Minimum username length is 6 chars.']
    },
    email: {
        type: String,
        unique: true,
        lowercase: [true, 'Email must be lowercase.'],
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    password: {
        type: String,
        minlength: [6, 'Minimum password length is 6 chars.']
    }
});

module.exports = mongoose.model('User', userSchema);