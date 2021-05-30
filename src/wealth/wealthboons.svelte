<script>
import { Button, Col, Row } from "sveltestrap";
import { character } from "../stores.js";
  export let selectedWealth;

  $: selectedBoonOptions = [];
  $: selectedBoons = [];
  $: selectedWealth = selectedWealth;
  $: {
    for (let n = 0; n < selectedBoonOptions.length; n++) {
      if (selectedWealth.benefits.options.indexOf(selectedBoonOptions[n]) === -1) {
        selectedBoonOptions[n] = selectedWealth.benefits.options[n];
      }
    }

    if (selectedBoonOptions.length > selectedWealth.benefits.pick) {
      selectedBoonOptions = selectedBoonOptions.slice(0,selectedWealth.benefits.pick)
    }

  }

  function hasBeenPicked(name) {
    let picked = false;
    for( let n = 0; n < selectedWealth.benefits.pick; n++) {
      if (selectedBoonOptions[n] === name) {
        picked = true;
      }
    }
    return picked;
    selectedBoons = selectedBoons;
  }

  function getSelectedBoons() {
    let boons = [];
    boons = selectedBoonOptions;
    return boons;
  }

  $: {
    selectedBoons = getSelectedBoons();
    $character.wealth.benefits = selectedBoons;
  }
</script>

{#each new Array(selectedWealth.benefits.pick) as choice, i}
<Row>
<Col>
  <select bind:value={selectedBoonOptions[i]}>
    {#each selectedWealth.benefits.options as boonOption, n}
    {#if n === i}
      <option value={boonOption} disabled={hasBeenPicked(boonOption)} selected>{boonOption}</option>
      {:else}
      <option value={boonOption} disabled={hasBeenPicked(boonOption)}>{boonOption}</option>
      {/if}
    {/each}
  </select>
  </Col>
  </Row>
  {#if i < selectedWealth.benefits.pick}
    <br />
  {/if}
{/each}
