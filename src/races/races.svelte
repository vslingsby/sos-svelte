<script>
  import { Button, Col, Row } from "sveltestrap";
  import { character } from "../stores.js";

  import { races } from "./racelist.js";
  export let pcpRemaining;
  export let selectedRace;
  $: selectedRaceValue = "";
  $: selectedRace = getRaceByName(selectedRaceValue);
  $: {
    $character.race = selectedRace.name;
  }

  const racePCPCosts = [1, 2, 4, 6, 8];

  function getRaceByName(name) {
    races.forEach((race) => {
      if (race.name === name) {
        selectedRace = race;
      }
    });
    if (selectedRace.name) {
      return selectedRace;
    } else return races[0];
  }
  function getRacePCP(input) {
    let tier = input.tier;
    return racePCPCosts[tier - 1];
  }
  export let usedPCP;
  $: usedPCP = getRacePCP(selectedRace);

  function sortRacesByTier(races) {
    let maxTier = 0;
    let groups = [];
    races.forEach((race) => {
      if (race.tier > maxTier) {
        maxTier = race.tier;
      }
    });

    for (let n = 0; n < maxTier; n++) {
      groups[n] = [];
      races.forEach((race) => {
        if (race.tier == n + 1) {
          groups[n].push(race);
        }
      });
    }
    return groups;
  }
</script>

<h2>Races</h2>
<select bind:value={selectedRaceValue}>
  {#each sortRacesByTier(races) as group, n}
    <optgroup label="Tier {n + 1}">
      {#each group as race}
        <option value={race.name}>{race.name}</option>
      {/each}
    </optgroup>
  {/each}
</select>
<p>Tier: {selectedRace.tier}</p>
<p>Characteristics</p>

<div class="row justify-content-md-center">
  {#each selectedRace.characteristics as characteristic}
    <div class="col-sm-4">
      <p><strong>{characteristic.name}</strong></p>
      <p>{characteristic.description}</p>
    </div>
  {/each}
</div>
<p><strong>Attribute Modifiers:</strong></p>
{#each selectedRace.attributeMods.filter((mod) => mod.value != 0) as mod}
  <p>
    {mod.name}:
    {#if mod.value > 0}+{/if}{mod.value}
  </p>
{:else}
  <Col>
    <p>N/A</p>
  </Col>
{/each}
<p>Cost {usedPCP}</p>
