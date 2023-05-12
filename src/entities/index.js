const userEntry = require("./userEntry");
const transEntry = require("./transactionEntry");

const checkUserEntry = userEntry();
const checkTransactionEntry = transEntry();

module.exports = { checkUserEntry, checkTransactionEntry };
