const Brand = require('../models/brand');
const Product = require('../models/product');

const createProducts = async (req, res) => {
    try {
        const product = await new Product(req.body)
        await product.save()
        return res.status(201).json({
            product,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json({ products })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const findProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        if (product) {
            return res.status(200).json({ product });
        }
        return res.status(404).send('product with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndUpdate(id, req.body, { new: true }, (err, product) => {
            if (err) {
                res.status(500).send(err);
            }
            if (!product) {
                res.status(500).send('Product not found!');
            }
            return res.status(200).json(product);
        })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Product deleted");
        }
        throw new Error("Product not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


module.exports = {
    createProducts,
    getAllProducts,
    findProduct,
    updateProduct,
    deleteProduct,
}
