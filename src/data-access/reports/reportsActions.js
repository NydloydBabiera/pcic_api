module.exports = function reportsDataAccess({ pool }) {
    return Object.freeze({
        getAllTransactions,
        getAllQueuing
    });
  
    async function getAllTransactions() {
        let sql = `select * from transactions_tbl`;
    
        try {
          let result = await pool.query(sql);
          return result.rows;
        } catch (error) {
          console.log("ERROR:", error);
        }
    }
    

    async function getAllQueuing(){
        let sql = `select * from queuing_tbl`;
    
        try {
          let result = await pool.query(sql);
          return result.rows;
        } catch (error) {
          console.log("ERROR:", error);
        }
    }

  };
  