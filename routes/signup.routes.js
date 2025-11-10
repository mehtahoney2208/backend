const express = require("express")
const router = express.Router()
const { getinfo, postinfo } = require("../controllers/signup.controller")

router.get('/getinfo', getinfo)
router.post('/postinfo', postinfo)

module.exports = router;