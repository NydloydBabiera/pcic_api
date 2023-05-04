module.exports = function queuingGenerator({ listQueueUC }) {
  return async function post(httpRequest) {
    try {
      const queue_id = httpRequest.params.id;
      const winTransData = httpRequest.body;

      // Usecase
      const result = await listQueueUC(queue_id, winTransData);
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
