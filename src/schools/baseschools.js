export const baseSchools = [{
    "name": "Scrapper",
    "description": "Self-taught in the school of hard knocks, a Scrapper’s skills are unpolished and rough, but well-practiced. Scrappers tend to know a thing or two about fighting dirty as well.",
    "requirements": "",
    "cost": 0,
    "profNum": 4,
    "bonuses": [{
      "name": "Dirty Trick",
      "description": "Once per opponent (this is not per-fight, once you’ve fought dirty against someone they will remember your tricks) you may make a Melee Throw, Melee Toss, Bite, Kick, Grapple: Eye-Gouge or Grapple: Break Maneuver at -1 TN."
    }]
  },
  {
    "name": "Soldier",
    "description": "Fighting men are trained en-masse to fight with battlefield weapons in gruesome and efficient manners. A Soldier’s training tends to harden their bodies and minds against pain, fatigue and fear alike.",
    "requirements": "",
    "cost": 1,
    "profNum": 10,
    "bonuses": [{
        "name": "Discipline",
        "description": "You gain a +2 bonus to Willpower Tests against Fear."
      },
      {
        "name": "Warrior's Grit",
        "description": "You gain a +2 bonus to starting Grit."
      }
    ]
  },
  {
    "name": "Officer",
    "description": `Officers are trained to inspire their men to hold the line and
carry the charge. The skills an officer must learn in combat
reflect this, and they specialize in fewer fighting styles.`,
    "requirements": "5gp for training and diploma",
    "cost": 3,
    "profNum": 4,
    "bonuses": [{
        "name": "By Example",
        "description": "Gain +2 bonus to CP when Charging"
      },
      [{
          "name": "Protect the Banner",
          "description": `At the Refresh, you gain +2 bonus CP
per additional opponent you face in a melee bout. That is,
if you’re facing two opponents, you only gain +2 for the
additional opponent`
        },
        {
          "name": "Ride to Ruin",
          "description": `You gain an additional +2 CP when mounted.`
        },
      ]
    ]
  },
  {
    "name": "Noble",
    "description": `Noblemen learn in the finest fencing schools and under
private tutors. They are taught techniques that common men
would never learn, and tend to think of themselves (rightfully) as a cut above the rest of the crowd. This attitude, and
their flashy style, can be highly intimidating. However, when
seriously challenged, a noble’s confidence can falter.`,
    "requirements": "15 gp for training, tutelage and catering",
    "cost": 5,
    "profNum": 3,
    "bonuses": [{
        "name": "Superior Instruction",
        "description": `You gain an extra talent at
levels 6, 12, and 18. These are in addition to other talents
gained through leveling up your school.`
      },
      {
        "name": "Confidence",
        "description": `If you have not been injured in this combat yet,
you gain +2 bonus to CP.`
      },
    ]
  },
  {
    "name": "Traditional Fencer",
    "description": `Rigorously trained and disciplined, traditional fencers are
peerless swordsmen (at least in their eyes), and they prefer
to fight in a dignified and structured manner, with few tricks
and fewer treacheries. They specialize in simple, but agonizingly perfected techniques that are difficult to counter`,
    "requirements": "10 gp for training and proper sacrifices",
    "cost": 5,
    "profNum": 4,
    "bonuses": [{
        "name": "Extreme Repetition",
        "description": `When declaring a Universal
Attack or Universal Defense maneuver, which would roll 10
or more dice, one of the dice may be an automatic success
instead of being rolled. `
      },
      {
        "name": "Centered",
        "description": `You gain an automatic success on stability tests of
all sorts, in and out of combat.`
      },
    ]
  },
  {
    "name": "Unorthodox Fencer",
    "description": `Swordsmanship has changed, and unorthodox fencers are
on the bleeding edge of that change. New techniques, new
geometries of combat, and new ideas are all welcome in these
fresh halls. Unorthodox fencers rely on specially designed
techniques to outmaneuver and defeat their opponents. Get
with the times, gramps!`,
    "requirements": "5 gp for training",
    "cost": 5,
    "profNum": 6,
    "bonuses": [{
        "name": "The Meisterhau",
        "description": `Masterstrike’s activation cost is
reduced from X+Y+2 to X+Y.`
      },
      {
        "name": "Treachery",
        "description": `When making a Pommel Strike or End Him Rightly
maneuver, you make the attack at -1 TN.`
      },
    ]
  },
  {
    "name": "Esoteric School",
    "description": `Esoteric school fighters are raised in a very different environment from other fighters. The Esoteric school is more
interested in purity, mysticism and spirituality than it is
in strictly mastering violence. Esoteric schools tend to have
different philosophies, but they are ultimately similar in their
approach to blending their aesthetic beliefs with martial arts.`,
    "requirements": "Belief arc must coincide with the school’s values. Cannot be a Complete Monster.",
    "cost": 8,
    "profNum": 4,
    "bonuses": [{
        "name": "Simplicity",
        "description": `This ability is only active when you are wearing
no individual pieces of armor with a weight value, not
including shields or helmets. Any superior maneuver
employed either by you or your opponent has a +4 activation cost added to it.`
},[
  {
    "name": "Flowing Water",
    "description": `Your Parry maneuvers are resolved at -1 TN so long
as Simplicity is active`
  },
  {
    "name": "Raging Flame",
    "description": ` Your attack maneuvers which inflict damage or stun are
resolved at -1 TN if Simplicity is active.`
  },
  {
    "name": "Biting Wind",
    "description": `Your Void maneuvers are
resolved at -1 TN if Simplicity is active.`
  },
  {
    "name": "Stoic Earth",
    "description": `Your Block maneuvers are
resolved at -1 TN if Simplicity is active.`
  },
]
    ]
  },
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
