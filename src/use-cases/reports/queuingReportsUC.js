module.exports = function getQueueReportsUC({
    reportsDataAccess,
}){
    return async function transactionReports(){
        const results = await reportsDataAccess.getAllTransactions();

        return results;
    }
}