<script>
  import { Button, Col, Row } from "sveltestrap";
  import { onMount } from "svelte";

  import Talents from "../talents/talents.svelte";
  import SuperiorManeuvers from "./superiormaneuvers.svelte";

  import { proficiencyList } from "../proficiencies/proficiencylist.js";

  import { baseSchools } from "./baseschools.js";
  import { burdSchools } from "./burdschools.js";
  import { homebrewSchools } from "./homebrewschools.js";

  import { character } from "../stores.js";

  const pcpToPoints = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27];
  const schoolPointCosts = [
    0,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    6,
    6,
    6,
    6,
    8,
    10,
    10,
    20,
  ]; //first level of school has a cost built in, no base level cost
  const talentLevels = [1, 5, 7, 11, 13, 17, 19];
  const superiorManeuverLevels = [3, 6, 9, 12, 15, 18, 20];

  let schoolList = [];
  schoolList = schoolList.concat(baseSchools);
  schoolList = schoolList.concat(burdSchools);
  schoolList = schoolList.concat(homebrewSchools);
  let activeSchools = [];

  export let race;
  let pointsUsed = 0;
  export let usedPCP = 0;

  function getSchoolByName(name) {
    let selected = { name: "", cost: 0, profNum: 0, bonuses: [] };
    schoolList.forEach((school) => {
      if (school.name == name) {
        selected = school;
      }
    });
    return selected;
  }

  function populateSchools() {
    activeSchools = JSON.parse(JSON.stringify(schoolList));
    activeSchools.forEach((school) => {
      school.level = 0;
      school.choice = "";
      school.talents = [];
      school.superiorManeuvers = [];
      school.mastery = {};
      school.proficiencies = [];
    });
    return activeSchools;
  }

  function addSchool(schoolName) {
    let wrongSchool = false;
    activeSchools
      .filter((school) => school.level > 0)
      .forEach((school) => {
        if (school.name != schoolName) {
          wrongSchool = true;
        }
      });
    if (wrongSchool) {
      updateVars();
      return;
    }
    activeSchools.forEach((school) => {
      if (school.name === schoolName) {
        if (school.level === 0) {
          school.choice = selectedBonusName;
        }
        school.level++;
      }
    });
    updateVars();
  }

  function removeSchool(schoolName) {
    activeSchools.forEach((school) => {
      if (school.name === schoolName) {
        if (school.level > 0) {
          school.level--;
        }
      }
    });
    updateVars();
  }

  function getUsedPCP() {
    let sum = getPointsUsed();
    let pcp = -1;

    for (let n = 0; n < pcpToPoints.length; n++) {
      if (n < pcpToPoints.length - 1) {
        if (sum > pcpToPoints[n] && sum <= pcpToPoints[n + 1]) {
          pcp = n + 2;
        }
      }
      if (sum == pcpToPoints[n]) {
        pcp = n + 1;
      }
    }
    return pcp;
  }

  function getPointsUsed() {
    let sum = 0;
    activeSchools.forEach((school) => {
      if (school.level > 0) {
        sum += school.cost;
      }
      for (let n = 0; n < school.level; n++) {
        sum += schoolPointCosts[n];
      }
    });

    let highestSchool = activeSchools[0];
    activeSchools.forEach((school) => {
      if (school.level > highestSchool.level) {
        highestSchool = school;
      }
    });
    let profs = 0;
    let profCost = 0;
    let profTotal = 0;
    if (!isHuman) {
      profCost++;
    }
    for (let n = 0; n < activeProficiencies.length; n++) {
      if (profs === highestSchool.profNum) {
        profCost++;
      }
      profs++;
      profTotal += profCost;
      if (selectedSchool.hasOwnProperty("allowedProficiencies")) {
        if (selectedSchool.allowedProficiencies.indexOf(activeProficiencies[n]) === -1) {
          profTotal++;
        }
      }
    }
    sum += profTotal;
    return sum;
  }

  function getHighestSchoolLevel() {
    let sum = 0;
    activeSchools.forEach((school) => {
      if (school.level > sum) {
        sum = school.level;
      }
    });
    return sum;
  }

  function getSuperiorManeuvers(level) {
    let num = 0;
    for (let n = 0; n < superiorManeuverLevels.length; n++) {
      num = level >= superiorManeuverLevels[n] ? num + 1 : num;
    }
    return num;
  }

  function getTalents() {
    let level = getHighestSchoolLevel();
    let talents = 0;
    for (let n = 0; n < talentLevels.length; n++) {
      if (level >= talentLevels[n]) {
        talents++;
      }
    }
    return talents;
  }

  function updateVars() {
    usedPCP = getUsedPCP();
    activeSchools = activeSchools;
    superiorManeuvers = getSuperiorManeuvers(getHighestSchoolLevel());
    pointsUsed = getPointsUsed();
    talents = getTalents();
  }

  function getSelectedBonusByName(bonusName) {
    let selected = { name: "", description: "" };
    selectedSchool.bonuses.forEach((bonus) => {
      if (Array.isArray(bonus)) {
        bonus.forEach((child) => {
          if (child.name === bonusName) {
            selected = child;
          } else {
            if (bonus.name === bonusName) {
              selected = bonus;
            }
          }
        });
      }
    });
    return selected;
  }

  function getFirstOption(school) {
    let selected = { name: "", description: "" };
    school.bonuses.forEach((bonus) => {
      if (Array.isArray(bonus)) {
        selected = bonus[0];
      }
    });
    return selected;
  }

  $: isHuman = race.name === "Human";
  $: selectedSchoolName = "Scrapper";
  $: activeProficiencies = [];
  $: selectedBonusName = "";
  $: selectedSchool = getSchoolByName(selectedSchoolName);
  $: selectedBonus =
    selectedBonusName != ""
      ? getSelectedBonusByName(selectedBonusName)
      : getFirstOption(selectedSchool);
  $: activeSchools = populateSchools();
  $: activeProficiencies = [];
  $: pointsUsed = getPointsUsed();
  $: usedPCP = getUsedPCP();
  $: superiorManeuvers = 0;
  $: talents = getTalents();

  $: {
    let charSchools = activeSchools.filter((school) => school.level > 0);
    charSchools.forEach((school) => {
      school.proficiencies = activeProficiencies;
    });
    charSchools.forEach((charSchool) => {
      let found = false;
      $character.schools.forEach((school) => {
        if (charSchool.name === school.name) {
          found = true;
          school.level = charSchool.level;
        }
      });
      if (!found) {
        $character.schools.push(charSchool);
      }
    });
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
<Row>
  <Col>
    <p>Used PCP: {usedPCP}</p>
  </Col>
  <Col>
    <p>Used Points: {pointsUsed} ({pcpToPoints[usedPCP - 1]})</p>
  </Col>
</Row>
<Row>
  {#each activeSchools.filter((school) => school.level > 0) as school}
    <Col>
      <p>
        {school.name}:
        {school.level}
        {#if school.choice != ''}({school.choice}){/if}
      </p>
    </Col>
  {/each}
</Row>
<Row>
  <Col>
    <select bind:value={selectedSchoolName}>
      {#each schoolList as school, i}
        <option value={school.name}>{school.name}</option>
      {/each}
    </select>
    <Button on:click={addSchool(selectedSchoolName)}>+</Button>
    <Button on:click={removeSchool(selectedSchoolName)}>-</Button>
  </Col>
</Row>
<p>{selectedSchool.description}</p>
<p>
  <strong>Requirements:
  </strong>{selectedSchool.requirements ? selectedSchool.requirements : 'None'}
</p>
{#if selectedSchool.hasOwnProperty('note')}
  {#if selectedSchool.note}
    <p><strong>Note: </strong>{selectedSchool.note}</p>
  {/if}
{/if}
<p><strong>Cost: </strong>{selectedSchool.cost}</p>
<p><strong>Proficiencies:</strong> {selectedSchool.profNum}</p>
{#each selectedSchool.bonuses as bonus}
  {#if Array.isArray(bonus)}
    <select bind:value={selectedBonusName}>
      {#each bonus as bonusOption}
        <option value={bonusOption.name}>{bonusOption.name}</option>
      {/each}
    </select>
    <p>{selectedBonus.description}</p>
  {:else}
    <p><strong>{bonus.name}</strong>: {bonus.description}</p>
  {/if}
{/each}
<hr />
<Row>
  {#each proficiencyList.filter((prof) => prof.type == 'MELEE') as prof}
    <Col>
      <p>{prof.name}</p>
      <p>
        <input
          type="checkbox"
          bind:group={activeProficiencies}
          value={prof.name}
          on:change={updateVars} />
      </p>
    </Col>
  {/each}
</Row>
<Row>
  {#each proficiencyList.filter((prof) => prof.type == 'MISSILE') as prof}
    <Col>
      <p>{prof.name}</p>
      <p>
        <input
          type="checkbox"
          bind:group={activeProficiencies}
          value={prof.name}
          on:change={updateVars} />
      </p>
    </Col>
  {/each}
</Row>

<Talents maxTalents={talents} />
<SuperiorManeuvers maxManeuvers={superiorManeuvers} />

{/if}
