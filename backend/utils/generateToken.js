const jwt = require('jsonwebtoken');

function generateToken({ id, email, username }) {
    const user = {
        id,
        email,
        username
    };

    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '5hr'
    }
    );
};

module.exports = generateToken;