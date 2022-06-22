module.exports.refactorDigitableLine = (code, isBank) => {
  dvsPosition = isBank ? [9, 20, 31] : [11, 23, 35, 47];
  arrayCodeBar = Array.from(code);
  dvsPosition.forEach((position) => {
    arrayCodeBar[position] = "";
  });

  code = arrayCodeBar.join("");

  if (isBank) {
    let moreInfosPart = code.substring(30, 44);
    let verificationDigit = code.substring(29, 30);
    let lastInfosPart = code.substring(4, 29);
    let validCode = code.substring(0, 4) + moreInfosPart + lastInfosPart;
    code =
      code.substring(0, 4) + verificationDigit + moreInfosPart + lastInfosPart;

    return { code, verificationDigit, validCode };
  } else {
    let verificationDigit = code.substring(3, 4);
    let firstInfosPart = code.substring(0, 3);
    let lastInfosPart = code.substring(4, 44);
    let validCode = firstInfosPart + lastInfosPart;
    return { code, verificationDigit, validCode };
  }
};
