export const firearmsList = [
  {
    name: "Arquebus",
    type: 'f',
    range: 35,
    missileTN: 7,
    hands: 2,
    damage: {
      value: 7,
      type: 'p'
    },
    load: 5,
    modifications: {
      barrel: {},
      firing: {},
      ammo: {}
    },
    qualities: [ {
      name: 'Easy to Aim'
    }],
    wt: 2,
    ammoCostMod: 1,
    costMod: 1,
    cost: [7,0,0]
  },
  {
    name: "Pistol",
    type: 'f',
    range: 10,
    missileTN: 7,
    hands: 1,
    damage: {
      value: 7,
      type: 'p'
    },
    load: 5,
    modifications: {
      barrel: {},
      firing: {},
      loading: {},
      ammo: {},
    },
    qualities: ['Easy to Aim'],
    wt: 0.5,
    cost: [6,0,0]
  },
]

/*
{
  name: "",
  type: 'f',
  range: 0,
  missileTN: 0,
  damage: {
    value: 0,
    type: ''
  },
  load: 0,
  ammunition: [''],
  qualities: [],
  wt: 0,
  cost: []
},
*/

export const barrelList = [{
  name: 'Standard',
  effects: [],
  qualities: [],
  wt: 0,
  costMod: 0,
},
{
  name: 'High Caliber',
  effects: [ {
    type: "tn",
    value: 1
  }, {
    type: "ap",
    value: 2
  }, {
    type: "damage",
    value: 1
  }],
  qualities: [],
  level: 0,
  max: 4,
  wt: 0.5,
  costMod: 0.10,
},
{
  name: 'Low Caliber',
  effects: [ {
    type: "tn",
    value: -1
  }, {
    type: "ap",
    value: -2
  }, {
    type: "damage",
    value: -1
  }],
  qualities: [],
  level: 0,
  max: 2,
  wt: -0.25,
  costMod: 0.10,
},{
  name: 'Rifling',
  effects: [ {
    type: "rangeMod",
    value: 2
  }],
  qualities: [],
  wt: 0,
  costMod: 0.75,
},
{
  name: 'Multi-Barrel',
  effects: [{
    type: "ammo",
    value: 1
  }],
  qualities: [],
  level: 0,
  max: 4,
  wt: 0,
  wtMod: 0.5,
  costMod: 0.5,
}]

export const ammunitionTypeList = [
  {
    name: 'Manual (Standard)',
    effects: [],
    costMod: 0
  },
  {
    name: 'Paper Cartridge',
    effects: [ {
      type: 'load',
      value: -1
    }],
    costMod: 2
  },
  {
    name: 'Papier-Mache',
    effects: [ {
      type: 'load',
      value: -1
    }],
    costMod: 5
  },
  {
    name: 'Brass Cartridge',
    effects: [],
    costMod: 20
  },
]

export const projectileList = [{
  name: 'Ball',
  effects: [],
  qualities: [ {
    name: 'AP',
    value: 4
  }],
  stuck: 8,
  cost: [0,0,15]
},
{
  name: 'Shot',
  effects: [],
  qualities: [ {
    name: 'Scatter',
    value: 2
  }],
  stuck: 8,
  cost: [0,0,10]
},
]

export const loadingMechanismList = [ {
  name: 'Standard (Muzzle)',
  effects: [],
  wt: 0,
  costMod: 0
},
{
  name: 'Breech-loading',
  effects: [{
    type: "load",
    value: -2
  }],
  wt: 0,
  costMod: 0.75
},
{
  name: 'Revolving',
  effects: [ {
    type: "max",
    value: 15
  }, {
    type: "ammo",
    value: 1
  },
  {
    type: 'wt',
    value: 0.25
  }, {
    type: 'costMod',
    value: 0.5
  }],
  level: 0,
  wt: 0,
  costMod: 1
},
{
  name: 'Standard (Muzzle)',
  effects: [],
  wt: 0,
  costMod: 0
},]

export const firingMechanismList = [ {
  name: 'Standard (Flintlock)',
  effects: [ {
    type: 'FlintChange',
    value: 20
  }],
  ammunitionTypes: ['Manual','Paper Cartridge'],
  costMod: 0
},
{
  name: 'Firelock',
  effects: [ {
    type: 'load',
    value: -1
  }],
  ammunitionTypes: ['Manual'],
  costMod: -0.6
}]

function evalFirearmAndMods (firearm) {
  /*
  {
    name: "Arquebus",
    type: 'f',
    range: 35,
    missileTN: 7,
    hands: 2,
    damage: {
      value: 7,
      type: 'p'
    },
    load: 5,
    modifications: {
      barrel: {},
      firing: {},
      ammo: {}
    },
    qualities: [ {
      name: 'Easy to Aim'
    }],
    wt: 2,
    cost: [7,0,0]
  },
  */

  firearm = evalBarrel(firearm)
  firearm = evalFiringMechanism(firearm)
  firearm = evalLoadingMechanism(firearm)
  firearm = evalAmmo(firearm)

  return firearm;
}

function evalBarrel(firearm) {

  let barrel = firearm.modifications.barrel;

  barrel.effects.forEach( effect => {
    if (effect.type === "rangeMod") { //rangemod
      firearm.range * effect.value;
    }

    if (effect.type === "damage") {
      firearm.damage.value += effect.value;
    }
  })

  //damage
  //tn
  //ap

  //multi barrel attaches basically another gun

}

function evalFiringMechanism(firearm) {
  let firing = firearm.modifications.firing;

  firing.effects.forEach(effect => {
    if (effect.type === 'load') {//load
      firearm.load += effect.value;
    }

    if (effect.type === 'LoseETA') {//lose eta

    }

    if (effect.type === 'tn') {
      firearm.missileTN += effect.value;
    }
  })


  //range tn
  //costmod
  //allowed ammunition types
  //flint change
  //critical failure effect
  //requires percussion caps

}

function evalLoadingMechanism(firearm) {
  //wt
  //costmod
  //load
  //ammo

}

function evalAmmo(firearm) {
  //load
  //ammo cost

}
