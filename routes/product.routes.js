const express = require('express')
const router = express.Router()
const { postproduct, getproducts, getoneproduct } = require('../controllers/product.controller')
const upload = require('../middleware/upload.file.js')

router.post('/postproduct', upload, postproduct)
router.get('/getproducts', getproducts)
router.get('/getoneproduct/:id', getoneproduct)

module.exports = router