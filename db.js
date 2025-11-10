const mongoose = require("mongoose");
require('dotenv').config()

const main = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected Successfully"))
        .catch((err) => console.log("connection error", err))
}
module.exports = main;