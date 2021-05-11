<script>
  import { Button, Col, Row } from "sveltestrap";
  import { talentList } from "./TalentList.js";
  import { character } from "../stores.js"

  /*
Eventually copy the talents page from COMP/CON
*/

  export let maxTalents;
  let activeTalents = JSON.parse(JSON.stringify(talentList));

  activeTalents.forEach((talent) => {
    talent.level = 0;
  });

  function getTalentByName(name) {
    let selected = {};
    activeTalents.forEach((talent) => {
      if (talent.name == name) {
        selected = talent;
      }
    });
    if (!selected) {
      selected = activeTalents[0];
    }
    return selected;
  }

  function addTalent(name) {
    let talent = getTalentByName(name);
    activeTalents.forEach((talent) => {
      if (talent.name === name) {
        if (talent.level == 0) {
          talent.level++;
        } else if (talent.hasOwnProperty("children")) {
          if (talent.level < talent.children.length) {
            talent.level++;
          }
        }
      }
    });
    updateVars();
  }

  function removeTalent(name) {
    let talent = getTalentByName(name);
    activeTalents.forEach((talent) => {
      if (talent.name === name && talent.level > 0) {
        talent.level--;
      }
    });
    updateVars();
  }

  function updateVars() {
    activeTalents = activeTalents;
    usedTalents = getUsedTalents();
    if ($character.schools.length > 0) {
      if (activeTalents.filter( talent => talent.level > 0).length > 0) {
        let charTalents = [];
        activeTalents.filter( talent => talent.level > 0).forEach( talent => {
          let obj = {};
          obj.name = talent.name;
          obj.level = talent.level;
          charTalents.push(obj);
        });
        console.log(JSON.stringify(charTalents))
        $character.schools[$character.schools.length - 1].talents = charTalents;
      } else $character.schools[$character.schools.length - 1].talents = [];
    }
  }

  function getUsedTalents() {
    let sum = 0;
    activeTalents.filter( talent => talent.level > 0).forEach( talent => {
      sum += talent.level;
    })
    return sum;
  }

  $: selectedTalentName = "GOOD FORM";
  $: selectedTalent = getTalentByName(selectedTalentName);
  $: usedTalents = getUsedTalents();

  $: {

  }
</script>

<h3>Talents</h3>
<Row>
<Col>
<p>Available Talents: {maxTalents - usedTalents}</p>
</Col>
</Row>
<Row>
  {#each activeTalents.filter((talent) => talent.level > 0) as talent}
    <Col>
      <p>{talent.name} {talent.level}</p>
    </Col>
  {/each}
</Row>
<select bind:value={selectedTalentName}>
  {#each talentList as talent, i}
    <option value={talent.name}>{talent.name}</option>
  {/each}
</select>
<Button on:click={addTalent(selectedTalentName)}>+</Button>
<Button on:click={removeTalent(selectedTalentName)}>-</Button>
{#if selectedTalent.hasOwnProperty('children')}
  {#each selectedTalent.children as child}
    <hr />
    <p><strong>{child.name}<strong /></strong></p>
    <p>{child.description}</p>
    <p>{child.requirements}</p>
    <p>{child.effect}</p>
  {/each}
{:else}
  <hr />
  <p>{selectedTalent.description}</p>
  <p>{selectedTalent.requirements}</p>
  <p>{selectedTalent.effect}</p>
{/if}
