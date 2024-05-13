const orderModel = require("../../models/order.model");
const orderItemModel = require("../../models/orderItem.model");

const getOrders = async (req, res) => {
    let orders = await orderModel.find().populate("customer");

    let orderObject = [];

    for (const order of orders) {
        let items = await orderItemModel.find({ order: order._id }).populate("product");
        orderObject.push({ ...order._doc, items: [...items] })
    }

    res.json({
        message: " order working",
        order: orderObject
    })
}

module.exports = {
    getOrders
}