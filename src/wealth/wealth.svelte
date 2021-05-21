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

  $: {
    $character.wealth.socialClass = selectedWealth.name;
    $character.wealth.money = selectedWealth.wealth;
  }

  let visible = false;
</script>

<Row>
  <Col>
    <h2>Wealth and Social Class</h2>
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
  <select bind:value={selectedWealthValue}>
    {#each wealthGrades as grade, i}
      <option value={i}>{grade.name}</option>
    {/each}
  </select>
  <p>Currency: {currentWealth}, Wealth Points: {currentWealthPoints}</p>
  <WealthBoons {selectedWealth} />

  {#if selectedWealth.asset > 0}
    <Assets {currentWealthPoints} />
  {/if}
{/if}
