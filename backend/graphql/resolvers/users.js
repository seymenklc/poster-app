const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const generateToken = require('../../utils/generateToken');

module.exports = {
    Query: {
        getUsers: async (parent, args, context, info) => {
            // get all users
            try {
                return await User.find({});
            } catch (error) {
                throw new Error(error.message);
            }
        }
    },
    Mutation: {
        loginUser: async (parent, args, context, info) => {
            const { username, password } = args;

            const user = await User.findOne({ username });
            // check if user exists
            if (!user) {
                throw new UserInputError('User not found');
            }
            // check if passwords match
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (!isCorrectPassword) {
                throw new UserInputError('Wrong credentials');
            }
            // generate auth token
            const token = generateToken(user);

            return { ...user._doc, id: user._id, token };
        },
        createUser: async (parent, args, context, info) => {
            let { email, username, password } = args.createUserInput;

            const userByEmail = await User.findOne({ email });
            const userByUsername = await User.findOne({ username });
            // check if user already exists
            if (userByEmail) {
                throw new UserInputError('Email is already in use');
            } else if (userByUsername) {
                throw new UserInputError('Username is already in use');
            } else if (password.length < 3) {
                throw new UserInputError('Password must be at least 3 chars.');
            }
            // hash password
            const salt = await bcrypt.genSalt(12);
            password = await bcrypt.hash(password, salt);
            // save user to db
            const user = new User({ email, username, password });
            // create auth token
            const token = generateToken(user);
            const res = await user.save();

            return { ...res._doc, id: res._id, token };
        }
    }
};