const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const postProductinCart = async (req, res) => {
    try {
        const { userToken, id } = req.body;
        const user = jwt.verify(userToken, process.env.JWT_SCREAT);
        const newCart = new Cart({ user: user.id, product: id });
        await newCart.save();
        res.status(201).json({ message: "Created Successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error posting product" });
        console.log("Error posting product", err);
    }
};

const showCart = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
          }
        const decoded = jwt.verify(token,  process.env.JWT_SCREAT)
        const userId = decoded.id
        const cartList = await Cart.find({user : userId}).populate('product');
        res.status(200).json({ cartList });
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart" });
        console.log("Error fetching cart", err);
    }
};

const deleteCartItem = async (req, res) => {
    const { productId } = req.params; // Assuming productId is passed as a URL parameter
    console.log(`Attempting to delete item with productId: ${ productId }`); // Log productId
    try {
        const deletedItem = await Cart.findOneAndDelete({ product: productId });

        console.log(`Deleted item: ${ deletedItem }`); // Log deleted item

        if (!deletedItem) {
            console.log("Item not found in cart");
            return res.status(404).json({ message: "Item not found in cart" });
        }

        res.status(200).json({ message: "Item deleted from cart successfully", deletedItem });
    } catch (error) {
        console.error("Error deleting item from cart:", error);
        res.status(500).json({ message: "Error deleting item from cart" });
    }
};

module.exports = { postProductinCart, showCart, deleteCartItem };