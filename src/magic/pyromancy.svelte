<script>
  import { Button, Col, Row } from "sveltestrap";
  import { character } from "../stores.js";

  const kindlingPointCosts = [
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

  $: lustre = 1;

  $: kindling = 1;


  function updateVars() {
    lustre = $character
      .getTotalAttributes($character.baseAttributes, $character.race)
      .filter((attr) => attr.name === "Willpower")[0].value;
    lustre += $character
      .getTotalAttributes($character.baseAttributes, $character.race)
      .filter((attr) => attr.name === "Health")[0].value;
    lustre = Math.floor(lustre / 2);

    usedPoints = getUsedPoints();
  }
  function addLevel() {
    kindling++;
    updateVars();
  }

  function removeLevel() {
    if (kindling > 1) {
      kindling--;
    }
    updateVars()
  }

  function getUsedPoints() {
    let sum = 0;
    for (let n = 0; n < kindling; n++) {
      sum += kindlingPointCosts[n];
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
    <h3>Pyromancy</h3>
  </Col>
</Row>
<Row>
<Col>
  <p>Used Points: {usedPoints}</p>
</Col>
</Row>
<Row>
  <Col>
    <p>Lustre: {lustre}</p>
  </Col>
  <Col>
    <p>Kindling: {kindling}</p>
  </Col>
  <Col>
    <p>Fire Pool: {kindling > 0 ? lustre + kindling : 0}</p>
  </Col>
</Row>
<Row>
  <Col>
    <Button on:click={addLevel}>+</Button>
    <Button on:click={removeLevel}>-</Button>
  </Col>
</Row>
