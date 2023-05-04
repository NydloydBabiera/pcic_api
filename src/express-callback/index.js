module.exports = function makeExpressCallback(controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      // client: req.useragent,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
        Authorization: req.get("Authorization"),
      },
      token: req.token,
      files: req.file,
      SessionId: req.get("Authorization"),
    };

    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.status).send(httpResponse.body);
      })
      .catch((e) => res.status(500).send("An unkown error occurred."));
  };
};
