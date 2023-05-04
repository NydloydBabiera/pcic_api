module.exports = function queuingGen({ pool }) {
  return Object.freeze({
    newQueuingNum,
    countQueuNum,
    listPendingQueue,
    updateCurrentNum,
  });

  async function newQueuingNum(winTransData, newQueuNum) {
    const { winNum, transType, date_queue, gender } = winTransData;

    return await pool
      .query(
        `INSERT INTO queuing_tbl(window_num,trans_type,queue_num,date_queue,status,gender) VALUES ($1 , $2 , $3 , $4, $5, $6)
    RETURNING *`,
        [winNum, transType, newQueuNum, date_queue, "PENDING", gender]
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  async function countQueuNum(winTransData) {
    const { winNum } = winTransData;
    try {
      let result = await pool.query(
        `select count(queue_id) from queuing_tbl
      where window_num = $1 and date_queue = CURRENT_DATE`,
        [winNum]
      );
      return result.rows;
    } catch (error) {
      console.log("err:", error);
    }
  }

  async function updateCurrentNum(winTransData, queue_id) {
    const { winNum, newStatus, oldStatus } = winTransData;

    let sql = `update queuing_tbl set status = $1 where queue_id = $2 
    and status = $3 and window_num = $4`;

    let param = [
      newStatus.toUpperCase(),
      queue_id,
      oldStatus.toUpperCase(),
      winNum,
    ];

    return await pool
      .query(sql, param)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  async function listPendingQueue(winTransData) {
    const { winNum } = winTransData;
    try {
      let result = await pool.query(
        `select  
        * 
        from queuing_tbl
        where window_num = $1 and date_queue = CURRENT_DATE
        and status = 'PENDING'
        order by queue_num asc;`,
        [winNum]
      );
      return result.rows;
    } catch (error) {
      console.log("err:", error);
    }
  }
};
