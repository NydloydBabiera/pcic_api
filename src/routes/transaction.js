const express = require("express");
const { route } = require("..");
const router = express.Router();

const { draftTransControl, processTransControl } = require("../controller");

const makeExpressCallback = require("../express-callback");

router.post("/draftTransaction", makeExpressCallback(draftTransControl));
router.post("/processTransaction", makeExpressCallback(processTransControl));

module.exports = router;
