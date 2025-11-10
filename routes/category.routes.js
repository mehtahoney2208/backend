const express = require("express");
const router = express.Router();
const { getcategory, postcategory } = require("../controllers/category.controller");

router.get("/getcategory", getcategory);
router.post("/postcategory", postcategory);

module.exports = router;