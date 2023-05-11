module.exports = function processtTransaction({ processTransUC }) {
  return async function post(httpRequest) {
    try {
      const transData = httpRequest.body;

      // Usecase
      const result = await processTransUC(transData);
      if (result) {
        return {
          headers: {
            "Content-Type": "application/json",
          },
          status: 201,
          body: result.rows, //,"Success!"
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
