import { writable } from 'svelte/store';
import { races } from './races/racelist.js'


function getRaceByName(name) {
  let selectedRace = 'Human';
  races.forEach((race) => {
    if (race.name === name) {
      selectedRace = race;
    }
  });
  if (selectedRace.name) {
    return selectedRace;
  } else return races[0];
}

function getTotalAttributes(base, race) {
  let totals = JSON.parse(JSON.stringify(base));
  if (race.hasOwnProperty("attributeMods")) {
    race.attributeMods.forEach((mod) => {
      totals.forEach((attribute) => {
        if (mod.name == attribute.name) {
          attribute.value += mod.value;
        }
      });
    });
  }
  totals.forEach((attribute) => {
    if (attribute.value > 13) {
      attribute.value = 13;
    }
  });
  return totals;
}

export const character = writable({
  name: '',
  bio: {
    description: '',
    title: '',
    player: '',
    nickname: '',
    faction: '',
    gender: ''
  },
  race: '',
  arcs: {
    saga: '',
    epic: '',
    glory: '',
    belief: '',
    flaw: ''
  },
  baseAttributes: [
    /*
    {name: 'Strength', value: 1},
    {name: 'Agility', value: 1},
    {name: 'Endurance', value: 1},
    {name: 'Health', value: 1},
    {name: 'Willpower', value: 1},
    {name: 'Wit', value: 1},
    {name: 'Intelligence', value: 1},
    {name: 'Perception', value: 1}
    */
  ],
  boonsAndBanes: [
    /*
    {
    name: '',
    level: 0
  }
    */
  ],
  schools: [
    /*
    {
    name: '',
    proficiencies: [],
    level: 0,
    talents: [],
    superiorManeuvers: [],
    mastery: {}
  }
    */
  ],
  skills: [
    /*
    {
    name: '',
    level: 0
  }
    */
  ],
  wealth: {
    socialClass: '',
    money: [], //go, sp, cp
    assets: [
      /*
      {
      name: '',
      value: 0 // minor, moderate, major
    }
      */
    ],
    benefits: []
  },
  getTotalAttributes: (base, race) => {
    let totals = getTotalAttributes(base, getRaceByName(race))
    return totals;
}
});
