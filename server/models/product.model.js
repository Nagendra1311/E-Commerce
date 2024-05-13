const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0.00
    },    
    quantity: {
        type: Number,
        default: 0
    }, 
    image: {
        type: String,
        required: false
    },

    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }, 
    status: {
        type: Boolean,
        default: true
    }
})

const productModel = mongoose.model('Product', productSchema)

module.exports = productModel;