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

let compoundAttributes = [
  {
    name: "ADR",
    value: function (attributes) {
      return Math.floor((getAttrByName("Agility",attributes) + getAttrByName("Wit",attributes)) / 2);
    }
  },
  {
    name: "MOB",
    value: function (attributes) { //racial modifiers
        return Math.floor((getAttrByName("Strength", attributes) + getAttrByName("Wit", attributes) +
        getAttrByName("Endurance", attributes)) / 2);
      }
  },
  {
    name: "CAR",
    value: function (attributes) {
      return Math.floor((getAttrByName("Strength", attributes) + getAttrByName("Endurance", attributes)));
    }
  },
  {
    name: "CHA",
    value: function (attributes) {
      return Math.floor((getAttrByName("Willpower", attributes) + getAttrByName("Wit", attributes) +
      getAttrByName("Perception", attributes)) / 2);
    }
  },
  {
    name: "SDB",
    value: function (attributes) { //khopfix sbd = str up to 4, +1 for every 2 beyond that
      return getAttrByName("Strength", attributes) * 2;
    }
  },
  {
    name: "TOU",
    value: function (attributes) { //there are racial modifiers to this
      return 4;
    }
  },
  {
    name: "Grit",
    value: function (attributes) {
      return Math.floor((getAttrByName("Willpower",attributes) / 2));
    }
  },
]

const attributePCPCosts = [22,23,24,27,31,35,40,45,50,56];
const attributePointCosts = [0,1,2,3,4,5,6,7,8,10,12,14,16];

function getAttributePointsUsed(attributes) {
  let sum = 0;
  attributes.forEach((attribute) => {
    if (attribute.name == "Magic") {
      return;
    }
    sum += attributePointCosts[attribute.value-1];
  })
  return sum;
}

function getAttributesPCP(attributes) {
  let sum = getAttributePointsUsed(attributes)
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

function getAttrByName(name, attributes) {
  let value;
  attributes.forEach( (attribute) => {
    if (attribute.name === name) {
      value = attribute.value;
    }
  })
  return value;
}

function getCompoundByName(name, attributes) {
  let value;
  compoundAttributes.forEach( (attribute) => {
    if (attribute.name === name) {
      value = attribute.value(attributes);
    }
  })
  return value;
}

function getCompounds(totals) {
  let compounds = [];
  let compoundNames = ["Adroitness","Mobility","Carry","Charisma","Toughness","SDB","Grit"]
  let compoundShort = ["ADR","MOB","CAR","CHA","TOU","SDB","Grit"];
  compoundNames.forEach( (name, i) => {
    let obj = {};
    obj.name = name;
    obj.value = getCompoundByName(compoundShort[i],totals);
    compounds.push(obj);
  })
  return compounds;
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
