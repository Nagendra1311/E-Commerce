const path = require("path");
const fs = require("fs");
const productModel = require("../../models/product.model");

const getProducts = async (req, res) => {
    let products = await productModel.find().populate("category");

    res.status(200).json(products)
}

const storeProduct = async (req, res) => {
    try {
        let productExist = await productModel.findOne({
            name: req.body.name
        });

        if (productExist) {
            return res.status(409).json({
                message: "product already exists"
            })
        }

        await productModel.create({
            name: req.body.name,
            slug: req.body.slug,
            shortDescription: req.body.shortDescription,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            image: req.file.path.replace("public", ""),
            status: req.body.status
        })

        return res.status(201).json({
            message: "product created successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {

        let product = await productModel.findById(req.params.id);

        if (product) {
            if (req.file) {
                if (product.image) {
                    let url = path.join(__dirname, "../../public", product.image)
                    if (fs.existsSync(url)) {
                        fs.unlinkSync(url)
                    }
                }

                await productModel.updateOne({
                    _id: req.params.id
                }, {
                    name: req.body.name,
                    slug: req.body.slug,
                    shortDescription: req.body.shortDescription,
                    description: req.body.description,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    category: req.body.category,
                    image: req.file.path.replace("public", ""),
                    status: req.body.status
                })

            } else {
                await productModel.updateOne({
                    _id: req.params.id
                }, {
                    name: req.body.name,
                    slug: req.body.slug,
                    shortDescription: req.body.shortDescription,
                    description: req.body.description,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    category: req.body.category,
                    status: req.body.status
                })
            }

            return res.status(201).json({
                message: "product updated sucessfully",
            })
        }

        return res.status(404).json({
            message: "product not found"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        let product = await productModel.findById(req.params.id);

        if (product) {
            await productModel.deleteOne({
                _id: req.params.id
            })

            return res.status(201).json({
                message: "product deleted sucessfully",
            })
        }

        return res.status(404).json({
            message: "product not found"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getProducts,
    storeProduct,
    updateProduct,
    deleteProduct
}