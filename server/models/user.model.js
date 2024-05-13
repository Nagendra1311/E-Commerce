const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    contact: {
        type: String,
    }, 
    role: {
        type: String,
        default: "customer"
    },
    status: {
        type: Boolean,
        default: true
    }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;