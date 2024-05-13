const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    billingAddress: {
        type: Object,
        defaultValue: {}
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
    cart: {
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    }
})

const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel;