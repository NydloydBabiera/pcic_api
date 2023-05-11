module.exports = function transactionEntry() {
  return function checkEntries(transData) {
    // const { payor, product, amount } = transData;

    return Object.freeze({
      getHeader: () => header,
      getBody: () => body,
      getDetails: () => details,
    });
  };

  function chkSpecialChar(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/;
    return specialChars.test(str);
  }
};
