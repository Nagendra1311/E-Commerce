const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    subTotal: {
        type: Number,
        default: 0.00
    },
    tax: {
        type: Number,
        default: 0.00
    },
    grandTotal: {
        type: Number,
        default: 0.00
    },
    placeOrder: {
        type: Boolean,
        default: false
    },
})

const cartModel = mongoose.model('cart', cartSchema)

module.exports = cartModel;