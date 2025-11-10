const express = require("express");
const app = express();
const main = require("./db");
const cors = require("cors");
const loginRouter = require('./routes/login.routes')
const signupRouter = require('./routes/signup.routes')
const productRouter = require('./routes/product.routes')
const categoryRouter = require('./routes/category.routes')
const cartRouter = require('./routes/cart.routes')
app.use(express.json())
app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 4000;
main()

app.use('/api/signup', signupRouter)
app.use('/api/login', loginRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});