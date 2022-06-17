const MIN_LENGTH = 47;
const ARRECADATION_PREFIX_NUMBER = "8";
class BarcodeService {
  validateBarcode(barcode) {
    let response = { message: "", status: 400 };
    /**
     * verify if the barcode is numberic and size is valid
     */
    if (isNaN(barcode)) {
      response.message = "Código de barras inválido";
      return response;
    } else if (barcode.length < MIN_LENGTH) {
      response.message = "Código de barras com tamanho inválido";
      return response;
    }
    /**
     * checkt type of ticket
     */
    const isTitleTicket =
      barcode[0] !== ARRECADATION_PREFIX_NUMBER ? true : false;

    /**
     * checkt dv's
     */
    if (isTitleTicket) {
      if (this.#checkAllDvs(barcode).some((dv) => dv === false)) {
        response.message = "Código de barras inválido";
        return response;
      }

      // After 22.02.2025, set fixed date to 29.05.2022
      let diff =
        new Date(barcode.substring(33, 37) * (1000 * 60 * 60 * 24)).getTime() +
        new Date(this.#verifyFixedDate()).getTime();

      let expirationDate = new Date(diff)
        .toISOString()
        .split("T")[0]
        .split("-");
      response.expirationDate = new Date(
        expirationDate[0],
        expirationDate[1] - 1,
        expirationDate[2]
      ).toLocaleDateString();

      response.amount = (parseInt(barcode.substring(37, 48)) / 100).toFixed(2);
    }

    response = {
      ...response,
      barCode: barcode,
      message: "Código de barras validado com sucesso",
      status: 200,
    };
    return response;
  }

  #checkAllDvs(barcode) {
    var dvsTicket = [false, false, false];
    let interval = [
      { start: 0, end: 9 },
      { start: 10, end: 20 },
      { start: 21, end: 31 },
    ];

    interval.forEach(({ start, end }, i) => {
      var firstField = barcode.substring(start, end);
      let count = 0;
      firstField.split("").forEach((element, index) => {
        if (i == 0) {
          if (index % 2 == 0) {
            let el = String(parseInt(element) * 2);
            el.length < 2
              ? (count = count + parseInt(el))
              : (count = count + parseInt(el[0]) + parseInt(el[1]));
          } else count = count + parseInt(element);
        } else {
          if (index % 2 != 0) {
            let el = String(parseInt(element) * 2);
            el.length < 2
              ? (count = count + parseInt(el))
              : (count = count + parseInt(el[0]) + parseInt(el[1]));
          } else count = count + parseInt(element);
        }
      });
      let firstDigitDvSum = String(count)[0];
      parseInt(firstDigitDvSum + "0") + 10 - count ==
      barcode.substring(end, end + 1)
        ? (dvsTicket[i] = true)
        : false;
    });
    return dvsTicket;
  }

  #verifyFixedDate() {
    let diff = new Date().getTime() - new Date("2025-02-22").getTime();
    return diff < 0 ? "1997-10-07" : "2022-05-29";
  }
}

module.exports = BarcodeService;
