function convertSaint(countyName) {
  if (countyName.startsWith("Saint")) {
    return "St." + countyName.slice(5);
  }
}

function toTitleCase(str) {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function processString(string) {
  return convertSaint(toTitleCase(string));
}

module.exports = processString;
