const express = require("express");
const { route } = require("..");
const router = express.Router();

const {
  userRegistrationControl,
  userLoginControl,
  gitAllUserControl,
  resetPasswordControl,
  updateUserControl,
} = require("../controller");

const makeExpressCallback = require("../express-callback");

router.post("/addNewUser", makeExpressCallback(userRegistrationControl));
router.post("/authenticate", makeExpressCallback(userLoginControl));
router.get("/getAllUser", makeExpressCallback(gitAllUserControl));
router.put("/resetUser/:id", makeExpressCallback(resetPasswordControl));
router.put("/updateUser/:id", makeExpressCallback(updateUserControl));

module.exports = router;
