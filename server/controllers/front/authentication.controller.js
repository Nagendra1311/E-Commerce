const bcrypt = require('bcrypt');
const userModel = require('../../models/user.model');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        let user = await userModel.findOne({
            email: req.body.email
        })
        console.log(user);

        if (!user) {
            return res.status(404).json({
                message: "email id and password does not exist"
            })
        }

        if (user) {
            let authenticatePassword = bcrypt.compareSync(req.body.password, user.password);

            if (authenticatePassword) {
                const token = jwt.sign({ data: user }, 'secret', { expiresIn: 60 * 60 });

                return res.status(201).json({
                    message: "User logined successfully",
                    token: token,
                    user
                })
            }

            return res.status(404).json({
                message: "email id and password does not exist"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const register = async (req, res) => {
    try {

        let user = await userModel.findOne({
            email: req.body.email
        })

        if (user) {
            return res.status(409).json({
                message: 'User already exists'
            })
        }

        let hashPassword = bcrypt.hashSync(req.body.password, 10);

        await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            status: true
        })

        return res.status(201).json({
            message: "User registered successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

module.exports = {
    login,
    register,
}