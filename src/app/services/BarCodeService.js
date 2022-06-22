const { checkAllDvs } = require("../utils/CheckAllDvs");
const { checkAllDvsOtherType } = require("../utils/CheckAllDvsOtherType");
const { refactorDigitableLine } = require("../utils/RefactorDigitableLine");

const MIN_LENGTH = 47;
const ARRECADATION_PREFIX_NUMBER = "8";
class BarCodeService {
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
      barcode[0] !== ARRECADATION_PREFIX_NUMBER && barcode.length == MIN_LENGTH
        ? true
        : false;

    /**
     * checkt dv's
     */
    if (isTitleTicket) {
      if (checkAllDvs(barcode).some((dv) => dv === false)) {
        response.message = "Código de barras inválido";
        return response;
      }

      // After 22.02.2025, set fixed date to 29.05.2022
      let diff =
        new Date(barcode.substring(33, 37) * (1000 * 60 * 60 * 24)).getTime() +
        new Date(this.verifyFixedDate()).getTime();

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
      response.barCode = refactorDigitableLine(barcode,true).code
    } else {
      if (checkAllDvsOtherType(barcode).some((dv) => dv === false)) {
        response.message = "Código de barras inválido";
        return response;
      }
      let amount = (
        parseInt(barcode.substring(4, 11) + barcode.substring(12, 16)) / 100
      ).toFixed(2);
      response.amount = amount;
      response.barCode = refactorDigitableLine(barcode,false).code
    }

    response = {
      ...response,
      message: "Código de barras validado com sucesso",
      status: 200,
    };
    return response;
  }

  verifyFixedDate() {
    let diff = new Date().getTime() - new Date("2025-02-22").getTime();
    return diff < 0 ? "1997-10-07" : "2022-05-29";
  }

}

module.exports = BarCodeService;
