const express = require("express");
const { route } = require("..");
const router = express.Router();

const { queuingGenControl, listQueueControl } = require("../controller");

const makeExpressCallback = require("../express-callback");

router.post("/generateQueueNum", makeExpressCallback(queuingGenControl));
router.get("/listQueuNum/:id", makeExpressCallback(listQueueControl));

module.exports = router;
