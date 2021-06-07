<script>
import { Button, Col, Row } from 'sveltestrap';
import Pyromancy from './pyromancy.svelte';
import Sorcery from './sorcery.svelte';
import Thaumaturgy from './thaumaturgy.svelte';

const pcpToPoints = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27];

function getUsedPCP() {
  let sum = getUsedPoints();
  sum += pyromancyPoints;
  sum += sorceryPoints;
  sum += thaumaturgyPoints;
  let pcp = -1;

  for (let n = 0; n < pcpToPoints.length; n++) {
    if (n < pcpToPoints.length - 1) {
      if (sum > pcpToPoints[n] && sum <= pcpToPoints[n + 1]) {
        pcp = n + 1;
      }
    }
    if (sum == pcpToPoints[n]) {
      pcp = n;
    }
  }
  return pcp;
}

function addType(type) {
  if (type === 'Pyromancy') {
    pyromancy = true;
  }
  if (type === 'Sorcery') {
    sorcery = true;
  }
  if (type === 'Thaumaturgy') {
    thaumaturgy = true;
  }
  updateVars();
}

function removeType(type) {
  if (type === 'Pyromancy') {
    pyromancy = false;
  }
  if (type === 'Sorcery') {
    sorcery = false;
  }
  if (type === 'Thaumaturgy') {
    thaumaturgy = false;
  }
  updateVars();
}

function getUsedPoints() {
  let sum = 0;

  if (pyromancy) {
    sum += 3;
  }
  if (thaumaturgy) {
    sum += 3;
  }
  if (sorcery) {
    sum += 3;
  }

  return sum;
}

function updateVars() {
  usedPoints = getUsedPoints();
  usedPCP = getUsedPCP();
}

export let usedPCP = 0;
let pyromancy = false;
let sorcery = false;
let thaumaturgy = false;
let visible = false;
$: selectedMagicType = 'Pyromancy';
$: pyromancyPoints = 0;
$: sorceryPoints = 0;
$: thaumaturgyPoints = 0;
$: usedPoints = getUsedPoints();
$: {
  updateVars();
}
</script>
<Row>
  <Col>
    <h2>Magic</h2>
  </Col>
  <Col>
    <h4>{usedPCP} PCP</h4>
  </Col>
  <Col>
    <Button
      on:click={() => {
        visible = !visible;
      }}>
      {#if visible}
        <p>Hide</p>
      {:else}
        <p>Show</p>
      {/if}
    </Button>
  </Col>
</Row>
{#if visible}
  <Row>
  <Col>
    <p>Used Points: {usedPoints + pyromancyPoints + sorceryPoints + thaumaturgyPoints}</p>
  </Col>
  <Col>
    <Button on:click={updateVars}>Update PCP</Button>
  </Col>
  </Row>
  <Row>
      <Col>
        <select bind:value={selectedMagicType}>
          <option value='Pyromancy'>Pyromancy</option>
          <option value='Sorcery'>Sorcery</option>
          <option value='Thaumaturgy'>Thaumaturgy</option>
      </select>
      <Button on:click={addType(selectedMagicType)}>+</Button>
      <Button on:click={removeType(selectedMagicType)}>-</Button>
      </Col>
  </Row>
  {#if pyromancy}
  <Row>
    <Col>
      <Pyromancy bind:usedPoints={pyromancyPoints}  />
    </Col>
  </Row>
  {/if}
  {#if sorcery}
  <Row>
    <Col>
      <Sorcery  bind:usedPoints={sorceryPoints}/>
    </Col>
  </Row>
  {/if}
  {#if thaumaturgy}
  <Row>
    <Col>
      <Thaumaturgy bind:usedPoints={thaumaturgyPoints}/>
    </Col>
  </Row>
  {/if}
{/if}
