<script>
import { Button, Col, Row } from "sveltestrap";
import { character } from "../stores.js"

export let maxManeuvers;
let selectedManeuvers = [];

$: {
  if ($character.schools.length > 0) {
  $character.schools[$character.schools.length - 1].superiorManeuvers = selectedManeuvers;
  }
}
</script>

<h3>Superior Maneuvers</h3>
{#each new Array(maxManeuvers) as choice, i}
<Row>
<Col>
  <input type="text" bind:value={selectedManeuvers[i]} />
  </Col>
  </Row>
{/each}
