const express = require("express");
const BarCodeController = require("./controllers/BarCodeController");
const app = express();

app.get("/boleto/:barcode", (req, res) =>
  new BarCodeController().validateBarcode(req, res)
);

app.listen(80);
