const express = require("express");
const BarcodeController = require("./controllers/BarcodeController");
const app = express();

app.get("/boleto/:barcode", (req, res) =>
  new BarcodeController().validateBarcode(req, res)
);

app.listen(3000);
