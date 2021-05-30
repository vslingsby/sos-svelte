<script>
  import { Button, Col, Row } from "sveltestrap";
  import { wealthGrades } from "./wealthgrades.js";
  import WealthBoons from "./wealthboons.svelte";
  import { character } from "../stores.js";
  import currencyUtils from "./currency.js";
  import Assets from "./assets.svelte";
  export let pcpRemaining;
  export let selectedWealth;
  export let usedPCP = 0;

  $: selectedWealthValue = 0;
  $: currentWealth = currencyUtils.currencyToString(selectedWealth.wealth);
  $: selectedWealth = wealthGrades[selectedWealthValue];
  $: usedPCP = selectedWealth.pcp;
  $: currentWealthPoints = selectedWealth.asset;
  $: liquidated = 0;

  $: {
    $character.wealth.socialClass = selectedWealth.name;
    $character.wealth.money = getTotalWealth();
  }

  function getTotalWealth() {
    let wealth = [];
    wealth[0] = selectedWealth.wealth[0];
    wealth[1] = selectedWealth.wealth[1];
    wealth[2] = selectedWealth.wealth[2];
    wealth[0] += liquidated * 6;
    console.log(wealth)
    return wealth;
  }

  let visible = false;
</script>

<Row>
  <Col>
    <h2>Wealth and Social Class</h2>
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
  <select bind:value={selectedWealthValue}>
    {#each wealthGrades as grade, i}
      <option value={i}>{grade.name}</option>
    {/each}
  </select>
  <p>Currency: {currentWealth}, Wealth Points: {currentWealthPoints}</p>
  <h4>Benefits</h4>
  <WealthBoons {selectedWealth} />

  {#if selectedWealth.asset > 0}
    <Assets {currentWealthPoints} bind:liquidated={liquidated} />
  {/if}


{/if}
