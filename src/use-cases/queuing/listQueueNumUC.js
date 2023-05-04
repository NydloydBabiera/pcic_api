module.exports = function listQueueNumUC({ queuingDataAccess }) {
  return async function listQueueNum(queue_id, winTransData) {
    //update current number from ongoing to done
    const updateResult = await queuingDataAccess.updateCurrentNum(
      winTransData,
      queue_id
    );
    //return new set of list of pending queue numbers
    const result = await queuingDataAccess.listPendingQueue(winTransData);
    return result;
  };
};
