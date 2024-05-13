const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');
const userModel = require("../../models/user.model");

const getUsers = async (req, res) => {
    let users = await userModel.find();

    res.status(200).json(users)
}

const storeUser = async (req, res) => {
    try {
        let userExist = await userModel.findOne({
            name: req.body.name
        });

        if (userExist) {
            return res.status(409).json({
                message: "user already exists"
            })
        }

        let hashPassword = bcrypt.hashSync(req.body.password, 10);

        await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            contact: req.body.contact,
            role: req.body.role,
            image: req.file.path.replace("public", ""),
            status: req.body.status
        })

        return res.status(201).json({
            message: "user created successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        
        let user = await userModel.findById(req.params.id);
    
        if(user) {
            if (req.file) {
                if (user.image) {
                    let url = path.join(__dirname, "../../public", user.image)
                    if (fs.existsSync(url)) {
                        fs.unlinkSync(url)
                    }
                }
        
                await userModel.updateOne({_id: req.params.id}, {
                    name: req.body.name,
                    email: req.body.email,
                    contact: req.body.contact,
                    role: req.body.role,
                    image: req.file.path.replace("public", ""),
                    status: req.body.status
                })
        
            } else {
                await userModel.updateOne({_id: req.params.id}, {
                    name: req.body.name,
                    email: req.body.email,
                    contact: req.body.contact,
                    role: req.body.role,
                    status: req.body.status
                })
            }

            return res.status(201).json({
                message: "user updated sucessfully",
            })
        }

        return res.status(404).json({
            message: "user not found"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        let user = await userModel.findById(req.params.id);
    
        if(user) {
            await userModel.deleteOne({_id: req.params.id})

            return res.status(201).json({
                message: "user deleted sucessfully",
            })
        }

        return res.status(404).json({
            message: "user not found"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getUsers,
    storeUser,
    updateUser,
    deleteUser
}