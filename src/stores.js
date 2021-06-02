import { writable } from 'svelte/store';

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
  getTotalAttributes: function() {
    let obj = JSON.parse(JSON.stringify(this.baseAttributes));
    console.log("Get total attributes TODO")
    return obj;
  }
});
