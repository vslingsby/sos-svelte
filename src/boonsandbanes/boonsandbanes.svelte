<script>
  import { Button, Col, Row } from "sveltestrap";
  import { boonList } from "./boonlist.js";
  import { character } from "../stores.js";

  const bnbPoints = [-15, -10, -5, 0, 5, 10, 15, 20, 25, 30];

  let boons = boonList; // { name: , level:}
  boons.forEach((boon) => {
    boon.level = 0;
  });

  function getBoonPoints(input) {
    if (input.length == 0) {
      return 0;
    }
    let sum = 0;
    boonList.forEach((boon) => {
      if (boon.level > 0) {
        sum += boon.cost[boon.level - 1];
      }
    });
    return sum;
  }

  function getUsedPCP(input) {
    let sum = getBoonPoints(input);
    if (sum < bnbPoints[0]) {
      return 0;
    }
    for (let n = 0; n < bnbPoints.length; n++) {
      if (n < bnbPoints.length - 1) {
        if (sum >= bnbPoints[n] && sum < bnbPoints[n + 1]) {
          return n + 1;
        }
      } else if (sum == bnbPoints[n]) {
        return n + 1;
      }
    }
  }

  export let usedPCP;
  $: boons;
  $: usedPCP = getUsedPCP(boons);
  $: {
    $character.boonsAndBanes = boons.filter(boon => boon.level > 0);
  }
</script>

<h2>Boones and Banes</h2>
<p>Used PCP: {usedPCP}</p>
<p>Used BnB Points: {getBoonPoints(boons)}</p>
<Row>
  {#each boons as boon (boon.name)}
    <Row>
      <div class="col-sm-2">
        {boon.name} ({#each boon.cost as level, i}{level}{#if i < boon.cost.length - 1}/{/if}{/each})
      </div>
      <Col>
        <p>{boon.description[0]}</p>
      </Col>
      <div class="col-sm-2">
        <input
          type="number"
          bind:value={boon.level}
          min="0"
          max={boon.cost.length} />
      </div>
    </Row>
  {:else}
    <p>Loading</p>
  {/each}
</Row>
