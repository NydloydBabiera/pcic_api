module.exports = function dashboardUC({ queuingDataAccess, io }) {
  return async function listQueueNum() {
    try {
      io.on("connection", async (socket) => {
        console.log("connected to socket");
        const result = await queuingDataAccess.listQueueDashboard();
        io.emit("dashboard", result);
      });
    } catch (error) {
      console.log("ERROR:", err);
    }
  };
};
