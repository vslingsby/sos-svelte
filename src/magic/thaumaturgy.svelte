<script>
  import { Button, Col, Row } from "sveltestrap";
  import { character } from "../stores.js";

  const credibilityPointCosts = [
    0,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    6,
    6,
    6,
    6,
    8,
    10,
    10,
    20,
  ];

  $: ego = 1;

  $: credibility = 1;


  function updateVars() {
    ego = $character
      .getTotalAttributes($character.baseAttributes, $character.race)
      .filter((attr) => attr.name === "Willpower")[0].value;
    ego += $character
      .getTotalAttributes($character.baseAttributes, $character.race)
      .filter((attr) => attr.name === "Intelligence")[0].value;
    ego = Math.floor(ego / 2);

    usedPoints = getUsedPoints();
  }
  function addLevel() {
    credibility++;
    updateVars();
  }

  function removeLevel() {
    if (credibility > 1) {
      credibility--;
    }
    updateVars()
  }

  function getUsedPoints() {
    let sum = 0;
    for (let n = 0; n < credibility; n++) {
      sum += credibilityPointCosts[n];
    }
    return sum;
  }

  export let usedPoints = 0;
  $: {
    updateVars();
  }
</script>

<Row>
  <Col>
    <h3>Thaumaturgy</h3>
  </Col>
</Row>
<Row>
<Col>
  <p>Used Points: {usedPoints}</p>
</Col>
</Row>
<Row>
  <Col>
    <p>Ego: {ego}</p>
  </Col>
  <Col>
    <p>Credibility: {credibility}</p>
  </Col>
  <Col>
    <p>Pull: {credibility > 0 ? ego + credibility : 0}</p>
  </Col>
</Row>
<Row>
  <Col>
    <Button on:click={addLevel}>+</Button>
    <Button on:click={removeLevel}>-</Button>
  </Col>
</Row>
