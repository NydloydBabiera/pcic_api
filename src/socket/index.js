const { io } = require("../index");
const queuingDataAccess = require("../data-access/queuing");

const dasboardIO = require("./dashboardSocket");

const dashboardUC = dasboardIO({ queuingDataAccess, io });

const DashboardUserCase = Object.freeze({
  dashboardUC,
});

module.exports = DashboardUserCase;
module.exports = {
  dashboardUC,
};
