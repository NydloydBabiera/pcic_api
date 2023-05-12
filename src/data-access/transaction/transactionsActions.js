module.exports = function transactionAction({ pool }) {
  return Object.freeze({
    saveTransaction,
    getAllHeaderTransaction,
    processTransaction,
    getDRtransCode,
    getSpecificTransaction,
    saveTransactionLine,
    getAllLineTransaction,
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
    ];

    let sql = `INSERT INTO transactions_tbl(
        transaction_code, transaction_status, payor, product, amount_total, payment_type, check_no, transaction_date, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

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
    const { transaction_id, product_id, quantity } = trans_line;
    let param = [transaction_id, product_id, quantity];
    let sql = `INSERT INTO transactions_line_tbl( transaction_id, product_id, quantity)
      VALUES ($1, $2, $3) RETURNING *`;

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
    let sql = `select * from transactions_tbl`;

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
};
