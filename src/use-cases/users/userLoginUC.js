module.exports = function userLoginUC({ userActionsDataAccess }) {
  return async function loginUser(userCredentials) {
    const registredDetails = await userActionsDataAccess.loginUser(
      userCredentials
    );

    if (!registredDetails.rows[0]) {
      throw new Error("User account does not exist");
    }

    if (registredDetails.rowCount > 1) {
      throw new Error("Multiple accounts detected");
    }

    if (
      !(
        userCredentials.user_password === registredDetails.rows[0].user_password
      )
    ) {
      throw new Error("Incorrect password");
    }

    const results = registredDetails.rows[0];

    return { message: "Login Successfully!", results };
  };
};
