module.exports = function dashboardUC({ queuingDataAccess, io }) {
  return async function listQueueNum() {
    try {
      io.on("connection", async (socket) => {
        const dataType = [];
        console.log("connected to socket");
        const result = await queuingDataAccess.listQueueDashboard();
        dataType.push({ 0: "list of queu" }, { result });
        io.emit("dashboard", dataType);
      });
    } catch (error) {
      console.log("ERROR:", err);
    }
  };
};
