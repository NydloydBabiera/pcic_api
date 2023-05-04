const { queingGenUC, listQueueUC } = require("../use-cases");

const queuingController = require("./queuing/queuingController");
const listQueueController = require("./queuing/listQueueController");

const queuingGenControl = queuingController({ queingGenUC });
const listQueueControl = listQueueController({ listQueueUC });

module.exports = {
  queuingGenControl,
  listQueueControl,
};
