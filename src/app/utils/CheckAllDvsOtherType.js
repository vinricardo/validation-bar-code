module.exports.checkAllDvsOtherType = (barcode) => {
    var dvsCheck = [false, false, false, false];
    let interval = [
      { start: 0, end: 11 },
      { start: 12, end: 23 },
      { start: 24, end: 35 },
      { start: 36, end: 47 },
    ];

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
    if(dvsCheck.some(value => !value))
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
            let diff =
                count % 10 == 0
                ? 0
                : count % 10 == 10
                ? 1
                : 10 - (count % 10);
            diff == barcode.substring(end, end + 1) ? (dvsCheck[i] = true) : false;
        });
     /** */
    return dvsCheck;
  }