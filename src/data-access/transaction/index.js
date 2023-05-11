const Pool = require("pg").Pool;
const transAction = require("./transactionsActions");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
});

const transDataAccess = transAction({ pool });

// module.exports = { empDataAccess, transDataAccess };
module.exports = transDataAccess;
