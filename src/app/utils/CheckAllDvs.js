const { refactorDigitableLine } = require("./RefactorDigitableLine");

module.exports.checkAllDvs = (barcode) => {
    var dvsTicket = [false, false, false];
    let interval = [
      { start: 0, end: 9 },
      { start: 10, end: 20 },
      { start: 21, end: 31 },
    ];
    
    /** check main DV */
    let refactBarCode = refactorDigitableLine(barcode, true)
    let arrayBarCode = Array.from(refactBarCode.validCode);

    let mainCountDv = 0;
    let multMainDV = 2;
    arrayBarCode.reverse().forEach((value) => {
      mainCountDv = mainCountDv + (multMainDV * value);
      if (multMainDV == 9) multMainDV = 2;
      else multMainDV++;
    });
    let mainDv = 11 - (mainCountDv % 11);
    if (mainDv == 0 || mainDv == 10 || mainDv == 11) mainDv = 1;
    if (mainDv != parseInt(refactBarCode.verificationDigit)) return dvsTicket;
    /** */

    /** check parts DV */
    interval.forEach(({ start, end }, i) => {
      var firstField = barcode.substring(start, end);
      let count = 0;
      firstField.split("").reverse().forEach((element, index) => {
          if (index % 2 == 0) {
            let el = String(parseInt(element) * 2);
            el.length < 2
              ? (count = count + parseInt(el))
              : (count = count + parseInt(el[0]) + parseInt(el[1]));
          } else count = count + parseInt(element);
      });
      let firstDigitDvSum = String(count)[0];
      parseInt(firstDigitDvSum + "0") + 10 - count ==
      barcode.substring(end, end + 1)
        ? (dvsTicket[i] = true)
        : false;
    });
    /** */
    return dvsTicket;
  }