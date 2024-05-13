const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    }
})

const categoryModel = mongoose.model('Category', categorySchema)

module.exports = categoryModel;