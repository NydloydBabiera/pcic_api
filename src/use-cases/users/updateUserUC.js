module.exports = function updateUserUC({ userActionsDataAccess }) {
  return async function updateUserDetails(userDetails, user_id) {
    const updateUser = await userActionsDataAccess.updateUserDetails(
      userDetails,
      user_id
    );

    return { message: "Updated successfully!", updateUser };
  };
};
