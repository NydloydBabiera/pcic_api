module.exports = function userRegistrationUC({
  userActionsDataAccess,
  checkUserEntry,
}) {
  return async function newUserRegistration(userData) {
    await checkUserEntry(userData);
    //query first to check if existing user is registred
    const isUserExist = await userActionsDataAccess.isUserExist(userData);

    if (isUserExist.length) {
      throw new Error("User already exists!");
    }

    //add 1 to count and save to db
    return await userActionsDataAccess.addNewUser(userData);
  };
};
