module.exports = function updateransactionUC({
  transActionDataAccess,
  checkTransactionEntry,
}) {
  return async function draftTransaction(transData) {
    //check entries in entity
    await checkTransactionEntry(transData);

    //update header transaction
    // const trans_header = await transActionDataAccess.updateHeaderTransaction(
    //   transData.trans_header
    // );

    //update transaction line
    console.log("line length:", transData.trans_line.length);
    // let transLineData = [];
    // for await (transLine of transData.trans_line) {
    //   const dataVal = {};
    //   transLine.transaction_id = trans_header.rows[0].transaction_id;
    //   const trans_line = await transActionDataAccess.updateTransactionLine(
    //     transLine
    //   );
    //   dataVal.transaction_line_tbl = trans_line.rows[0].transaction_line_tbl;
    //   dataVal.transaction_id = trans_line.rows[0].transaction_id;
    //   dataVal.product_id = trans_line.rows[0].product_id;
    //   dataVal.quantity = trans_line.rows[0].quantity;

    //   transLineData.push(dataVal);
    // }

    return {
      message: "Transaction updated!",
      trans_header: trans_header.rows,
      trans_line: transLineData,
    };
  };
};
