require('dotenv').config();
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

function isAuthenticated(context) {
    const header = context.req.headers.authorization;

    if (header) {
        const token = header.split('Bearer ')[1];

        if (token) {
            try {
                return jwt.verify(token, process.env.JWT_SECRET);
            } catch (error) {
                throw new AuthenticationError('Invalid or Expired Token');
            }
        }
        throw new Error('Please check if header is valid');
    }
    throw new Error('A header must be provided');
}

module.exports = isAuthenticated;