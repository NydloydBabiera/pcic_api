module.exports = function updateTransaction({ updateTransactionUC }) {
  return async function post(httpRequest) {
    try {
      const transData = httpRequest.body;
      const transaction_id = httpRequest.params.id;

      transData.trans_header.transaction_id = transaction_id;

      // Usecase
      const result = await updateTransactionUC(transData);
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
