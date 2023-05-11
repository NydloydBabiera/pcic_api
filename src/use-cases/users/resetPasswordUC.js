module.exports = function resetPasswordUC({ userActionsDataAccess }) {
  return async function resetUserPassword(userCredentials, user_id) {
    const alterUser = [];
    let message = "";

    if (userCredentials.username) {
      allUser = await userActionsDataAccess.resetUserPassword(
        userCredentials,
        user_id
      );
      message = "Reset successfully!";
    } else {
      allUser = await userActionsDataAccess.changePassword(
        userCredentials,
        user_id
      );
      message = "Password successfully changed!";
    }

    return message;
  };
};
