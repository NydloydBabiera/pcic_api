module.exports = function queuingUC({ queuingDataAccess }) {
  return async function queuingNumGen(winTransData) {
    //query first to count how many customer or client in window and data
    const currCnt = await queuingDataAccess.countQueuNum(winTransData);
    console.log("currCnt:", currCnt[0].count);
    //add 1 to count and save to db
    var newQueuNum = parseInt(currCnt[0].count) + 1;
    return await queuingDataAccess.newQueuingNum(winTransData, newQueuNum);
  };
};
