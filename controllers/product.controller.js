const Product = require("../models/product.model");
const Category = require("../models/category.model");

const postproduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file.path;
        const findObj = await Category.findOne({ name: category });
        const newProduct = new Product({
            name,
            image,
            description,
            price,
            category: findObj._id,
        });
        await newProduct.save();
        res.status(201).json({ message: "Created Successfully" });
    } catch (err) {
        res.status(500).json({ message: "err post product" });
        console.log("err post product", err);
    }
};
const getproducts = async (req, res) => {
    try {
        const productList = await Product.find();
        res.status(200).json({ productList });
    } catch (err) {
        res.status(500).json({ message: "err get product" });
        console.log("err get product", err);
    }
};


const getoneproduct = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        if (!id) {
            res.status(404).json({ message: "Id not found" })
        }

        const product = await Product.findOne({ _id: id }).populate('category', 'name')
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: "err get product" });
        console.log("err get one product", error);
    }
}

module.exports = { postproduct, getproducts, getoneproduct };