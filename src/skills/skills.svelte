<script>
  import { Button, Col, Row } from "sveltestrap";

  import { skillList } from "./skilllist.js";
  import { packetList } from "./packetlist.js";
  import { character } from "../stores.js"
  const skillPCPCosts = [6, 9, 12, 15, 18, 21, 24, 27, 30, 33];

  let specializations = [
    "Homestead",
    "Criminal",
    "Nobility",
    "Politics",
    "Sailing",
    "Doctor",
    "Farmer",
    "Trade",
    "Finance",
    "Wood",
  ];
  specializations.sort();

  let activeSkills = [];
  let activePackets = [];
  activeSkills = JSON.parse(JSON.stringify(skillList));
  activePackets = JSON.parse(JSON.stringify(packetList));
  let packetSkills = [];
  export let attributes = [];
  export let usedPCP = 1;

  activeSkills.forEach((skill, i) => {
    let obj = {
      name: skill,
      level: 0,
      specializations: [],
    };
    activeSkills[i] = obj;
  });

  activePackets.forEach((packet) => {
    packet.level = 0;
    let hasChoice = 0;
    packet.skills.forEach((skill) => {
      if (Array.isArray(skill)) {
        hasChoice++;
      }
    });
    if (hasChoice != 0) {
      packet.choices = [];
      packet.activeChoice = 0;
    }
  });

  function evalPackets() {
    let list = [];
    activePackets.forEach((packet) => {
      if (packet.level > 0) {
        for (let i = 0; i < packet.level; i++) {
          packet.skills
            .filter((skill) => !Array.isArray(skill))
            .forEach((packetSkill) => {
              addSkillByName(packetSkill, list);
            });
          packet.skills
            .filter((skill) => Array.isArray(skill))
            .forEach((packetSkills) => {
              for (let n = 0; n < packet.level; n++) {
                addSkillByName(packetSkills[packet.choices[n]], list);
              }
            });
        }
      }
    });
    packetSkills = list;
  }

  function addSkillByName(skillName, list) {
    let nameAndSpec = getSkillAndSpec(skillName);
    let name = "";
    let spec = "";
    if (nameAndSpec) {
      name = nameAndSpec[0];
      spec = nameAndSpec[1];
    } else name = skillName;

    if (list.filter((skill) => skill.name === name).length === 0) {
      let obj = { name: name, level: 0, specializations: [] };
      list.push(obj);
    }

    list
      .filter((skill) => skill.name === name)
      .forEach((skill) => {
        skill.level++;
        if (spec != "" && skill.specializations.indexOf(spec) == -1) {
          skill.specializations.push(spec);
        }
      });
    return list;
  }

  function addPacket(packetName, choice) {
    activePackets.forEach((packet) => {
      if (packet.name == packetName) {
        if (packet.choices) {
          packet.choices[packet.level] = choice;
        }
        packet.level++;
      }
    });
    updateVars();
  }

  function removePacket(packetName, list) {
    activePackets.forEach((packet) => {
      if (packet.name == packetName && packet.level > 0) {
        packet.level--;
      }
    });
    decrementInputsPacket(packetName);
    updateVars();
  }

  function getPacketLevelBySkillName(name) {
    let list = evalPackets(packets);
    list.forEach((skill) => {
      if (skill.name === name) {
        return skill.level;
      }
    });
  }

  function getSkillAndSpec(name) {
    let regex = /^([A-z]+) \(([A-z]+)\)$/;
    let match = name.match(regex);
    if (match) {
      return [match[1], match[2]];
    } else return undefined;
  }

  function getMinSkillInput(skillName) {
    let min = 0;
    packetSkills
      .filter((skill) => skill.name === skillName)
      .forEach((skill) => {
        if (min < skill.level) {
          min = skill.level;
        }
      });
    return min;
  }

  function updateInputs() {
    activeSkills.forEach((skill) => {
      let minInput = getMinSkillInput(skill.name);
      if (skill.level < minInput) {
        skill.level = minInput;
      }
    });
  }

  function decrementInputsPacket(packetName) {
    let packet = activePackets.filter(
      (packet) => packet.name === packetName
    )[0];
    packet.skills
      .filter((skill) => !Array.isArray(skill))
      .forEach((skill) => {
        if (getSkillAndSpec(skill)) {
          skill = getSkillAndSpec(skill)[0];
        }
        activeSkills
          .filter(
            (activeSkill) => activeSkill.name === skill && activeSkill.level > 0
          )
          .forEach((activeSkill) => {
            activeSkill.level--;
          });
      });
    packet.skills
      .filter((skills) => Array.isArray(skills))
      .forEach((skills) => {
        let skill = skills[packet.choices[packet.level - 1]];
        if (getSkillAndSpec(skill)) {
          skill = getSkillAndSpec(skill)[0];
        }
        activeSkills
          .filter(
            (activeSkill) => activeSkill.name === skill && activeSkill.level > 0
          )
          .forEach((activeSkill) => {
            activeSkill.level--;
          });
      });
  }

  function getUsedPCP() {
    //skillPCPCosts = [6, 9, 12, 15, 18, 21, 24, 27, 30, 33];
    let points = getPointCost();
    let pcp = 1;

    let intCaps = [];
    for (let n = 0; n < skillPCPCosts.length; n++) {
      intCaps[n] = skillPCPCosts[n] + int * 2;
    }

    for (let n = 0; n < intCaps.length; n++) {
      if (points <= intCaps[n]) {
        return n + 1;
      }
      if (n < intCaps.length - 1) {
        if (points <= intCaps[n + 1] && points > intCaps[n]) {
          return n + 2;
        }
      }
    }
  }

  function getPointCost() {
    let sum = 0;
    let list = JSON.parse(JSON.stringify(activeSkills));
    activePackets
      .filter((packet) => packet.level > 0)
      .forEach((packet) => {
        sum += packet.level * 3;
      });

    list
      .filter((skill) => skill.level > 0)
      .forEach((skill) => {
        packetSkills
          .filter(
            (packetSkill) =>
              packetSkill.name === skill.name && packetSkill.level > 0
          )
          .forEach((packetSkill) => {
            skill.level -= packetSkill.level;
          });
      });
    list
      .filter((skill) => skill.level > 0)
      .forEach((skill) => {
        sum += skill.level;
      });
    return sum;
  }

  function updateVars() {
    evalPackets();

    activeSkills = activeSkills;
    activePackets = activePackets;
    packetSkills = packetSkills;
    updateInputs();
    usedPCP = getUsedPCP();
    usedPoints = getPointCost();
  }

  $: int =
    attributes.length > 0
      ? attributes.filter((attr) => attr.name === "Intelligence")[0].value
      : 1;
  $: activeSkills = activeSkills;
  $: activePackets = activePackets;
  $: packetSkills = packetSkills;
  $: usedPCP = usedPCP;
  $: usedPoints = 0;

  $: {
    $character.skills = activeSkills.filter(skill => skill.level > 0);
  }
</script>

<Row>
  <Col>
    <p>Used PCP: {usedPCP}</p>
  </Col>
  <Col>
    <p>Used Points; {usedPoints} ({skillPCPCosts[usedPCP - 1] + 2 * int})</p>
  </Col>
</Row>
<h3>Packets</h3>
<Row>
  {#each activePackets as packet}
    <Col>
      <p><strong>{packet.name}</strong></p>
      {#each packet.skills as skill, i}
        {#if Array.isArray(skill)}
          <select bind:value={packet.activeChoice}>
            {#each skill as option, i}
              <option value={i}>{option}</option>
            {/each}
          </select>
        {:else}
          <p>{skill}</p>
        {/if}
      {/each}
      <Button on:click={addPacket(packet.name, packet.activeChoice)}>+</Button>
      <Button on:click={removePacket(packet.name)}>-</Button>
    </Col>
  {/each}
</Row>
<hr />
<h3>Skills</h3>
<Row>
  {#each activeSkills as skill}
    <Col>
      <p>{skill.name}</p>
      <p>
        <input
          type="number"
          bind:value={skill.level}
          min={getMinSkillInput(skill.name)}
          max="8"
          on:change={updateVars} />
      </p>
    </Col>
  {/each}
</Row>
