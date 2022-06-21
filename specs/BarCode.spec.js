const BarcodeService = require("../src/app/services/BarCodeService");

describe("BARCODE", function () {
  var service;
  beforeEach(function () {
    service = new BarcodeService();
  });

  it("boleto de título válido", function () {
    let checks = service.checkAllDvs(
      "74891120162085892606402289791077689760000017794"
    );
    expect(checks).toEqual([true, true, true]);
  });

  it("boleto de convênio válido", function () {
    let checks = service.checkAllDvsOtherType(
      "838400000022006400384077018604773202016739366730"
    );
    expect(checks).toEqual([true, true, true, true]);
  });

  it("data base em vigência para boleto de título", function () {
    let date = service.verifyFixedDate();
    expect(date).toEqual("1997-10-07");
  });
});
