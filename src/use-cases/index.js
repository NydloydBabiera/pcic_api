const queuingDataAccess = require("../data-access/queuing");

const queuingGen = require("./queuing/queuingUC");
const listQueue = require("./queuing/listQueueNumUC");

const queingGenUC = queuingGen({ queuingDataAccess });
const listQueueUC = listQueue({ queuingDataAccess });

module.exports = {
  queingGenUC,
  listQueueUC,
};
