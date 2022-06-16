const MIN_LENGTH = 48;
const ARRECADATION_PREFIX_NUMBER = "8";
class BarcodeService {
  validateBarcode(barcode) {
    /**
     * verify if the barcode is numberic and size is valid
     */
    if (isNaN(barcode))
      return { message: "Barcode is not a number", status: false };
    else if (barcode.length < MIN_LENGTH)
      return { message: "Barcode is not size valid", status: false };

    /**
     * checkt type of ticket
     */
    const isTitleTicket =
      barcode[0] !== ARRECADATION_PREFIX_NUMBER ? true : false;

    /**
     * checkt dv's
     */
    if (isTitleTicket) {
      var dvsTicket = [false, false, false];

      var firstField = barcode.substring(0, 9);
      let count = 0;
      firstField.split("").forEach((element, index) => {
        if (index % 2 == 0) {
          let el = String(parseInt(element) * 2);
          el.length < 2
            ? (count = count + parseInt(el))
            : (count = count + parseInt(el[0]) + parseInt(el[1]));
        } else count = count + parseInt(element);
      });
      let firstDigitDvSum = String(count)[0];
      parseInt(firstDigitDvSum + "0") + 10 - count == barcode.substring(9, 10)
        ? (dvsTicket[0] = true)
        : false;

      if (dvsTicket.some((dv) => dv === false))
        return { message: "Barcode is not valid", status: false };
    }
    return { message: "Barcode is a number", status: true };
  }
}

module.exports = BarcodeService;
