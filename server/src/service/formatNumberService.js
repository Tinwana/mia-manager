function formatNumber(number) {
  let numberString = number.toString();

  if (numberString.length < 6) {
    while (numberString.length < 6) {
      numberString = "0" + numberString;
    }
  }
  if (numberString.length < 8) {
    while (numberString.length < 8) {
      const randomChar = String.fromCharCode(
        97 + Math.floor(Math.random() * 26)
      );
      numberString += randomChar;
    }
  }

  return numberString;
}
module.exports = formatNumber;
