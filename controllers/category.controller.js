const Category = require("../models/category.model");

const getcategory = async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).json(categoryList);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Category not found" });
    }
};

const postcategory = async (req, res) => {
    try {
        const { name } = req.body;
        const isExists = await Category.findOne({ name })
        if (isExists) {
            return res.status(403).json({ message: "Category already exists" })
        }
        const newCategory = new Category({
            name,
        });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ message: "error post category" });
        console.log(err);
    }
};


module.exports = { postcategory, getcategory };