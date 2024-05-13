const categoryModel = require("../../models/category.model")
const path = require("path");
const fs = require("fs");

const getCategories = async (req, res) => {
    let categories = await categoryModel.find();

    res.status(200).json(categories)
}

const storeCategory = async (req, res) => {
    try {
        let categoryExist = await categoryModel.findOne({
            name: req.body.name
        });

        if (categoryExist) {
            return res.status(409).json({
                message: "category already exists"
            })
        }

        await categoryModel.create({
            name: req.body.name,
            image: req.file.path.replace("public", ""),
            status: req.body.status
        })

        return res.status(201).json({
            message: "category created successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        
        let category = await categoryModel.findById(req.params.id);
    
        if(category) {
            if (req.file) {
                if (category.image) {
                    let url = path.join(__dirname, "../../public", category.image)
                    if (fs.existsSync(url)) {
                        fs.unlinkSync(url)
                    }
                }
        
                await categoryModel.updateOne({_id: req.params.id}, {
                    name: req.body.name,
                    image: req.file.path.replace("public", ""),
                    status: req.body.status
                })
        
            } else {
                await categoryModel.updateOne({_id: req.params.id}, {
                    name: req.body.name,
                    status: req.body.status
                })
            }

            return res.status(201).json({
                message: "category updated sucessfully",
            })
        }

        return res.status(404).json({
            message: "category not found"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        let category = await categoryModel.findById(req.params.id);
    
        if(category) {
            await categoryModel.deleteOne({_id: req.params.id})

            return res.status(201).json({
                message: "category deleted sucessfully",
            })
        }

        return res.status(404).json({
            message: "category not found"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getCategories,
    storeCategory,
    updateCategory,
    deleteCategory
}