const queuingDataAccess = require("../data-access/queuing");
const userActionsDataAccess = require("../data-access/users");
const transActionDataAccess = require("../data-access/transaction");

const { checkUserEntry, checkTransactionEntry } = require("../entities");

//queuing
const queuingGen = require("./queuing/queuingUC");
const listQueue = require("./queuing/listQueueNumUC");

//user
const newUserRegistration = require("./users/userRegistrationUC");
const userLogin = require("./users/userLoginUC");
const getAllUser = require("./users/getAllUserUC");
const resetPassword = require("./users/resetPasswordUC");
const updateUser = require("./users/updateUserUC");

//transaction
const draftTrans = require("./transactions/draftTransactionUC");
const processTrans = require("./transactions/processTransactionUC");
const listTrans = require("./transactions/listAllTransactionUC");

//queuing
const queingGenUC = queuingGen({ queuingDataAccess });
const listQueueUC = listQueue({ queuingDataAccess });

//user
const userRegistrationUC = newUserRegistration({
  userActionsDataAccess,
  checkUserEntry,
});
const userLoginUC = userLogin({ userActionsDataAccess });
const getAllUserUC = getAllUser({ userActionsDataAccess });
const resetPasswordUC = resetPassword({ userActionsDataAccess });
const updateUserUC = updateUser({ userActionsDataAccess });

//transaction
const draftTransactionUC = draftTrans({
  transActionDataAccess,
  checkTransactionEntry,
});
const processTransUC = processTrans({ transActionDataAccess });
const listTransUC = listTrans({ transActionDataAccess });

module.exports = {
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
};
