module.exports = function processTransUC({ transActionDataAccess }) {
  return async function procesTransaction(transData) {
    //check entries in entity
    const transStatus = await transActionDataAccess.getSpecificTransaction(
      transData.trans_id
    );
    console.log("transStatus:", transStatus.transaction_status);
    if (transStatus.transaction_status == "PR") {
      throw new Error("Transaction already processed!");
    }
    transData.transStatus = "PR";
    //generate transaction_code for draft, and transaction_status
    const processTransaction = await transActionDataAccess.processTransaction(
      transData
    );

    //process transaction

    return processTransaction;
  };
};
