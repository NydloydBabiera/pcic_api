module.exports = function getReportsUC({
    reportsDataAccess,
}){
    return async function transactionReports(){
        const results = await reportsDataAccess.getAllTransactions();

        return results;
    }
}