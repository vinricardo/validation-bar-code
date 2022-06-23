const { refactorDigitableLine } = require("./RefactorDigitableLine");

module.exports.checkAllDvsOtherType = (barcode) => {
  var dvsCheck = [false, false, false, false];
  let interval = [
    { start: 0, end: 11 },
    { start: 12, end: 23 },
    { start: 24, end: 35 },
    { start: 36, end: 47 },
  ];

  let refactBarCode = refactorDigitableLine(barcode, false);
  let arrayBarCode = Array.from(refactBarCode.validCode);

  /** check main dv */
  let mainCountDv = 0;
  let multMainDV = 2;
  var goToOtherMainCheck = false;

  arrayBarCode.reverse().forEach((value) => {
    mainCountDv = mainCountDv + multMainDV * value;
    if (multMainDV == 9) multMainDV = 2;
    else multMainDV++;
  });
  let mainDv = 11 - (mainCountDv % 11);
  if (mainDv == 0 || mainDv == 10 || mainDv == 11) mainDv = 1;
  if (mainDv != parseInt(refactBarCode.verificationDigit)) {
    goToOtherMainCheck = true;
  }

  if (goToOtherMainCheck) {
    mainCountDv = 0;
    arrayBarCode.forEach((value, index) => {
      if (index % 2 == 0) {
        let el = String(parseInt(value) * 2);
        el.length < 2
          ? (mainCountDv = mainCountDv + parseInt(value))
          : (mainCountDv = mainCountDv + parseInt(el[0]) + parseInt(el[1]));
      } else mainCountDv = mainCountDv + parseInt(value);
    });
    mainDv =
      mainCountDv % 10 == 0
        ? 0
        : mainCountDv % 10 == 10
        ? 1
        : 10 - (mainCountDv % 10);
    if (mainDv != parseInt(refactBarCode.verificationDigit)) return dvsCheck;
  }
  /** */

  /** check parts DV with 10 and 11 module */
  let x = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  interval.forEach(({ start, end }, i) => {
    let count = 0;
    barcode
      .substring(start, end)
      .split("")
      .forEach(
        (number, index) => (count = count + parseInt(number) * x[index])
      );
    let diff =
      count % 11 == 0 || count % 11 == 1
        ? 0
        : count % 11 == 10
        ? 1
        : 11 - (count % 11);
    diff == barcode.substring(end, end + 1) ? (dvsCheck[i] = true) : false;
  });
  if (dvsCheck.some((value) => !value))
    interval.forEach(({ start, end }, i) => {
      var firstField = barcode.substring(start, end);
      let count = 0;
      firstField.split("").forEach((element, index) => {
        if (index % 2 == 0) {
          let el = String(parseInt(element) * 2);
          el.length < 2
            ? (count = count + parseInt(el))
            : (count = count + parseInt(el[0]) + parseInt(el[1]));
        } else count = count + parseInt(element);
      });
      let diff = count % 10 == 0 ? 0 : count % 10 == 10 ? 1 : 10 - (count % 10);
      diff == barcode.substring(end, end + 1) ? (dvsCheck[i] = true) : false;
    });
  /** */

  return dvsCheck;
};
