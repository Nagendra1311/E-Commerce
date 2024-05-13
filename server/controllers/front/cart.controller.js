const cartModel = require("../../models/cart.model")
const cartItemModel = require("../../models/cartItem.model")
const orderModel = require("../../models/order.model")
const orderItemModel = require("../../models/orderItem.model")

const stripe = require('stripe')("sk_test_51PEoATSJ1WooMg2QQggXr5Jz0PtODsBz7b03yewGMcdyrvbOGJYzA7HbD9lp59drJ0sCJJ7fwBwmnLcUGm99xoH000li2Mtqzd");
const { v4: uuidv4 } = require("uuid")

const getCart = async (req, res) => {

    let currentCart = await cartModel.findOne({
        customer: req.user._id,
        placeOrder: false

    })

    if (!currentCart) {
        return res.json({
            currentCart: {}
        })
    }
    let response = await collectTotal(currentCart.id)

    res.json({
        currentCart: response
    })
}

const addCart = async (req, res) => {
    let productId = req.params.id;
    let currentCart = await cartModel.findOne({
        customer: req.user._id,
        placeOrder: false

    })

    if (currentCart) {
        let item = await cartItemModel.findOne({
            product: productId,
            cart: currentCart._id
        })

        if (item) {
            await cartItemModel.updateOne({ _id: item._id }, {
                quantity: item.quantity + 1
            })
        } else {
            await cartItemModel.create({
                cart: currentCart._id,
                product: productId,
                quantity: 1
            })
        }

    } else {
        currentCart = await cartModel.create({
            customer: req.user._id,
        })

        await cartItemModel.create({
            cart: currentCart._id,
            product: productId,
            quantity: 1
        })
    }

    let response = await collectTotal(currentCart?._id);

    return res.json({
        currentCart: response,
    })

}

const updateCart = async (req, res) => {
    await cartItemModel.updateOne({ _id: req.body.itemId }, {
        quantity: req.body.quantity
    })

    let response = await collectTotal(req.body.cartId);

    return res.json({
        currentCart: response,
    })

}


const destroyCart = async (req, res) => {

}


const collectTotal = async (id) => {
    let cart = await cartModel.findOne({
        _id: id
    }).populate('customer')

    let cartItems = await cartItemModel.find({
        cart: cart._id
    }).populate("product")


    let subTotal = 0;
    let tax = 0;
    let grandTotal = 0;

    for (const item of cartItems) {
        subTotal = subTotal + item.product.price * item.quantity
    }

    grandTotal = subTotal + tax;

    await cartModel.updateOne({ _id: id }, {
        subTotal: subTotal,
        tax: tax,
        grandTotal: grandTotal
    })

    cart = await cartModel.findOne({
        _id: id
    }).populate('customer')


    let response = { ...cart._doc, items: cartItems };

    return response;
}


const placeOrder = async (req, res) => {

    try {

        let cart = await cartModel.findOne({
            _id: req.params.cartId
        });

        let cartItems = await cartItemModel.find({
            cart: cart._id
        });

        let order = await orderModel.create({
            customer: cart.customer,
            subTotal: cart.subTotal,
            tax: cart.tax,
            grandTotal: cart.grandTotal,
            cart: cartItems._id,
            billingAddress: req.body.billingAddress
        })

        for (const item of cartItems) {
            await orderItemModel.create({
                order: order._id,
                product: item.product,
                quantity: item.quantity
            })
        }

        await cartModel.updateOne({ _id: cart._id }, {
            placeOrder: true
        })


        return res.json({
            message: "order place successfully"
        })

    } catch (error) {
        return res.json({
            error: 500,
            message: error.message
        })
    }

}

const stripePay = async (req, res) => {
    try {
        const { token, amount } = req.body;
        // console.log(token, amount);

        const idempotencykey = uuidv4();

        let customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        let result = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'INR',
            customer: customer.id,
            receipt_email: token.email,

        }, {
            idempotencyKey: idempotencykey
        })

        console.log(result);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getCart,
    addCart,
    updateCart,
    destroyCart,
    placeOrder,
    stripePay
}