const express = require("express");
const { route } = require("..");
const router = express.Router();

const {
  draftTransControl,
  processTransControl,
  listTransControl,
  updateControl,
  overrideTransControl
} = require("../controller");

const makeExpressCallback = require("../express-callback");

router.post("/draftTransaction", makeExpressCallback(draftTransControl));
router.post("/processTransaction", makeExpressCallback(processTransControl));
router.get("/getAllTransaction", makeExpressCallback(listTransControl));
router.put("/updateTransaction/:id", makeExpressCallback(updateControl));
router.post("/overrideTransaction",makeExpressCallback(overrideTransControl))

module.exports = router;
