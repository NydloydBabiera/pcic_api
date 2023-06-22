const transactionsActions = require("../../data-access/transaction/transactionsActions");

module.exports = function updateransactionUC({
  transActionDataAccess,
  checkTransactionEntry,
}) {
  return async function draftTransaction(transData) {
    //check entries in entity
    await checkTransactionEntry(transData);

    // update header transaction
    const trans_header = await transActionDataAccess.updateHeaderTransaction(
      transData.trans_header
    );

    //delete transaction_line

    await transActionDataAccess.deleteTransLine(transData.trans_header.transaction_id);

    //update transaction line
    let transLineData = [];
    for await (transLine of transData.trans_line) {
      const dataVal = {};
      transLine.transaction_id = trans_header.rows[0].transaction_id;
      const trans_line = await transActionDataAccess.saveTransactionLine(
        transLine
      );
      
      dataVal.transaction_line_tbl = trans_line.rows[0].transaction_line_tbl;
      dataVal.transaction_id = trans_line.rows[0].transaction_id;
      dataVal.product_id = trans_line.rows[0].product_id;
      dataVal.quantity = trans_line.rows[0].quantity;

      transLineData.push(dataVal);
    }

    return {
      message: "Transaction updated!",
      trans_header: trans_header.rows,
      trans_line: transLineData,
    };
  };
};
