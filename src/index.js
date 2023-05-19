const express = require("express");
const { errorMonitor } = require("pg/lib/query");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

module.exports = { io };

var generateQueueNum = require("./routes/queuing");
var userRoute = require("./routes/users");
var transRoute = require("./routes/transaction");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use("/queuing", generateQueueNum);
app.use("/user", userRoute);
app.use("/transaction", transRoute);
app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});

const { dashboardUC } = require("./socket/index");
dashboardUC();
