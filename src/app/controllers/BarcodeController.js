const BarcodeService = require("../services/BarCodeService");

const service = new BarcodeService();
class BarcodeController {
  constructor() {}
  validateBarcode(req, res) {
    let check = service.validateBarcode(req.params.barcode);
    return res.status(check.status).json(check);
  }
}

module.exports = BarcodeController;
