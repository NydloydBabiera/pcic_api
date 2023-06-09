const {
  queingGenUC,
  listQueueUC,
  userRegistrationUC,
  userLoginUC,
  getAllUserUC,
  resetPasswordUC,
  updateUserUC,
  draftTransactionUC,
  processTransUC,
  listTransUC,
  updateTransactionUC,
  addProductUC,
  getAllProductUC,
  transReportUC,
  queuReportUC,
  overrideTransactionUC
} = require("../use-cases");

//queuing
const queuingController = require("./queuing/queuingController");
const listQueueController = require("./queuing/listQueueController");

//user
const userRegistrationController = require("./users/userRegistrationController");
const userLoginController = require("./users/userLoginController");
const getAllUserController = require("./users/getAllUserController");
const resetPasswordController = require("./users/resetPasswordController");
const updateUserController = require("./users/updateUserController");

//transaction
const drafTransctionController = require("./transaction/draftTransController");
const processTransController = require("./transaction/processTransController");
const listTransController = require("./transaction/listTransController");
const updateTransactionController = require("./transaction/updateTransController");
const overrideTransactionController = require("./transaction/overrideTransController")

//product
const addProductController = require("./product/addProductController");
const getAllProductController = require("./product/getAllProductController");

//report
const reportTransController = require("./reports/reportTransController")
const reportQueuController = require("./reports/queuController")

//queuing
const queuingGenControl = queuingController({ queingGenUC });
const listQueueControl = listQueueController({ listQueueUC });

//users
const userRegistrationControl = userRegistrationController({
  userRegistrationUC,
});
const userLoginControl = userLoginController({ userLoginUC });
const gitAllUserControl = getAllUserController({ getAllUserUC });
const resetPasswordControl = resetPasswordController({ resetPasswordUC });
const updateUserControl = updateUserController({ updateUserUC });

//transactions
const draftTransControl = drafTransctionController({ draftTransactionUC });
const processTransControl = processTransController({ processTransUC });
const listTransControl = listTransController({ listTransUC });
const updateControl = updateTransactionController({ updateTransactionUC });
const overrideTransControl = overrideTransactionController({overrideTransactionUC})

//products
const addProductControl = addProductController({ addProductUC });
const getallProductControl = getAllProductController({ getAllProductUC });

//report
const reportTransControl = reportTransController({transReportUC});
const reportQueuControl = reportQueuController({queuReportUC});

module.exports = {
  queuingGenControl,
  listQueueControl,
  userRegistrationControl,
  userLoginControl,
  gitAllUserControl,
  resetPasswordControl,
  updateUserControl,
  draftTransControl,
  processTransControl,
  listTransControl,
  updateControl,
  addProductControl,
  getallProductControl,
  reportTransControl,
  reportQueuControl,
  overrideTransControl
};
