export const burdSchools = [{
  "name": "Glade Security",
  "description": "Glade security forces are trained for peacekeeping and combat encounters in the claustrophobic and dark environment of an Iron Glade. They are generally experienced in close-quarters fighting utilizing modern Burdinadin firearms, and unarmed martial arts. However, training concerning the use of primitive weaponry is practically never conducted.",
  "requirements": "Must be reasonably eligible to have received Glade security training.",
  "cost": 3,
  "profNum": 5,
  "note": `Proficiencies must be chosen from: Wrestling, Pugilism, Dagger, Burdinadin Firearm, 1H Blunt. Other proficiencies cost an additional 1 S&P/arc point above their normal cost`,
  "bonuses": [{
    "name": "Stop Resisting!",
    "description": `Inflict an additional +3 stun to enemies that are Prone.`
  }, [
    {
      "name": "Mostly Peaceful De-Escalation",
      "description": `You may use Burdinadin Firearms to perform the Disarm Maneuver.`
    },
    {
      "name": "Social Worker's Touch",
      "description": `Inflict +1 damage whenever you land a hit to the head.`
    },
  ]
  ],
  "allowedProficiencies": [
    "Burdinadin Firearm",
    "Wrestling",
    "Pugilism",
    "Dagger",
    "1H Blunt"
  ]
},
{
  "name": "Burdinadin Field Operations",
  "description": `Burdinadin field operatives are trained to make the most of the capabilities of their augmented combat armor, as well as to prevent damage to it.`,
  "requirements": `Must be reasonably eligible to have received training in the use of Burdinadin Combat Armor`,
  "cost": 3,
  "profNum": 3,
  "note": `Proficiencies must be chosen from: Wrestling, Pugilism, Burdinadin Firearm. Other proficiencies cost an additional 1 S&P/arc point above their normal cost`,
  "bonuses": [{
    "name": "Just Like the Simulations",
    "description": `When you tie an opponent's Missile Defense you still deal full damage. All that training really paid off!`
  },
  [{
    "name": "On the Bounce",
    "description": `You just never stop moving. Increase the bonus to Missile Defense from moving or sprinting by +1, and additionally you can perform simple Burdinadin Firearm actions (Reload, clearing a jam, etc) while performing the Move action.`
  },
  {
    "name": "King of the Hill",
    "description": `The opposing team never won a simulated match when you were on top. Increase Missile Defense gained from cover by +1. Additionally if you have moved into cover during your last action, you count as also having performed the Aim action once.`
  },
  ]
  ],
  "allowedProficiencies": [
    "Burdinadin Firearm",
    "Wrestling",
    "Pugilism",
  ]
}
]

/*
{
  "name":"",
  "description": ``,
  "requirements": "",
  "cost": 0,
  "profNum": 0,
  "bonuses": [ {
    "name": "",
    "description": ``
    },
  ]
}
*/
