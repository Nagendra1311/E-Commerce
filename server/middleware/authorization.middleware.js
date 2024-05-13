const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
    let token = req.headers.authorization;

    try {
        if (token) {
            let verifyToken = jwt.verify(token, 'secret');

            if (verifyToken) {
                req.user = verifyToken.data;
                return next();
            } else {
                throw new Error('Invalid token');
            }
        }

    } catch (error) {
        return res.status(500).json({
            message: "Invalid token"
        })
    }

    return res.status(500).json({
        message: "token not found",
    })
}

module.exports = {
    authorization
}