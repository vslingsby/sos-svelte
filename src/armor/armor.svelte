<script>
import { armorList } from './armorlist.js'
import { Button, Col, Row } from "sveltestrap";
import currencyUtils from "../wealth/currency.js"
let search = '';

function coverageToString(coverage) {
  let fullString = '';
  coverage.forEach( (coverageLocation, i) => {
    let locationString = coverageLocation.location;
    locationString = locationString[0].toUpperCase() + locationString.substring(1);

    if (coverageLocation.special.filter(special => special.type === "ThrustOnly").length > 0) {//thonly
      locationString += '(TH)'
    }

    if (coverageLocation.special.filter(special => special.type === "HalfAV").length > 0){ //halfAV
      locationString += '½';
    }

    if (coverageLocation.special.filter(special => special.type === "WP").length > 0) {
      locationString += '‡';
    }
    if (i < coverage.length - 1) {
      locationString += ', ';
    }
    fullString += locationString;
  })
  return fullString;
}

function qualitiesToString(qualities) {
  let fullString = '';
  qualities.forEach( (quality, i) => {
    let qualityString = quality.name;
    if (quality.hasOwnProperty('level')) {
      qualityString += ' ' + quality.level;
    }
    if (i < qualities.length - 1) {
      qualityString += ', ';
    }
    fullString += qualityString;
  })
  return fullString;
}
</script>

<input bind:value={search} />
{#each armorList.filter(armor => armor.name.toLowerCase().search(search) != -1) as armor}
<Row>
  <Col>
  <p>{armor.name}</p>
  </Col>
  <Col>
  <p>AV (C/P/B): {armor.avc}/{armor.avp}/{armor.avb}</p>
  </Col>
  <Col>
    <p>{coverageToString(armor.coverage)}<p>
  </Col>
  <Col>
  <p>{qualitiesToString(armor.qualities)}</p>
  </Col>
  <Col>
  <p>{currencyUtils.currencyToString(armor.cost)}</p>
  </Col>
</Row>
{/each}
