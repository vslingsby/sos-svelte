<script>
import { wealthGrades } from './wealthgrades.js'
import WealthBoons from './wealthboons.svelte'
import { character } from "../stores.js";
import currencyUtils from "./currency.js"
import Assets from "./assets.svelte"
export let pcpRemaining;
export let selectedWealth;
export let usedPCP = 0;

$: selectedWealthValue = 0;
$: currentWealth = (currencyUtils.currencyToString(selectedWealth.wealth));
$: (selectedWealth = wealthGrades[selectedWealthValue])
$: (usedPCP = selectedWealth.pcp)
$: currentWealthPoints = selectedWealth.asset

$: {
  $character.wealth.socialClass = selectedWealth.name;
  $character.wealth.money = selectedWealth.wealth;
}

</script>
<h2>Wealth and Social Class</h2>
<p>Used PCP: {usedPCP}</p>
<select bind:value={selectedWealthValue}>
{#each wealthGrades as grade, i}
<option value={i}>{grade.name}</option>
{/each}
</select>
<p>
Currency: {currentWealth}, Wealth Points: {currentWealthPoints}
</p>
<WealthBoons {selectedWealth} />

{#if selectedWealth.asset > 0}
<Assets {currentWealthPoints} />
{/if}
