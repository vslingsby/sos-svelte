export const wealthGrades = [
  {
    name: 'Slave/Exile',
    wealth: [0, 10, 0],
    asset: 0,
    benefits: {
      pick: 1,
      options: ["Beautiful (2)", "Hale and Hearty (2)", "Languages (2)"]
    },
    pcp: 1
  },
  {
    name: 'Peasant',
    wealth: [5, 0, 0],
    asset: 0,
    benefits: {
      pick: 1,
      options: ["Folks Back Home (3)", "Hale and Hearty (2)"]
    },
    pcp: 2
  },
  {
    name: 'Poor Freeman',
    wealth: [15, 0, 0],
    asset: 0,
    benefits: {
      pick: 1,
      options: ["Folks Back Home (3)", "Hale and Hearty (2)", "Literate (1)"]
    },
    pcp: 3
  },
  {
    name: 'Freeman',
    wealth: [25, 0, 0],
    asset: 1,
    benefits: {
      pick: 2,
      options: ["Folks Back Home (3)", "Hale and Hearty (2)", "Literate (1)"]
    },
    pcp: 4
  },
  {
    name: 'High Freeman',
    wealth: [40, 0, 0],
    asset: 2,
    benefits: {
      pick: 2,
      options: ["Contacts (1)", "Folks Back Home (6)", "Languages (1)", "Literate (1)"]
    },
    pcp: 5
  },
  {
    name: 'Minor Noble',
    wealth: [80, 0, 0],
    asset: 3,
    benefits: {
      pick: 2,
      options: ["Allies (5)", "Contacts (1)", "Famous (2)", "Folks Back Home (6)", "Hale and Hearty (2)", "Languages (1)", "Literate (1)"]
    },
    pcp: 6
  },
  {
    name: 'Landed Noble',
    wealth: [150, 0, 0],
    asset: 6,
    benefits: {
      pick: 2,
      options: ["Allies (5)", "Contacts (1)", "Famous (3)", "Folks Back Home (6)", "Hale and Hearty (2)", "Languages (2)", "Literate (2)"]
    },
    pcp: 7
  },
  {
    name: 'High Noble',
    wealth: [300, 0, 0],
    asset: 10,
    benefits: {
      pick: 2,
      options: ["Allies (5)", "Contacts (4)", "Famous (4)", "Folks Back Home (6)", "Hale and Hearty (2)", "Languages (2)", "Literate (2)"]
    },
    pcp: 8
  },
  {
    name: 'Royalty',
    wealth: [800, 0, 0],
    asset: 15,
    benefits: {
      pick: 2,
      options: ["Allies (10)", "Contacts (4)", "Famous (4)", "Folks Back Home (6)", "Hale and Hearty (2)", "Languages (2)", "Literate (2)"]
    },
    pcp: 9
  },
  {
    name: 'High Royalty',
    wealth: [1500, 0, 0],
    asset: 20,
    benefits: {
      pick: 2,
      options: ["Allies (10)", "Contacts (6)", "Famous (4)", "Folks Back Home (6)", "Hale and Hearty (2)", "Languages (3)", "Literate (3)"]
    },
    pcp: 10
  },
]
