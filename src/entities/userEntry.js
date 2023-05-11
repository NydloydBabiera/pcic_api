module.exports = function userEntry() {
  return function checkUser(userData) {
    const { firstName, middleName, lastName } = userData;

    if (!firstName) {
      throw new Error("First name is Required");
    }
    if (!middleName) {
      throw new Error("Middle name is Required");
    }
    if (!lastName) {
      throw new Error("Last name is Required");
    }
    if (
      chkSpecialChar(firstName) ||
      chkSpecialChar(middleName) ||
      chkSpecialChar(lastName)
    ) {
      throw new Error(
        "Special characters are not allowed on names (e.g .,!,<>,(),@)"
      );
    }

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
