module.exports = function transactionEntry() {
  return function checkEntries(transData) {
    const {
      payor,
      product,
      amount,
      payment_type,
      check_no,
      transaction_date,
      user_id,
      bank_code,
    } = transData.trans_header;

    if (!payor) {
      throw new Error("Payor is empty");
    }
    if (amount == 0 || amount < 0) {
      throw new Error("Amount must be greater than zero (0)");
    }
    if (!amount) {
      throw new Error("Amount is empty");
    }
    if (!payment_type) {
      throw new Error("No payment type selected");
    }
    if (payment_type === "CHECK") {
      if (!check_no) {
        throw new Error("Check number is empty");
      }
      if (!bank_code) {
        throw new Error("Select bank code");
      }
    }
    if (!user_id) {
      throw new Error("No cashier logged in");
    }
    // if (
    //   chkSpecialChar(firstName) ||
    //   chkSpecialChar(middleName) ||
    //   chkSpecialChar(lastName)
    // ) {
    //   throw new Error(
    //     "Special characters are not allowed on names (e.g .,!,<>,(),@)"sige2 maam

    //   );
    // }

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
