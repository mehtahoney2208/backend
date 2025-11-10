const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNo: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    }, { timestamps: true })

const Signup = mongoose.model('Signup', signupSchema)
module.exports = Signup