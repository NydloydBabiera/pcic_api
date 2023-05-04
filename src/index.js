const express = require("express");
const { errorMonitor } = require("pg/lib/query");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

var generateQueueNum = require("./routes/queuing");

app.use(cors());
app.use(express.json());
app.use("/queuing", generateQueueNum);

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
