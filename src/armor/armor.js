const locationsUtils = require('./hitlocations.js');

function coverageToString(coverage) {
  let fullString = "";
  coverage.forEach((coverageLocation, i) => {
    let locationString = coverageLocation.location;
    locationString =
      locationString[0].toUpperCase() + locationString.substring(1);

    if (
      coverageLocation.special.filter(
        (special) => special.type === "ThrustOnly"
      ).length > 0
    ) {
      //thonly
      locationString += "(TH)";
    }

    if (
      coverageLocation.special.filter((special) => special.type === "HalfAV")
        .length > 0
    ) {
      //halfAV
      locationString += "½";
    }

    if (
      coverageLocation.special.filter((special) => special.type === "WP")
        .length > 0
    ) {
      locationString += "‡";
    }
    if (i < coverage.length - 1) {
      locationString += ", ";
    }
    fullString += locationString;
  });
  return fullString;
}

function qualitiesToString(qualities) {
  let fullString = "";
  qualities.forEach((quality, i) => {
    let qualityString = quality.name;
    if (quality.hasOwnProperty("level")) {
      qualityString += " " + quality.level;
    }
    if (i < qualities.length - 1) {
      qualityString += ", ";
    }
    fullString += qualityString;
  });
  return fullString;
}

module.exports.qualitiesToString = qualitiesToString;
module.exports.coverageToString = coverageToString;
