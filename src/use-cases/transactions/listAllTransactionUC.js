module.exports = function listTransUC({ transActionDataAccess }) {
  return async function listTransaction() {
    //get all transaction header
    const transHeader = await transActionDataAccess.getAllHeaderTransaction();
    //get all trabsaction line
    const transLine = await transActionDataAccess.getAllLineTransaction();

    return { transHeader, transLine };
  };
};
