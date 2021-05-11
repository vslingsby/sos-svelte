<script>
import { wealthGrades } from './wealthgrades.js'
import WealthBoons from './wealthboons.svelte'
export let pcpRemaining;
export let selectedWealth;
export let usedPCP = 0;


function calculateCurrency(Gp,Sp,Cp) {
  let cp = 0;
  Cp = Cp == "" ? 0 : Cp;
  Sp = Sp == "" ? 0 : Sp;
  Gp = Gp == "" ? 0 : Gp;
  cp += parseInt(Cp);
  cp += parseInt(Sp) * 12;
  cp += parseInt(Gp) * 20 * 12;
  let gp = Math.floor(cp / 240);
  cp -= (gp * 240);
  let sp = Math.floor(cp / 12);
  cp -= (sp * 12);
  return [gp, sp, cp];
}

function currencyToString(currency) {
  let string = '';
  if (currency[0] > 0) {
    string += currency[0];
    string += ' Gp';
  }

  if (currency[1] > 0) {
    if (string.length > 0) {
      string += ', ';
    }
    string += currency[1];
    string += ' Sp';
  }

  if (currency[2] > 0) {
    if (string.length > 0) {
      string += ', ';
    }
    string += currency[2];
    string += ' Cp';
  }
  return string;
}

$: selectedWealthValue = 0;
$: currentWealth = (currencyToString(selectedWealth.wealth));
$: (selectedWealth = wealthGrades[selectedWealthValue])
$: (usedPCP = selectedWealth.pcp)
$: currentWealthPoints = selectedWealth.asset

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
