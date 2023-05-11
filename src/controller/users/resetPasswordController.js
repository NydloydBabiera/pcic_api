module.exports = function resetPassword({ resetPasswordUC }) {
  return async function put(httpRequest) {
    try {
      const userCredentials = httpRequest.body;
      const user_id = httpRequest.params.id;

      // Usecase
      const result = await resetPasswordUC(userCredentials, user_id);
      if (result) {
        return {
          headers: {
            "Content-Type": "application/json",
          },
          status: 201,
          body: result, //,"Success!"
        };
      } else {
        return {
          headers: {
            "Content-Type": "application/json",
          },
          status: 400,
          body: result,
        };
      }
    } catch (e) {
      // Catch error
      return {
        headers: {
          "Content-Type": "application/json",
        },
        status: e.status ? e.status : 400,
        body: { errorMsg: e.message },
      };
    }
  };
};
