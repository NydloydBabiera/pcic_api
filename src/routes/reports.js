const express = require("express");
const { route } = require("..");
const router = express.Router();

const { reportTransControl , reportQueuControl} = require("../controller");

const makeExpressCallback = require("../express-callback");

router.get("/getTransReport", makeExpressCallback(reportTransControl));
router.get("/getQueuReport", makeExpressCallback(reportQueuControl));

module.exports = router;
