module.exports = function drafTransactionUC({
  transActionDataAccess,
  checkTransactionEntry,
}) {
  return async function draftTransaction(transData) {
    //check entries in entity
    await checkTransactionEntry(transData);

    //generate transaction_code for draft, and transaction_status
    const DRtransCode = await transActionDataAccess.getDRtransCode();
    transData.transaction_code =
      "DR" + padWithLeadingZeros(DRtransCode.count, 6);
    transData.transaction_status = "DR";

    //save transaction
    const allUser = await transActionDataAccess.saveTransaction(transData);

    return allUser;
  };

  function padWithLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, "0");
  }
};
