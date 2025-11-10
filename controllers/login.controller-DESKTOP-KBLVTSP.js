const Signup = require("../models/signup.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Signup.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid Username" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SCREAT, { expiresIn: '2h' })
        res.status(200).json({ message: "login successfully", token });
    } catch (err) {
        res.status(500).json({ message: "login err" });
        console.log("login err", err);
    }
};
module.exports = { loginUser };