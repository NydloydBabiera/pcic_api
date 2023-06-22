const transactionsActions = require("../../data-access/transaction/transactionsActions");

module.exports = function ovrTransactionUC({
    transActionDataAccess,
    checkTransactionEntry,
  }) {
    return async function overrideTransaction(transData) {
      //check entries in entity
      await checkTransactionEntry(transData);
  
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
  
        dataVal.transaction_line_tbl = trans_line.rows[0].transaction_line_tbl;
        dataVal.transaction_id = trans_line.rows[0].transaction_id;
        dataVal.product_id = trans_line.rows[0].product_id;
        dataVal.quantity = trans_line.rows[0].quantity;
  
        transLineData.push(dataVal);
      }
  
      //update header of overriden transaction
      transData.trans_header.transaction_code += "-OVR"; 
      transData.trans_header.transaction_status = "OVR"; 
      const ovrHeader = await transActionDataAccess.ovrHeaderTransaction(transData.trans_header )

      return {
        message: "Transaction override!",
        trans_header: trans_header.rows,
        trans_line: transLineData,
        override_trans: ovrHeader.rows,
      };
    };
  
    
  };
  