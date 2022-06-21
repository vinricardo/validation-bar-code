module.exports.refactorDigitableLine = (code) => {
    dvsPosition = [9,20,31]; 
    arrayCodeBar = Array.from(code)
    dvsPosition.forEach((position) => {
        arrayCodeBar[position] = "";
    });
    code = arrayCodeBar.join("")
    let moreInfosPart = code.substring(30,44);
    let verificationDigit = code.substring(29,30)
    let lastInfosPart = code.substring(4,29)
    code = code.substring(0,4) + moreInfosPart + lastInfosPart
    return {code,verificationDigit}
}