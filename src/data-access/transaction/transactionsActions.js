module.exports = function transactionActions({ pool }) {
  return Object.freeze({
    addNewUser,
  });

  async function addNewUser(userData) {
    const {
      firstName,
      middleName,
      lastName,
      userName,
      user_password,
      user_role,
    } = userData;

    return await pool
      .query(
        `INSERT INTO user_info_tbl(
      firstName,
      middleName,
      lastName,
      userName,
      user_password,
      user_role
    )VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [firstName, middleName, lastName, userName, user_password, user_role]
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }

  async function 


}
