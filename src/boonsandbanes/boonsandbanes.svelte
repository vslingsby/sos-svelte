<script>
  import { Button, Col, Row, Popover } from "sveltestrap";
  import { boonList } from "./boonlist.js";
  import { character } from "../stores.js";
  import NewBoons from "./newbanes.svelte";

  const bnbPoints = [-15, -10, -5, 0, 5, 10, 15, 20, 25, 30];
  const baneLimit = -30;
  function getBoonPoints(input) {
    if (input.length == 0) {
      return 0;
    }
    let sum = 0;
    let baneSum = 0;
    input
      .filter((boon) => getBoonCost(boon) < 0)
      .forEach((bane) => {
        baneSum += getBoonCost(bane);
      });
    if (baneSum < -baneLimit) {
      baneSum = -baneLimit;
    }

    input
      .filter((boon) => getBoonCost(boon) > 0)
      .forEach((boon) => {
        sum += getBoonCost(boon);
      });
    return sum + baneSum;
  }

  function getUsedPCP(input) {
    let sum = getBoonPoints(input);
    if (sum < bnbPoints[0]) {
      return 0;
    }
    for (let n = 0; n < bnbPoints.length; n++) {
      if (n < bnbPoints.length - 1) {
        if (sum == bnbPoints[n+1]) {
          return n+2;
        } else if (sum > bnbPoints[n] && sum <= bnbPoints[n + 1]) {
          return n + 2;
        }
      }
      if (sum == bnbPoints[n]) {
        return n + 1;
      }
    }
  }

  function getBoonCost(boon) {
    return boonList.filter((listBoon) => listBoon.name === boon.name)[0].cost[
      boon.level - 1
    ];
  }

  function getBoonDescription(name, level) {
    let listBoon = boonList.filter((listBoon) => listBoon.name === name)[0];
    if (listBoon.cost.length === 1) {
      return listBoon.description[0];
    } else return listBoon.description[level];
  }

  function getSelectedCostHTML(boon) {
    let listBoon = boonList.filter(
      (listBoon) => listBoon.name === boon.name
    )[0];
    let string = " (";
    for (let n = 0; n < listBoon.cost.length; n++) {
      if (n === boon.level - 1) {
        string += "<strong>" + listBoon.cost[n] + "</strong>";
      } else string += listBoon.cost[n];
      if (n != listBoon.cost.length - 1) {
        string += "/";
      } else string += ")";
    }
    return string;
  }

  function addBoon(i) {
    let boon = $character.boonsAndBanes[i];
    let listBoon = boonList.filter(
      (listBoon) => listBoon.name === boon.name
    )[0];
    if (boon.level < listBoon.cost.length) {
      boon.level++;
    }
    $character = $character;
  }

  function removeBoon(i) {
    let boon = $character.boonsAndBanes[i];
    if (boon.level > 1) {
      boon.level--;
    } else $character.boonsAndBanes.splice(i, 1);
    $character = $character;
  }

  export let usedPCP;
  let visible = false;
  $: usedPCP = getUsedPCP($character.boonsAndBanes);
  $: addNewBoon = false;
</script>

<Row>
  <Col>
    <h2 id='BnBTitle'>Boons and Banes</h2>
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
  <p>Used PCP: {usedPCP}</p>
  <p>Used BnB Points: {getBoonPoints($character.boonsAndBanes)}</p>
  {#each $character.boonsAndBanes as boon, i}
    <Row>
      <Col>
        <p id={boon.name.replace(/\s/g,'') + i}> <!-- remove spaces from string or else popover breaks -->
          <strong>{boon.name}</strong>
          {@html getSelectedCostHTML(boon)}
        </p>
        <Popover trigger="hover" target={boon.name.replace(/\s/g,'') + i} title={boon.name}>
          {getBoonDescription(boon.name, boon.level)}
        </Popover>
      </Col>

      <Col>
        <Button
          on:click={() => {
            addBoon(i);
          }}>
          +
        </Button>
        <Button
          on:click={() => {
            removeBoon(i);
          }}>
          -
        </Button>
      </Col>
    </Row>
  {/each}
  {#if addNewBoon}
    <hr />
    <Row>
      <NewBoons bind:addNewBoon />
    </Row>
  {:else}
    <Button
      on:click={() => {
        addNewBoon = true;
      }}>
      Add New Boon/Bane
    </Button>
  {/if}
{/if}
