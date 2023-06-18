module.exports = function userActions({ pool }) {
  return Object.freeze({
    addNewUser,
    loginUser,
    isUserExist,
    getAllUserAccounts,
    resetUserPassword,
    changePassword,
    updateUserDetails,
  });

  async function addNewUser(userData) {
    const {
      firstName,
      middleName,
      lastName,
      username,
      user_password,
      user_role,
    } = userData;

    return await pool
      .query(
        `INSERT INTO user_info_tbl(
        firstName,
        middleName,
        lastName,
        username,
        user_password,
        user_role
      )VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [firstName, middleName, lastName, username, user_password, user_role]
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  async function isUserExist(userData) {
    const { firstName, middleName, lastName, username } = userData;

    let sql = `select * from user_info_tbl
    where firstname = $1 and middlename = $2 and lastname = $3 and username = $4`;
    try {
      let result = await pool.query(sql, [
        firstName,
        middleName,
        lastName,
        username,
      ]);

      return result.rows;
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  async function loginUser(userCredentials) {
    const { username } = userCredentials;
    let sql = `select * from user_info_tbl where username = $1`;
    try {
      let result = await pool.query(sql, [username]);
      return result;
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  async function getAllUserAccounts() {
    try {
      let result = await pool.query(`SELECT * FROM user_info_tbl`);
      return result.rows;
    } catch (error) {
      console.log("err:", error);
    }
  }

  async function resetUserPassword(userCredentials, user_id) {
    const { username } = userCredentials;
    let sql = `update user_info_tbl set user_password = $1 where user_id = $2`;

    return await pool
      .query(sql, [username, user_id])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  async function changePassword(userCredentials, user_id) {
    const { newPassword } = userCredentials;
    let sql = `update user_info_tbl set user_password = $1 where user_id = $2`;

    return await pool
      .query(sql, [newPassword, user_id])
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  async function updateUserDetails(userDetails, user_id) {
    const { firstName, middleName, lastName, user_role } = userDetails;
    let sql = `update user_info_tbl
              set firstname = $1 , middlename = $2 , lastname = $3 , user_role = $4 
              where user_id = $5 returning *`;
    return await pool
      .query(sql, [firstName, middleName, lastName, user_role, user_id])
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }
};
