module.exports = function getQueueReportsUC({
    reportsDataAccess,
}){
    return async function queuReports(){
        const results = await reportsDataAccess.getAllQueuing();

        return results;
    }
}