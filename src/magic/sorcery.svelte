<script>
  import { Button, Col, Row } from "sveltestrap";
  import { character } from "../stores.js";

  const disciplinePointCosts = [
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

  $: int = 1;

  $: discipline = 1;


  function updateVars() {
    int = $character
      .getTotalAttributes($character.baseAttributes, $character.race)
      .filter((attr) => attr.name === "Intelligence")[0].value;

    usedPoints = getUsedPoints();
  }
  function addLevel() {
    discipline++;
    updateVars();
  }

  function removeLevel() {
    if (discipline > 1) {
      discipline--;
    }
    updateVars()
  }

  function getUsedPoints() {
    let sum = 0;
    for (let n = 0; n < discipline; n++) {
      sum += disciplinePointCosts[n];
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
    <h3>Sorcery</h3>
  </Col>
</Row>
<Row>
<Col>
  <p>Used Points: {usedPoints}</p>
</Col>
</Row>
<Row>
  <Col>
    <p>Intelligence: {int}</p>
  </Col>
  <Col>
    <p>Discipline: {discipline}</p>
  </Col>
  <Col>
    <p>Flow Capacity: {discipline > 0 ? int + discipline : 0}</p>
  </Col>
</Row>
<Row>
  <Col>
    <Button on:click={addLevel}>+</Button>
    <Button on:click={removeLevel}>-</Button>
  </Col>
</Row>
