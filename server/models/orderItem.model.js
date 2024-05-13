const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
    order: {
        type: mongoose.Types.ObjectId,
        ref: "Order"
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        default: 0
    }
})

const orderItemModel = mongoose.model('OrderItem', orderItemSchema)

module.exports = orderItemModel;