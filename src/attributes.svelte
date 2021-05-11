<script>
import { Button, Col, Row } from 'sveltestrap';
import { character } from './stores.js'

export let pcpRemaining;
export let usedPCP;
export let race;
let attributes = [
  {name: 'Strength', value: 1},
  {name: 'Agility', value: 1},
  {name: 'Endurance', value: 1},
  {name: 'Health', value: 1},
  {name: 'Willpower', value: 1},
  {name: 'Wit', value: 1},
  {name: 'Intelligence', value: 1},
  {name: 'Perception', value: 1},
  {name: 'Magic', value: 0}
]

const attributePCPCosts = [22,23,24,27,31,35,40,45,50,56];
const attributePointCosts = [0,1,2,3,4,5,6,7,8,10,12,14,16];

function getAttributePointsUsed(input) {
  let sum = 0;
  input.forEach((attribute) => {
    if (attribute.name == "Magic") {
      return;
    }
    sum += attributePointCosts[attribute.value-1];
  })
  return sum;
}

function getAttributesPCP(input) {
  let sum = getAttributePointsUsed(input)
  if (sum < attributePCPCosts[0]) {
    return 1;
  }
  for (let n = 0; n < attributePCPCosts.length; n++) {
    if (n < attributePCPCosts.length - 1) {
      if (sum >= attributePCPCosts[n] && sum < attributePCPCosts[n+1]) {
        return n+1;
      }
    } else if (sum == attributePCPCosts[n]) {
      return n+1;
    }
  }
};

function getTotalAttributes(base, race) {
  let totals = JSON.parse(JSON.stringify(base));
  if (race.hasOwnProperty('attributeMods')) {
    race.attributeMods.forEach( mod => {
      totals.forEach( attribute => {
        if (mod.name == attribute.name) {
          attribute.value += mod.value;
        }
      })
    })
  }
  totals.forEach( (attribute) => {
    if (attribute.value > 13) {
      attribute.value = 13;
    }
  })
  return totals;
}

function getAttrByName(name, input) {
  let value = 0;
  input.forEach( (attribute) => {
    if (attribute.name === name) {
      value = attribute.value;
    }
  })
  return value;
}

function getCompounds(totals) {
  let compound = {};
  let compounds = [];
  compound.name = "Adroitness";
  compound.value = getADR(totals);
  compounds.push(compound);
  compound = {};
  compound.name = "Mobility";
  compound.value = getMOB(totals);
  compounds.push(compound);
  compound = {};
  compound.name = "Carry";
  compound.value = getCAR(totals);
  compounds.push(compound);
  compound = {};
  compound.name = "Charisma";
  compound.value = getCHA(totals);
  compounds.push(compound);
  compound = {};
  compound.name = "Toughness";
  compound.value = getTOU(totals);
  compounds.push(compound);
  compound = {};
  compound.name = "Strength Damage Bonus";
  compound.value = getSDB(totals);
  compounds.push(compound);
  compound = {};
  compound.name = "Grit";
  compound.value = getGrit(totals);
  compounds.push(compound);
  return compounds;
}

function getADR(input) {
  return Math.floor((getAttrByName("Agility", input) + getAttrByName("Wit", input)) / 2);
}

function getMOB(input) { //racial modifiers
  return Math.floor((getAttrByName("Strength", input) + getAttrByName("Wit", input) +
  getAttrByName("Endurance", input)) / 2);
}

function getCAR(input) {
  return Math.floor((getAttrByName("Strength", input) + getAttrByName("Endurance", input)));
}

function getCHA(input) {
  return Math.floor((getAttrByName("Willpower", input) + getAttrByName("Wit", input) +
  getAttrByName("Perception", input)) / 2);
}

function getSDB(input) {
  return getAttrByName("Strength", input) * 2;
}

function getTOU(input) { //there are racial modifiers to this
  return 4;
}

function getGrit(input) {
  return Math.floor((getAttrByName("Willpower",input) / 2));
}

$: (usedPCP = getAttributesPCP(attributes))
$: compounds = getCompounds(getTotalAttributes(attributes,race));
$: {
  $character.baseAttributes = attributes;
}
</script>
<h3>Attributes</h3>
<Row>
{#each attributes as attribute, i}
<Col>
  <p>{attribute.name}</p>
  <p><input type=number bind:value={attribute.value} min=1 max=8></p>
</Col>
{/each}
</Row>
<p>Used PCP: {usedPCP}</p>
<p>Total Attributes:</p>
{#if race}
<Row>
{#each getTotalAttributes(attributes, race) as attribute}
<Col>
<p>{attribute.name}:</p><p>{attribute.value}</p>
</Col>
{/each}
{#each compounds as attribute}
<Col>
<p>{attribute.name}:</p><p>{attribute.value}</p>
</Col>
{/each}
</Row>
{/if}
