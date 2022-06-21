const BarCodeService = require("../services/BarCodeService");

const service = new BarCodeService();
class BarCodeController {
  constructor() {}

  validateBarcode(req, res) {
    let check = service.validateBarcode(req.params.barcode);
    return res.status(check.status).json(check);
  }
}

module.exports = BarCodeController;
