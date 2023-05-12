module.exports = function drafTransactionUC({
  transActionDataAccess,
  checkTransactionEntry,
}) {
  return async function draftTransaction(transData) {
    //check entries in entity
    await checkTransactionEntry(transData.trans_header);
    //generate transaction_code for draft, and transaction_status
    const DRtransCode = await transActionDataAccess.getDRtransCode();
    transData.trans_header.transaction_code =
      "DR" + padWithLeadingZeros(DRtransCode.count, 6);
    transData.trans_header.transaction_status = "DR";

    //save header transaction
    const trans_header = await transActionDataAccess.saveTransaction(
      transData.trans_header
    );

    //save transaction line
    let transLineData = [];
    for await (transLine of transData.trans_line) {
      const dataVal = {};
      transLine.transaction_id = trans_header.rows[0].transaction_id;
      const trans_line = await transActionDataAccess.saveTransactionLine(
        transLine
      );

      console.log(trans_line.rows[0]);
      dataVal.transaction_line_tbl = trans_line.rows[0].transaction_line_tbl;
      dataVal.transaction_id = trans_line.rows[0].transaction_id;
      dataVal.product_id = trans_line.rows[0].product_id;
      dataVal.quantity = trans_line.rows[0].quantity;

      transLineData.push(dataVal);
    }

    return {
      message: "Draft saved!",
      trans_header: trans_header.rows,
      trans_line: transLineData,
    };
  };

  function padWithLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, "0");
  }
};
