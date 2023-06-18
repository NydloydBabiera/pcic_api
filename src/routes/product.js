const express = require("express");
const { route } = require("..");
const router = express.Router();

const { addProductControl, getallProductControl } = require("../controller");

const makeExpressCallback = require("../express-callback");

router.post("/addProduct", makeExpressCallback(addProductControl));
router.get("/getAllProduct", makeExpressCallback(getallProductControl));

module.exports = router;
