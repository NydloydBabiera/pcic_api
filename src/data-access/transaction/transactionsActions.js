module.exports = function transactionAction({ pool }) {
  return Object.freeze({
    saveTransaction,
    getAllHeaderTransaction,
    processTransaction,
    getDRtransCode,
    getSpecificTransaction,
    saveTransactionLine,
    getAllLineTransaction,
    updateHeaderTransaction,
    updateTransactionLine,
    ovrHeaderTransaction,
    deleteTransLine
  });

  async function getDRtransCode() {
    let sql = `select count(transaction_id) from transactions_tbl`;
    try {
      let result = await pool.query(sql);
      return result.rows[0];
    } catch (error) {
      console.log("err:", error);
    }
  }

  async function getSpecificTransaction(transaction_id) {
    let sql = `select * from transactions_tbl where transaction_id = $1`;
    try {
      let result = await pool.query(sql, [transaction_id]);
      return result.rows[0];
    } catch (error) {
      console.log("err:", error);
    }
  }

  async function saveTransaction(transData) {
    const {
      transaction_code,
      transaction_status,
      payor,
      product,
      amount,
      payment_type,
      check_no,
      transaction_date,
      user_id,
      check_date,
      bank_code,
    } = transData;

    let param = [
      transaction_code,
      transaction_status,
      payor,
      product,
      amount,
      payment_type,
      check_no,
      transaction_date,
      user_id,
      check_date,
      bank_code,
    ];

    let sql = `INSERT INTO transactions_tbl(
        transaction_code, transaction_status, payor, product, amount_total, payment_type, check_no, transaction_date, user_id, check_date, bank_code)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

    return await pool
      .query(sql, param)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  async function saveTransactionLine(trans_line) {
    const { transaction_id, product_id, quantity, amount } = trans_line;
    let param = [transaction_id, product_id, quantity, amount];
    let sql = `INSERT INTO transactions_line_tbl( transaction_id, product_id, quantity, amount)
      VALUES ($1, $2, $3, $4) RETURNING *`;

    return await pool
      .query(sql, param)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  async function processTransaction(transData) {
    const { trans_id, transCodePR, transStatus } = transData;
    let param = [transCodePR, transStatus, trans_id];
    let sql = `UPDATE transactions_tbl
	SET transaction_code = $1, transaction_status = $2 WHERE transaction_id = $3 RETURNING *`;

    return await pool
      .query(sql, param)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  async function getAllHeaderTransaction() {
    let sql = `select * from transactions_tbl order by transaction_id desc`;

    try {
      let result = await pool.query(sql);
      return result.rows;
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  async function getAllLineTransaction() {
    let sql = `select * from transactions_line_tbl transLine
    inner join product_tbl prod on prod.product_id = transLine.product_id`;

    try {
      let result = await pool.query(sql);
      return result.rows;
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  async function updateHeaderTransaction(transData) {
    const {
      payor,
      product,
      amount,
      payment_type,
      check_no,
      transaction_date,
      user_id,
      check_date,
      bank_code,
      transaction_id,
    } = transData;

    let param = [
      payor,
      product,
      amount,
      payment_type,
      check_no,
      transaction_date,
      user_id,
      check_date,
      bank_code,
      transaction_id,
    ];

    let sql = `UPDATE transactions_tbl
    SET payor=$1, product=$2, amount_total=$3, 
    payment_type=$4, check_no=$5, transaction_date=$6, user_id=$7, check_date=$8, bank_code=$9
    WHERE transaction_id= $10 RETURNING *`;

    return await pool
      .query(sql, param)
      .then((res) => {
        return res;
      })
      .catch((err) => { 
        console.log("ERROR:", err);
      });
  }

  async function deleteTransLine(transaction_id){
    let param = [transaction_id];

    let sql = `delete from transactions_line_tbl
    where transaction_id = $1`;

    return await pool
      .query(sql, param)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  async function updateTransactionLine(trans_line) {
    const { transaction_id, product_id, quantity, amount } = trans_line;

    let param = [transaction_id, product_id, quantity, amount];

    let sql = `UPDATE transactions_line_tbl
    SET product_id=$2, quantity=$3, amount=$4
    WHERE transaction_id= $1 RETURNING *`;

    return await pool
      .query(sql, param)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }
 
  async function ovrHeaderTransaction(transData) {

    const {
      transaction_code,
      transaction_status,
      transaction_id,
    } = transData;


    let param = [
      transaction_code,
      transaction_status,
      transaction_id,
    ];

    let sql = `UPDATE transactions_tbl
    SET  transaction_code = $1, transaction_status = $2
    WHERE transaction_id = $3 RETURNING *`;

    return await pool
      .query(sql, param)
      .then((res) => {
        return res;
      })
      .catch((err) => { 
        console.log("ERROR:", err);
      });
  }

};
