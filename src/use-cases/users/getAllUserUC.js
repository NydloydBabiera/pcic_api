module.exports = function getAllUserUC({ userActionsDataAccess }) {
  return async function getAllUser() {
    const allUser = await userActionsDataAccess.getAllUserAccounts();

    return allUser;
  };
};
