export const races = [{
  name: "Human",
  tier: 1,
  attributeMods: [],
  characteristics: [{
    name: "Willing to Learn",
    description: `Humans are flexible creatures by nature, and learning is
something most can do very quickly, particularly when
instructed. When selecting a school, Humans do not pay to
add proficiencies to their schools, and may begin with the
full allotment of proficiencies in the school for no cost.`
  },
  {
    name: "The Human Condition",
    description: `Human beings live short, brutal lives by the standards
of the elder races. More-so than any other race, Humans
are characterized by their ability to overcome their own
weaknesses. Only Humans may benefit from the Flaw arc.`
  }
  ]
}, {
  name: "Goblin",
  tier: 1,
  attributeMods: [{
    name: 'Strength',
    value: -2
  },
  {
    name: 'Agility',
    value: 1
  },
  {
    name: 'Perception',
    value: 1
  }
  ],
  characteristics: [{
    name: "Regeneration",
    description: `Goblins can recover from any injury that is not fatal. Lost
limbs, eyes, and so on, regrow after twice the healing time of
the wound has elapsed.
The exception to this is if the wound is sealed with fire or
acid or some other method. These wounds cannot be regenerated,
and are permanently lost.
Banes taken which represent wounds or lost body parts
are assumed to be of the burned sort, and thus may not be
healed in the regular manner.`
},{
  name: "Small",
  description: `Goblins are shorter than other races, and they suffer -2 to
the reach of their weapons. Their MOB is also reduced by 2,
representing their shorter legs.`
},
{
  name: "Sneaky",
  description: `Goblins are naturally cautious and swift creatures. They gain
+1 bonus dice to the Stealth skill, and are always considered
trained in that skill.`
},
{
  name: "Scarce Environment",
  description: `Goblins only have to eat half as much as other races in order
to survive`
},
{
  name: "Tight Spot",
  description: `Goblins are very short, but also flexible and double-jointed.
They can fit through any space large enough for their small
heads to pass through, and can also contort their limbs to
climb in cramped spaces, or secure fingerholds too small to
otherwise be used.
Goblins gain a +2 bonus to Climbing, and a +2 bonus to
Thievery to squeeze through tight places.`
},
{
  name: "See in Darkness",
  description: `Goblins can see in Pitch Black, Poorly Lit and Dimly Lit as
though it were Evenly Lit.`
},
{
  name: "Photophobia",
  description: `When in Brightly Lit, Goblins count as being in Poorly Lit.
When in Evenly Lit, Goblins count as being in Dimly Lit.
Blinding is still Blinding. `
},
]
}, {
  name: "Dwarf",
  tier: 2,
  attributeMods: [
  {
    name: 'Endurance',
    value: 2
  },
  {
    name: 'Health',
    value: 1
  },
  ],
  characteristics: [{
    name: "Short and Stout",
    description: `Dwarves have -1 reach and -2 MOB, due to their smaller
stature and considerable girth.`
  },
  {
    name: "Robust Immunities",
    description: `-1 to infection chance against all wounds, and +2 bonus to
bleed rolls`
  },
  {
    name: "Sturdy Build",
    description: `Dwarves have +1 TOU at character creation.`
  },
  {
    name: "See in Shadow",
    description: `Dwarves can see in Poorly Lit and Dimly Lit as though it were Evenly Lit.`
  },
  {
    name: "Prodigious Livers",
    description: `Dwarves gain a +6 bonus to their effective HLT when rolling to ` +
      `resist toxins (poisons, alcohol, general toxins) that are ingested, ` +
      `and +2 to their effective HLT against poisoned arrows, ` +
      `weapons or other toxins that enter the body through injury.`
  },
  ]
}, {
  name: "Seablooded",
  tier: 2,
  attributeMods: [
  {
    name: 'Agility',
    value: 1
  },
  ],
  characteristics: [
    {
      name: "Long-Lived",
      description: `Seablooded do not have a Focus as Zells do, but they are not fully mortal as humans are. Rather, they tend to live for around 150 years, regardless of where they are or what they do. They are largely immune to disease, and like Zells, insects and vermin tend to die around them because their bodily oils are toxic. This does give them a vague chemical smell, akin to that of quinine or tonic water.`
    },
    {
      name: "Echoes of the Void",
      description: `Seablooded have some small connection to the realm of spirits, much as their Zellish kinsmen do, but it is less substantial than that of true Zells. Seablooded who are Thaumaturges gain +2 Credibility in any one realm of their choice.`
    },
    {
      name: "Between Two Worlds",
      description: `The Seablooded are hybrids of Zells and humans, and thus possess only some of the traits of each. Their ears are pointed like those of a Zell, but they tend to be shorter and stockier, like humans. Likewise, which traits precisely they possess vary depending on the genetics of the individual. A Seablooded may benefit from the Flaw Arc as though they possessed the trait The Human Condition, and suffer the penalty from the Zells’ trait Strange Tastes.`
    },
    {
      name: "Additional",
      description: `Additionally, a Seablooded may choose one of the following traits from the Zells’ trait list for their own: Echolocation, The Zellish Touch, Reistance to Disease`
    },
  ]
}, {
  name: "Zell",
  tier: 3,
  attributeMods: [
  {
    name: 'Agility',
    value: 1
  },
  {
    name: 'Perception',
    value: 2
  }
  ],
  characteristics: [
    {
      name: "Elvish Agelessness",
      description: "Elves reach physical maturity by the age of 20, much like Humans do. However, after that, their bodies’ aging process halts, so long as they retain their Focus."
    },
    {
      name: "Focus",
      description: `The Zells’ Focus is the Dream. They need to be members of a crew to be part of the Dream, and as long as they are members of a Dream, Zells do not age significantly past physical maturity. This effect does not stop the Zell’s ears from growing longer over time. Those in a Dream have a strong bond with one another, and have telepathic links with their crew. Those who leave their Dream begin to age normally, however.`
    },
    {
      name: "Autodirection",
      description: `A Zell will always be able to tell the direction of magnetic
north from their present position. Even when moved from
one position to another while unconscious, a Zell will be able
to estimate their position relative to a previous one with a
few moments of concentration. This is because Zells have an
organ in their brains that can gauge magnetic north naturally,
and keeps track of it even when they are asleep or unconscious. A sharp blow to the head may temporarily (1d10/2
hours) disable this ability as the organ reorientates itself.`
    },
    {
      name: "Zellish Dream",
      description: `The Dream is a sort of psychic connection that occurs between
Zells. It is a form of semi-voluntary communal bonding, the
trigger for which is simply spending a period of time on a
vessel on open water. When it takes root, the Zells begin to
share thoughts, become aware of each others’ well-being and
feelings, and perhaps more importantly, begin to hear the
thoughts of the ship itself, which is naturally drawn into the
bond. The Dream allows Zells to communicate non-verbally
over a distance of about a mile, and to communicate instructions to their ship (assuming it is a Zellislava). Being a member
of a Dream is the requirement for their Focus.
Becoming part of a Dream requires that two or more
Zells spend about a week as the sole occupants of any vessel.
Importantly, these Zells must at least agree on which of The
Seven Gods of Chaos has primacy. They do not need to be of
the same tribe or hold the same beliefs. Even Zells who
were raised on land with no contact with other Zells can
form crews by fulfilling these requirements. Zells that
are not part of a Dream may be incorporated into
a Dream by spending a similar amount
of time on the ship
with its crew.`
    },
    {
      name: "Zellislava",
      description: `Any ship that serves as the founding vessel for a Zellish
Dream (that is, the rowboat that Zells spend a week on to
merge their consciousnesses) becomes a Zellislava immediately. Alternatively, if a pre-established Dream of Zells
make up the primary crew of a vessel of any size for about
a year, that ship will gradually become a Zellislava over that
period. The Zellislava itself will be aligned to the member
of The Seven Gods of Chaos that the Zellish crew worship. A
Zellislava is a living ship that gradually grows and expands
from the framework of its original body, increasing evermore
in sophistication and complexity, and eventually gaining
moving components.`
    },
    {
      name: "Friends in Deep Places",
      description: `Zells in open water, either at sea, on inland oceans or large
lakes, have the peculiar ability to vanish into the depths, and
reappear at the nearest shore. This involves them emptying
their lungs, losing consciousness, and sinking into the deep.
Through a barely understood force (believed by the Zells
to be the machinations of their gods) the Zell will emerge
anywhere from a few hours to a month later on the nearest
coast, feeling reasonably well-rested, but hungry and sore.
Everything on their person, including objects held in all but
the most airtight containers, will be thoroughly soaked.
Additionally, anything that a Zell personally drops into
the ocean, intentionally or unintentionally, can be recovered
during the Zell’s time in the deep, but this requires a WIL roll
with an RS of at least 3, and possibly more if the item is very
heavy. Objects too large or heavy to be carried by one person
cannot be recovered.
If a Zell is somehow prevented from sinking while
attempting to use this ability, they do not vanish and reappear, but they also do not re-awaken until either released into
the deep, at which point the ability takes effect as normal, or
until they are pulled up to the surface, at which time they
awaken, confused and disoriented.
Regardless of the status of their Focus, a Zell does not age
while in this state, and fish and other animals will not eat or
even touch a Zell who is in this sort of stasis. Theoretically, a
Zell could spend centuries submerged in this manner…`
    },
    {
      name: "Echolocation",
      description: `A Zell’s ears are much more sensitive than that of a Human,
and Zells are capable of echolocation. By making small sounds
and listening to the echoes, Zells can form a very limited
picture of their surroundings without using their eyes.
So long as conditions are relatively quiet, a Zell can treat
even Pitch Dark lighting as Poorly Lit for the purposes of
movement, and even missile attacks. If the target of such
a missile attack has made a loud or audible noise, then this
improves to Dimly Lit. This also applies to blind Zells, who can
act as though the environment were Poorly Lit. See lighting
rules in Chapter 20: Adventuring on how this affects combat.
The range of this ability is generally 10 yards per point
of PER the Zell has. In a noisy (but not deafening) environment, it is 5 yards per point of PER, and in a deafeningly loud
environment it cannot be used at all. An interior muscular
reflex seals off the more sensitive parts of a Zell’s ears when
loud noises begin, so they rarely suffer significant damage
to their hearing, but echolocation is impossible in such an
environment.`
    },
    {
      name: "The Zellish Touch",
      description: `Zells always add their PER to their missile CP involving
any weapon with circular components. If this is compatible
with the Aim action’s PER bonus, the effects are cumulative.
Weapons that count for this rule include Zellish wheelbows,
wheellock firearms, throwing disks like frisbees, circular
sawblades, chakrams, and so on.`
    },
    {
      name: "Racial Glossophobia",
      description: `Zells have very keen senses of hearing, and this actually
proves a disadvantage when communicating verbally, because
the echoes of both their own and other voices makes it very
difficult to pick out small details like words and inflections.
As such, Zells often seem awkward, are prone to pausing in
conversation to ‘sift’ through the words they have just heard.
They also tend to prefer talking either very softly, or very
loudly, with little room in between. Zells suffer a -4 penalty
to CHA related tests involving communicating with others
verbally. This does not apply for Intimidation checks, or for
communicating with other Zells.`
    },
    {
      name: "Race of Sailors",
      description: `Zells gain a +2 bonus to Sailing tests. This bonus increases
to +4 if the boat being operated is a Zellislava. This bonus
decreases to -2 if the boat being operated is a Zellislava of a
Chaos God hostile to the Zell in question.`
    },
    {
      name: "Resistance to Disease",
      description: `Zells cannot contract some diseases, including any transmitted by insects or rats, and some vitamin deficiencies, like
scurvy. They also seem to be curiously immune to botulism.
Insects that touch a Zell’s bare skin generally die within five
or ten seconds depending on size.`
    },
    {
      name: "Strange Tastes",
      description: `Zells suffer a -2 penalty to PER to detect poison (or anything
else) in food or drink, because they have a dulled sense of
taste. They can barely taste salt, and they can’t taste sour
things at all. However, they may survive drinking seawater,
and cannot suffer nausea from smells or tastes, no matter
how vile.`
    },
  ]
}, {
  name: "Burdinadin",
  tier: 3,
  attributeMods: [
  {
    name: 'Agility',
    value: 1
  },
  {
    name: 'Intelligence',
    value: 1
  },
  ],
  characteristics: [
    {
      name: "Elvish Agelessness",
      description: `Elves reach physical maturity by the age of 20, much like Humans do. However, after that, their bodies’ aging process halts, so long as they retain their Focus.`
    },
    {
      name: "Facts Over Feelings",
      description: `Burdinadin are naturally inclined to be very fact-oriented, and do not tend to take the emotions and sensibilities of others into account. This often makes them come across as strange at best and know-it-alls at worst.
      Burdinadin suffer a -2 to all Oration tests, and a -4 to all Persuasion and Subterfuge tests`
    },
    {
      name: "Focus",
      description: `The Burdinadin do not currently know what their Focus is, but so long as they are within the sanctuary of the Iron Glades or insulated while outside the Glade, they are protected from spirit contamination, and retain their Elvish Agelessness.`
    },
    {
      name: "Glade-Mandated Basic Education",
      description: `Iron Glades ensure that their citizens receive a level of basic education before they reach adulthood. Burdinadin start play with the Languages (1) and Literate boons, free of charge.`
    },
    {
      name: "Natural Philosophy",
      description: `So long as the Burdinadin is not suffering pain from spirit
contamination (see Sterile Soul) Burdinadin may make a
special Research test to discern the function, purpose, composition, and/or mechanics of any object, device or technology.
Instead of using just INT, Burdinadin adds PER and INT for
the skill pool calculation. This kind of check is omni-sensory,
utilizing sight, smell, touch, hearing, and even taste.
If the Burdinadin is allowed to disassemble and play with
the subject manually, a +4 bonus is gained to the Research test.
When used in this way, Natural Philosophy requires
time to study the object determined by the RS
of the test (see Table 5.2). After a successful
use of this ability to analyze something, any
Crafting rolls made to improve, redesign,
copy, forge, disable or otherwise take advantage of this knowledge gain a bonus equal to
the BS from the Natural Philosophy roll. The
same object can be analyzed multiple times,
but the Crafting bonus does not stack, only
the highest number of BS is used.
There is a cost to using this power. Every
hour that is spent using Natural Philosophy,
the Burdinadin must make a WIL test at
1 RS, +1 per hour they have already been
using the ability. If they fail, they attract
the attention of That Which Stares Back,
and begin suffering spirit contamination,
as when the Burdinadin is outside and uninsulated. Once this begins, the Burdinadin cannot break free of the trance, and thus the spirit contamination, until they make a WIL test at 1 RS, +1 per hour since That Which Stares Back has fixed its gaze upon them.`
    },
    {
      name: "Race of Engineers",
      description: `Burdinadin gain a +2 bonus to Engineering tests. This bonus increases
      to +4 if the task concerns Burdinadin devices and they have access to tools of Burdinadin
      manufacture. Additionally, Burdinadin never count as being Untrained in Engineering.`
    },
    {
      name: "The Stains of Time",
      description: `The Burdinadin can see trails of causality through the air
before them when in tense situations, much as Humans
see strange patterns on the insides of their eyelids after
looking at bright lights. Unlike the Human visions, which
are thoroughly ignorable traces of dying cells on the cornea,
the Burdinadin’s visions are glimpses of the future, brought
forth by their ability to gaze into the interior mechanics of
the universe’s functions.
So long as a Burdinadin is not suffering from spirit
contamination (see Sterile Soul) and is not suffering more
than Light encumbrance, the TN of all Void and Parry maneuvers is reduced by 1.
Additionally, The Stains of Time allows Burdinadin to Void
or Parry missile attacks from firearms.`
    },
    {
      name: "Sterile Soul",
      description: `The Burdinadin cannot handle contact with the outside world,
and all of its spirit contamination, without
proper insulation. If a Burdinadin
is ever outside an Iron Glade
without a protective suit or
other means of insulation,
he will suffer spirit contamination. The environmental
factors and spirit contamination formula for Sterile Soul
is described in Chapter 17:
Burdinadin Armory, where you
will find protective suits to mitigate spirit contamination.
For every point of spirit contamination suffered, the Burdinadin
must reduce their maximum combat
pool (CP) by 1, and reduce their skill
pool (SP) by 1.
 If their spirit contamination exceeds
their HLT + WIL, they must make a WIL
test at 3 RS or die, as their nervous system
is systematically dismantled by aggressive
spirits. This test must be performed once per
minute so long as the Burdinadin remains in
a contaminated environment, and their spirit
contamination exceeds their HLT + WIL.
If the Burdinadin finds shelter in a sterile location,
or is moved to a safe place after suffering spirit contamination, the contamination will fade at a rate of 8 points
per hour.
While recovering from spirit contamination in a
sterile environment, the WIL test must be performed
once per hour until the spirit contamination is less
than their HLT + WIL. `
    },
    {
      name: "Silver Spoon",
      description: `Burdinadin gain an additional 10gp to purchase equipment from the Burdinadin Armory during character creation. Any unspent money is lost. Not affected by the Rich or Poor boons/banes.`
    },
  ]
}, {
  name: "Ohanedin",
  tier: 3,
  attributeMods: [{
    name: 'Strength',
    value: 1
  },
  {
    name: 'Agility',
    value: 1
  },
  {
    name: 'Perception',
    value: 1
  }
  ],
  characteristics: [
    {
      name: "Elvish Agelessness",
      description: `Elves reach physical maturity by the age of 20, much like
Humans do. However, after that, their bodies’ aging process
halts, so long as they retain their Focus. `
    },
    {
      name: "Focus",
      description: `To preserve their immortality, Ohanedin must obey the
mandates of their patron spirits. Never clothing themselves in metal (metal weapons are acceptable, as long as
the Ohanedin doesn’t actually have to touch the metal part),
never betraying an oath freely given, and never eating meat
from animals that cannot speak, are the three basic prerequisites, however many have significantly more. Due to the
complexity of the Ohanedin Focus, it is broken down into its
individual qualities below.
An Ohanedin that breaks the laws of consumption (eating
the flesh of an animal that cannot speak) will violently regurgitate its meal, and will lose access to Natural Awareness and
Rules of Nature for the next 24 hours.`
    },
    {
      name: "Metallophobia",
      description: `Ohanedin have a particularly rigid Focus, particularly when
it comes to metal. Wearing metal covering the torso inflicts
8 pain on an Ohanedin for as long as it is worn. Wearing it
on the head inflicts 10, whereas the limbs only inflict 4 each.
Wielding a weapon made of metal inflicts no pain, unless that
metal is part of the grip that must be touched. A wood grip
can insulate an Ohanedin from this effect, but cloth, leather
or similar materials do not.
Of course, the Ohanedin also age so long as metal is in
contact with their flesh, as its Focus is being denied, and
the Ohanedin cannot use his Natural Awareness or Rules of
Nature powers either.
Injuries inflicted by metal weapons do not inflict additional pain, but any missile made of metal that has a Stuck
Chance inflicts 2 additional pain on a successful wound if the
missile becomes Stuck.
When grappling with someone wearing metal armor, an
Ohanedin suffers 8 stun per move he remains grappling.
Grabbing onto something made of metal, say to climb it or
to avoid falling, requires a WIL test at 4 RS to avoid letting
go out of shock.`
    },
    {
      name: "Focus Oaths",
      description: `An Ohanedin who gives his word freely is compelled to keep it,
until such a time as he fulfils his promise, or the compact is
broken by the other party. An Ohanedin who breaks his oath
loses Focus for a year and a day, and is no longer immortal,
and does not benefit from Natural Awareness or Rules of
Nature. The Ohanedin does retain access to his Murderous
Speed ability, and is also still vulnerable to Metallophobia, as
well of course as still suffering from Unusual Bone Anchors,
as that is a matter of musculature and not supernatural in any
way. This period can be cut short if the individual to whom
he made the broken oath names a penance for him that is
deemed acceptable by the spirits (this is a fine art, and the
rules are not clear to anyone, even the highest wisemen of
the Ohanedin) which the guilty party then fulfils. A common
penance is for the Ohanedin to cut off one of their own fingers,
another is to agree to serve the offended party for ten years`
    },
    {
      name: "It's an Animal Thing",
      description: `Ohanedin start play with the Animal Affinity (2) boon free of charge.`
},
    {
      name: "Natural Awareness",
      description: `An Ohanedin is automatically aware of any wounded or
frightened life forms within 100 yards of it in any natural
(non-urban) environment. This awareness is accurate to
an area of about 10 yards, at which point it cannot pinpoint
it any further. This ability does not work on other Ohanedin,
or creatures with the Undead descriptor. Ohanedin lose this
ability while their Focus is lost.`
    },
    {
      name: "Unusual Bone Anchors",
      description: `Ohanedin have stronger bone anchors than Humans do,
and their muscles are also denser, and better at explosive,
powerful movements. This makes them physically stronger
than Humans, while still remaining sleek and agile, but
they have poorer fine motor skills, which makes it difficult
for them to do things like writing, or operating fine devices.
Ohanedin suffer a -4 penalty to tasks that require a high
degree of manual finesse, like lockpicking or operating intricate machines. Their handwriting is also terrible. It is for this
reason that the Ohanedin written language is mostly made
up of large, straight lines.`
    },
    {
      name: "Murderous Speed",
      description: `Ohanedin at rest are nearly motionless. There are no nervous
tics, no ‘tells,’ and no involuntary flinches. They move like
spiders, from perfect stillness to rapid, explosive movements
in the blink of an eye.
In the orientation declaration stage of combat, Ohanedin
do not have to declare which orientation they are not
throwing.`
    },
    {
      name: "The Feeling Disappears",
      description: `The Ohanedin’s spirit senses, much like their Burdinadin
cousins, offer them an unusual insight into the world around
them and an ability to sense events before they occur. Unlike
the Burdinadin, however, the Ohanedin are not fettered by
their need to avoid spirit contamination. To the contrary, it
is through the spirits that this power is achieved.
As long as an Ohanedin currently has Focus, the TN of all
Void and Parry maneuvers is reduced by 1, and their missile
defense is increased by 2.
Additionally, The Feeling Disappears allows an Ohanedin to
Void or Parry missile attacks from firearms.`
    },
    {
      name: "Rules of Nature",
      description: `The Ohanedin have a delicate relationship with their patron
spirits, and it is possible to offer up their own life-force for
consumption in return for victory. This often results in blood
forcing its way out of the eyes, ears, mouth and other orifices,
but the sheer power granted in return is worth any sacrifice.
An Ohanedin may choose, when declaring an attack that
inflicts damage, to add their WIL score to the amount of
damage dealt. Doing so will immediately reduce the Ohanedin’s HLT
by 1, which recovers as HLT does
after bleed.`
    },
    {
      name: "Secret Ingredient",
      description: `Ohanedin receive a +2 bonus to Cooking tests made while using
      meat ingredients derived from speaking animals (Whales and parrots are allowed, mimes are not).`
    },
  ]
}, {
  name: "Vampire",
  tier: 3,
  attributeMods: [
  {
    name: 'Agility',
    value: 2
  },
  ],
  characteristics: [
    {
      name: "Godless",
      description: `A Vampire is not psychologically capable of believing in anything larger than himself, or in any loyalty or purpose larger than the individual. Vampires cannot benefit from the Belief Arc, much as Complete Monsters cannot. Unlike the Complete Monster Bane, however, a Vampire is not necessarily totally devoid of empathy--they simply cannot commit to greater ideas, and find conceptsnotions of community, religion and ideology to be, at best, a confusing notion.`
    },
    {
      name: "Red Feast",
      description: `Vampires can consume blood by biting their victims, or by drinking it out of containers, etc. This inflicts Bleed 20 on the victim, which remains so long as the Vampire drinks. For each point of HLT lost (equivalent to 2 pints of blood) the Vampire gains one “Point” worth of Blood, a Blood Point. A Vampire can store 12 Blood Points (about 24 Pints) in its body for later usage. Once a character reaches 0 HLT, they die, and the Vampire can glean no further blood from them. An average human has about 9-12 pints of blood.

A victim bitten in this way suffers from terrible hallucinations during this process, and must make a WIL test at RS 4 to take any action while suffering Bloodloss from this ability. The hallucinations often take the form of terrible darkness, great eyes staring out of the cosmos, and shrill, all-consuming screaming (or is it laughter?) from a thousand inhuman throats. Othertimes, the hallucinations are intensely pleasurable and relaxing--this seems to depend on the vampire’s attitude during the feeding.

Any kind of mammalian blood will serve this ability, but non-sentient blood from animals like dogs, cows, etc. only has half the normal Blood Point value.

Human beings or Din who are killed as a result of this feeding will rise as Vampires exactly 24 hours after their hearts cease to beat.
`
    },
    {
      name: "Blood Requirements - Starvation",
      description: `A Vampire's spends the majority of its time in a sort of dormant state, conserving the blood he has and  during which time his supernatural abilities are not active, and he suffers a -2 penalty to all Attributes. Spending a Blood Point will restore these to full dice for 24 hours. A Vampire may spend a point of Blood at any time, but it takes a full minute for their abilities to come into effect. Vampires do not strictly speaking need blood in order to live (if they are even alive at all) but a bloodless existence is not pleasant for them--they tend to feel lethargic, irritable, anxious and vulnerable.
The state of a Vampire that is not presently using Blood to operate at full capacity is called “Starved.”
`
    },
    {
      name: "Creatures of the Night",
      description: `Animals will not normally attack or willingly come close to Vampires, as they can detect their alien nature and find them discomforting. Animals which remain in close contact with a Vampire for 2-4 months will eventually grow used to them and potentially trust them.`
    },
    {
      name: "Hypnotism",
      description: `When not Starved, a Vampire or Star Vampire making eye contact with and speaking to a sentient being can cause them to act more favorably towards them, as though they were a friend. The Vampire can simply induce an individual with whom he can make eye contact to obey and simple or reasonable request. They must make a WIL Test at RS 2 or obey that request. By expending one Blood Point, however, the Vampire can make an opposed Willpower Test against the target. If the Vampire is successful, the Target must obey the Vampire so long as they retain eye contact, which they will do unless told to do otherwise. Vampires do not normally blink, but having the eye contact disrupted for even a second would break the spell.
Vampires must be able to make eye contact with the target in order for this ability to work. If a target successfully resists the ability, they will be immune to it from any Vampire for a year and a day.
`
    },
    {
      name: "Blood-Charged Form",
      description: `A Vampire or Star Vampire that is not Starved may spend an additional point of Blood to gain a +2 bonus to all physical Attributes for one hour. During this time they take on a monstrous appearance as their skin draws back, exposing their fangs, elongating their fingers into talons, and giving them a hideous skeletal look.
This ability may not be used multiple times to increase Attributes beyond +2.
`
    },
    {
      name: "Sunlight",
      description: `A Vampire exposed to direct sunlight will immediately erupt into flames. This may be limited to specific body-parts exposed, but will always destroy instantly the part exposed to the sun. However, it is important to understand that this is not a result of sunlight or photons or solar radiation being fatal to a Vampire. Rather, the Sun itself hates Vampires, and will annihilate them with its divine power wherever it notices them. Sunlight is merely the Sun’s vision. A Vampire that can conceal itself from the sun, even if small parts of it are theoretically exposed to reflected light, will be safe from this threat.`
    },
    {
      name: "Regeneration",
      description: `Vampires heal Wounds at a rate of 1 Wound Level per day, so long as they are not Starved. Otherwise, they do not heal at all.
If in Full Form, a Vampire may spend 2 Blood Points to reduce all wounds by 1 level. This process takes 1 Round, and the Vampire cannot move while healing in this way.
Regenerating a lost limb, eye or other body part requires an expenditure of 10 Blood Points.
Vampires injured too greatly to move or act but who are not technically killed are simply rendered inert, and will enter a state of semi-conscious delirium as they wait for some happenstance or opportunity for them to imbibe blood with which to heal themselves.
`
    },
    {
      name: "Vampiric Anatomy",
      description: `Vampires cannot suffer Pain* from wounds. Stun is always halved for Vampires. They cannot suffer from Infection,  and cannot suffer death or Instant-Death with four exceptions:
- Decapitation
- Destruction of the brain
- Piercing of the central blood-sac of their body (located in the chest, Level 5 Wound) with a Wooden or Silver weapon object
- Burning of the body until death

Vampires cannot suffer from sickness, poison, radiation, or other forms of bodily harm from chemicals or energies that do not directly destroy the body. Fire and acid still work normally, for example.
Vampires can suffer Bleed, but Vampires do not lose HLT as normal if they fail Bleed Rolls, they instead lose 1 Blood Point per HLT that would be lost. Vampires cannot perish from Bleed, they can only run out of Blood Points.
*Weapons made of Silver (this includes Silversteel) do inflict Pain on Vampires as normal, which is reduced by the Vampire’s Willpower score.
Burn damage also inflicts Pain on Vampires as normal, which is reduced by the Vampire’s Willpower score.
Vampires that are killed immediately crumble into piles of powdered carbon, resembling ash.
`
    },
    {
      name: "Vampiric Weaknesses",
      description: `Vampires have a number of weaknesses.
1: They find the sight and proximity of religious symbols to be physically painful, akin to the sensation of burning alive. A Vampire suffers 20 Pain if within eyesight of a religious symbol. A Vampire may spend 6 Blood Points to cause any normal (man portable, non-magical) religious symbol in eyesight of them to erupt into flames and burn, melt, or disintegrate. This weakness only applies if the Vampire is aware that the object is a religious symbol--if the Vampire doesn’t recognize it, it does not count. The definition of a religious symbol in this context would be “an object, device, sign or symbol which

2: They detest plants with very strong smells, as their bodies refuse to process vegetable matter. Garlic is the stereotypical example, but onions, cabbage, a strong mustard, or even flowers all apply as well. A vampire cannot ingest Blood if the smell of vegetable matter is strong in the surroundings presently.

3: A Vampire can be instantly killed if it suffers a level 5 wound to the chest with either a wooden or silver spike. This includes arrows, crossbow bolts made of wood, swords or other weapons made of Silversteel, etc. Silver bullets also work.

4: Holy water, oil, or similar chemicals burn Vampires like boiling oil or burning sand burns humans (see burning rules for more details.) These wounds are the only sort which will leave actual scars on a Vampire.

5. Vampires always count as Enemies of Genosus for the purposes of Judgement. All Ascendants can detect Vampires on sight subconsciously.

6. Drinking the blood of a Zell causes a Vampire to immediately regurgitate every drop of blood they currently store, reducing them to 0 Blood Points and preventing them from acquiring more for at least an hour, until the nausea wears off. This is because the Zellish anatomy evolved to combat parasitic organisms, and their chemistry includes toxins which are even harmful to Vampires.
`
    },
  ]
}, {
  name: "Orredin",
  tier: 4,
  attributeMods: [{
    name: 'Strength',
    value: -1
  },
  {
    name: 'Health',
    value: -2
  },
  {
    name: 'Willpower',
    value: 2
  },
  {
    name: 'Intelligence',
    value: 2
  },
  ],
  characteristics: [
    {
      name: "Beautiful",
      description: `Always have the Beautiful Minor boon (can buy Beautiful Major at difference in cost`
    },
    {
      name: "Elvish Agelessness",
      description: `Elves reach physical maturity by the age of 20, much like
Humans do. However, after that, their bodies’ aging process
halts, so long as they retain their Focus.`
    },
    {
      name: "Focus",
      description: `Like all Din, the Orredin have a Focus which allows them to remain ageless and immortal. The Orredin focus is to simply be in a Warren with 125 or more Sorcerous Flow. The Flow can be utilized by devices or spells, so long as it is there, any Orredin in that Warren has Focus. Alternatively, consuming (usually drinking a solution of) about a teaspoon of powdered magestone (typically costing 10 gp)  will satisfy an Orredin's Focus for a month.`
    },
    {
      name: "Apotheosis",
      description: `Orredin have a special pool of points called Gnosis. Each point of Gnosis is a point of extra Flow that an Orredin has available to him regardless of what Warren they are in. Gnosis moves with the Orredin, and can be used, occupied etc. just like normal Flow, except that it can only be used by the Orredin themself.
Gnosis can also be spent to activate Bloodline Abilities. Doing this temporarily “spends” the Gnosis points, which cannot be used for Flow or other purposes until they return. Gnosis regenerates (up to the Orredin’s Gnosis Cap) at a rate of 1 Gnosis per [30-Willpower] minutes.
An Orredin starts with 1 Gnosis, and can increase their Gnosis cap in the following ways:
-An Orredin may spend 15 Arc Points to increase his Gnosis Cap by 1. Only 5 Gnosis can be gained in this manner.
-Consuming (usually drinking a solution of) two and a half tablespoons (about 100 gp worth) of Magestone will increase an Orredin's Maximum Gnosis by 1. Only 5 Gnosis can be gained in this manner.
-Absorbing energy from certain ancient relics, powerful artifacts and rare devices will increase an Orredin's Maximum Gnosis by 1. Only 10 Gnosis can be gained in this manner.
`
    },
    {
      name: "The Godhead is a Spring",
      description: `Every Orredin is at least a Minor Sorcerer, and is considered to have 1 points in the Magic Category devoted to Sorcery. The level can be increased with additional expenditure in the Magic Category at Character Creation.`
    },
    {
      name: "From it Flows Everything",
      description: `Each Orredin in a Sorcerous Warren increases the Flow value of that Warren by 2, and of all adjacent Warrens by 1.`
    },
    {
      name: "And then returns once more, and so is like a Spring",
      description: `All Orredin have a Bloodline Power that can be selected from the list below. Additional powers can be purchased in the Magic category at Character Creation. These are just examples. Confer with your GM about personalized Bloodline Powers that may fit your character better.`
    },
  ]
}, {
  name: "Star Vampire",
  tier: 5,
  attributeMods: [
  {
    name: 'Agility',
    value: 2
  },
  ],
  characteristics: [
    {
      name: "Godless",
      description: `A Vampire is not psychologically capable of believing in anything larger than himself, or in any loyalty or purpose larger than the individual. Vampires cannot benefit from the Belief Arc, much as Complete Monsters cannot. Unlike the Complete Monster Bane, however, a Vampire is not necessarily totally devoid of empathy--they simply cannot commit to greater ideas, and find notions of community, religion and ideology to be, at best, a confusing notion.`
    },
    {
      name: "Red Feast",
      description: `Vampires can consume blood by biting their victims, or by drinking it out of containers, etc. This inflicts Bleed 20 on the victim, which remains so long as the Vampire drinks. For each point of HLT lost (equivalent to 2 pints of blood) the Vampire gains one “Point” worth of Blood, a Blood Point. A Vampire can store 12 Blood Points (about 24 Pints) in its body for later usage. Once a character reaches 0 HLT, they die, and the Vampire can glean no further blood from them. An average human has between 9-12 pints of blood. A victim bitten in this way suffers from terrible hallucinations during this process, and must make a WIL test at RS 4 to take any action while suffering Bloodloss from this ability. The hallucinations often take the form of terrible darkness, great eyes staring out of the cosmos, and shrill, all-consuming screaming (or is it laughter?) from a thousand inhuman throats. Othertimes, the hallucinations are intensely pleasurable and relaxing--this seems to depend on the vampire’s attitude during the feeding.

Any kind of mammalian blood will serve this ability, but non-sentient blood from animals like dogs, cows, etc. only has half the normal Blood Point value.

Human beings or Din who are killed as a result of this feeding will rise as Vampires exactly 24 hours after their hearts cease to beat.
`
    },
    {
      name: "Blood Requirements - Starvation",
      description: `A Vampire's spends the majority of its time in a sort of dormant state, conserving the blood he has and  during which time his supernatural abilities are not active, and he suffers a -2 penalty to all Attributes. Spending a Blood Point will restore these to full dice for 24 hours. A Vampire may spend a point of Blood at any time, but it takes a full minute for their abilities to come into effect. Vampires do not strictly speaking need blood in order to live (if they are even alive at all) but a bloodless existence is not pleasant for them--they tend to feel lethargic, irritable, anxious and vulnerable.
The state of a Vampire that is not presently using Blood to operate at full capacity is called “Starved.”
`
    },
    {
      name: "Blood-Charged Form",
      description: `A Vampire or Star Vampire that is not Starved may spend an additional point of Blood to gain a +2 bonus to all physical Attributes for one hour. During this time they take on a monstrous appearance as their skin draws back, exposing their fangs, elongating their fingers into talons, and giving them a hideous skeletal look.
This ability may not be used multiple times to increase Attributes beyond +2.`
    },
    {
      name: "Dark Swarm",
      description: `A Vampire that is not Starved can summon a swarm of shadowy, immaterial forms out of the ether to swarm an opponent, blinding and confusing them. The shapes range from dark grasping hands to skulls, formless tendrils, and even alien, winged shapes similar to bats--when used offensively, they tend to take the forms of their target’s greatest fears and insecurities. This counts as a Blind Toss Maneuver, but with -1 TN. This ability has no Blood cost.`
    },
    {
      name: "Wisp",
      description: `A Star Vampire that is not Starved may vanish and reappear an instant later into a cloud of dark smoke and spectral stars (or are they eyes?). The Vampire will be “gone” for about half of a second, and cannot see what is happening around itself until it reappears. The Vampire can reappear up to 5 yards from its current position, or may spend a Blood Point to appear up to 50 yards away.
This can be done in Combat. It counts as an Outmaneuver or a Flee Maneuver at -2 TN.
A Vampire cannot perform this ability if it is in within eyesight of a mirror or mirror-like object. (Not any reflective surface will suffice, it must be a mirror large and sufficiently reflective enough that the Vampire could look at it casually and see its reflectivity.) Star Vampires also cannot use this ability to cross running water, or to enter the dwelling of any being unless he has been invited inside.`
    },
    {
      name: "Creatures of the Night",
      description: `Animals will not normally attack or willingly come close to Vampires, as they can detect their alien nature and find them discomforting. Animals which remain in close contact with a Vampire for 2-4 months will eventually grow used to them and potentially trust them.`
    },
    {
      name: "Spiderclimb",
      description: `A Vampire that is not Starved may walk, crawl or climb on any surface as though it were a spider or gecko, adhering to surfaces through unnatural means.`
    },
    {
      name: "Hypnotism",
      description: `When not Starved, a Vampire making eye contact with and speaking to a sentient being can cause them to act more favorably towards them, as though they were a friend. The Vampire can simply induce an individual with whom he can make eye contact to obey and simple or reasonable request. They must make a WIL Test at RS 2 or obey that request. By expending one Blood Point, however, the Vampire can make an opposed Willpower Test against the target. If the Vampire is successful, the Target must obey the Vampire so long as they retain eye contact, which they will do unless told to do otherwise. Vampires do not normally blink, but having the eye contact disrupted for even a second would break the spell.
Vampires must be able to make eye contact with the target in order for this ability to work. If a target successfully resists the ability, they will be immune to it from any Vampire for a year and a day.
`
    },
    {
      name: "Sunlight",
      description: `Star Vampires are not harmed by sunlight in the way that conventional Vampires are, but instead count as being Starved when in contact with direct sunlight, and cannot use their Star Vampire powers.`
    },
    {
      name: "Regeneration",
      description: `Vampires heal Wounds at a rate of 1 Wound Level per day, so long as they are not Starved. Otherwise, they do not heal at all.
If in Full Form, a Vampire may spend 2 Blood Points to reduce all wounds by 1 level. This process takes 1 Round, and the Vampire cannot move while healing in this way.
Regenerating a lost limb, eye or other body part requires an expenditure of 10 Blood Points.
Vampires injured too greatly to move or act but who are not technically killed are simply rendered inert, and will enter a state of semi-conscious delirium as they wait for some happenstance or opportunity for them to imbibe blood with which to heal themselves.`
    },
    {
      name: "Star Vampire Weaknesses",
      description: `Star Vampires have a number of weaknesses.

1: They detest plants with very strong smells, as their bodies refuse to process vegetable matter. Garlic is the stereotypical example, but onions, cabbage, a strong mustard, or even flowers all apply as well. A vampire cannot ingest Blood if the smell of vegetable matter is strong in the surroundings presently.

2: A Star Vampire can be instantly killed if it suffers a level 5 wound to the chest with either a wooden or silver spike. This includes arrows, crossbow bolts made of wood, swords or other weapons made of Silversteel, etc. Silver bullets also work.

3. Star Vampires always count as Enemies of Genosus for the purposes of Judgement. All Paladins can innately sense that there is something wrong with a Star Vampire, but they cannot automatically discern their true nature unless they are in their Blood Charged form.

4. Drinking the blood of a Zell causes a Star Vampire to immediately regurgitate every drop of blood they currently store, reducing them to 0 Blood Points and preventing them from acquiring more for at least an hour, until the nausea wears off. This is because the Zellish anatomy evolved to combat parasitic organisms, and their chemistry includes toxins which are even harmful to Vampires.
`
    },
    {
      name: "Spurn the Earth, Consume the Stars",
      description: `If a Star Vampire is “killed” by a means other than one of its weaknesses or an Ascendant’s Judgement, it will, instead of truly perishing, transform back into the true form of the Star Vampire--a hideous morass of tentacles, polyps, and coral-like tubes.

Upon returning to its true form, a Star Vampire's only conscious goal can be to return to the Sky, smashing through the roof or simply flying straight upwards as quickly as possible. If it is somehow sealed underground or in a container it cannot easily break through or is otherwise contained, the Vampire will perish after about ten seconds. This will prevent any further reincarnation of the Star Vampire. These forms are not fully “matter” in the conventional sense, and cannot be injured through conventional means.

A Star Vampire who is forced to escape into the sky this way will return after a year and a day, reborn into the world fully restored but lacking any memory of the intervening events.
`
    },
    {
      name: "Infecting Mortals",
      description: `Star Vampires are born beyond the limits of the sky, and are not created out of human stock, as is commonly believed by mortals. However, they are capable of creating lesser versions of themselves out of mortal creatures, including humans, Din, and even (it is speculated) goblins.

Any being (with certain exceptions) who is drained of all blood by a Star Vampire and killed will arise as a regular Vampire at the next moonrise after their death. This will increase their Attributes as-per the Vampire profile, and force upon them the many curses and benefits of being a Vampire.

Only sentient races may be resurrected as Vampires.
Dwarves Zells, and Seablooded cannot become Vampires, they simply perish if drained to death by a Vampire.
Ascendants cannot be resurrected as Vampires, and drinking an Ascendant’s blood causes a Star Vampire to erupt into flames, inflicting damage as-per Boiling Oil to the head.
`
    },
  ]
}, {
  name: "Sarturi Chosen",
  tier: 5,
  attributeMods: [
  ],
  characteristics: [
    {
      name: "Give unto Sartur…",
      description: `The Chosen gains Divinity in the following ways:
 Killing people. Divinity equal to the slain character’s
HLT score per Human killed, unless they were: pregnant
women, children, or those sworn to peace or poverty.
Killing such a person (or even being party to their death)
instead costs the Chosen 10 Divinity.
 Killing domesticated animals. 1 Divinity per 100 lbs that
the animal weighs (animals lighter than 100 lbs provide
no Divinity.)
 Making people bleed in combat. Every time anyone within
50 feet of a Sarturi fails a bleed test from wounds inflicted
by the Sarturi, the Sarturi gains Divinity equal to the
number of HLT points lost.
 Being injured. A Sarturi who suffers any cutting or piercing
damage in legitimate battle (practice or self-inflicted
wounds don’t count) gains Divinity equal to the level of the
wound (this Divinity cannot be used to negate the wound
that provided it with the Not Today! ability).
 Suffering bleed. If a Sarturi fails a bleed test, he gains
Divinity equal to 2x the HLT points lost.`
    },
    {
      name: "From the Depths to the Soil",
      description: `The Chosen have the ability to spend Divinity to enrich the
soil and life of an area. This can cause the accelerated growth
of plant life, the restoration of health to flora and fauna alike,
and the elimination of pollution. At base, wherever a Chosen
steps, dead plant matter quickly and visibly rejuvenates (if it’s
in season) and no animal kept in close proximity to a Chosen
will ever grow sick.
By spending Divinity, the Sarturi can cause a larger area to
burst into health and life. Flowers, water-lillies, reeds, grass,
Chapter 5: Races
46
whatever the appropriate life for the area will erupt from the
soil instantly, even in the middle of winter or the depths of a
wasteland. Any crops properly planted in this land will grow
to their full potential no matter the rain or cold, no animals
raised and grazed on this land will grow sick or die except
through external influence, and trees will grow at ten times
their regular speed. Even the weather will be milder and
better for crops and pastoralism here, even if it is horrible
all around the area.
The effect of this ability lasts for 1 month per Divinity
spent, so a 1 Divinity expenditure improves 1 square yard for
1 month. A 5 Divinity expenditure improves 10,000 square
yards for 5 months. Past 5 Divinity, the size of the area no
longer increases, but the duration does. So 300 Divinity will
improve a 10,000 square yard area for 300 months, or about
25 years.
Every time a member of a Sarturi Chosen’s Band (see
below) is killed, the Sarturi may activate this ability, centered
on his dead companion, rather than himself, as though it had
been activated with 1 Divinity. This has no cost.`
    },
    {
      name: "A River of Blood",
      description: `A Chosen may spend 4 Divinity to increase his STR by 1 for
one hour. He may do this multiply times to increase his STR
up to his current HLT. STR can also not be raised beyond 13 by
any means. Sarturi grow visibly more muscular and powerful
as they use this ability, then deflate down to their regular
size as it wears off. `
    },
    {
      name: "Not Today!",
      description: `Sarturi Chosen are held together by more than muscle and
sinew. When they sustain injuries, their flesh can be made
to close immediately upon being sustained, and blood will
visibly contract back into the body before the wound closes.
The process is not even truly painful to them.
Any time a Chosen would sustain a wound, they may
instead spend 2 Divinity per level of the wound to negate
it immediately. They still suffer half the stun, but none of
the pain of the wound, and of course, no bleed. Missiles and
weapons Stuck inside of them will be expelled instantly and
irresistibly—quite forcefully in fact. If the bearer of a spear
planted deep in a Sarturi’s breast attempts to keep it there, he
may even be shoved back several feet.
If inside an area under the effects of From the Depths to
the Soil, this ability costs 1 Divinity per level of the wound
instead of 2`
    },
    {
      name: "Band of Blood",
      description: `Before a battle, any companion of the Chosen may don a
bandana stained with the Chosen’s blood. If they do so, they
are considered part of that Chosen’s ‘Band’ until they remove
the bandana. The bandana cannot be removed by any means
except the wearer or the Sarturi’s will. A member of the Band
gains the following bonuses:
 +2 CP;
 Ignores the first 2 points of pain suffered; and
 Any time bleed is inflicted or suffered, increase the amount
of bleed gained by 3.
Whenever a member of a Sarturi Chosen’s Band is killed, all
remaining members of the Band recover from fatigue, and
benefit from the effects of Not Today! As though it had been
used with 2 Divinity. The Chosen gains 2 CP up to a maximum
of 2x his WIL for 24 hours, and 1 Divinity.
If the Chosen is killed, every member of the Band will
suffer 5 bleed per Turn until they take off the bandanas as
blood beguns to erupt from the nose and mouth.`
    },
    {
      name: "Sartur Hungers!",
      description: `Wounds just seem to want to bleed more when a Chosen is
on the battlefield. Any cutting or piercing damage inflicted
within 100 yards of a Sarturi suffers 1 additional bleed. This
does not go away if the sufferer leaves the vicinity of the
Chosen.`
    },
    {
      name: "No Hard Feelings",
      description: `If a Sarturi Chosen is killed in battle, whoever struck the
finishing blow gains a number of Glory arc points equal to
the total Divinity the Sarturi has, plus the amount spent in
the last 24 hours.`
    },
  ]
}, {
  name: "Genosian Paladin",
  tier: 5,
  attributeMods: [
  ],
  characteristics: [
    {
      name: "Genosian Ideal",
      description: `Paladins cannot begin play with any sort of bane that would
physically cripple them, such as Scars, missing limbs, old
wounds, lasting pain, lost eyes, brain damage, and so on
(though being tall or short, fat or skinny is acceptable). These
banes can be gained during play, but cannot normally occur
at Character Creation.
At the GM’s discretion, a Paladin may have acquired an
injury during his career after emerging from the
gate, and so may have one or more of these
banes, but the cost of the bane is
halved for the purposes of
B&B points. For the purposes of Healing (Paladin ability, explained below)
or other requirements, the cost of the bane counts as normal.
Paladins cannot be Complete Monsters, because they must
have a Faith arc in order for them to become Ascendants.`
    },
    {
      name: "Glory, Amen",
      description: `Paladins gain Divinity in the following ways:
 Successfully using Smite to destroy something evil gains
the Paladin between 1 and 10 Divinity (depending on
seriousness of a threat, with 1 being a minor evil like
an arsonist or a madman who hates roads, and 10 being
an existential crisis to Genosism, like a demon bent on
destroying the world.)
 Spending a full day engaging in honest labor gains the
Paladin 1 Divinity.
 Organizing the honest labor of good Genosians (or potential converts) for a full day gains the Paladin between 1
and 3 Divinity.
 If an infidel genuinely converts to Genosism because of the
Paladin’s words or actions, he gains 1 Divinity.
 Killing any sort of infidel, heretic or apostate whose has
deliberately set themselves against Mighty Genosus, his
people, or his church(es) gains the Paladin between 1 and 5
Divinity depending on the severity of their crimes (1 being
a peasant who abandoned the faith out of frustration, 5
being a prominent priest who defected to Chaos Worship
or worse).`
    },
    {
      name: "Smite",
      description: `A Paladin can channel the power of Genosus through any
weapon—even his own hands—to strike the enemies of his
God with terrible vengeance. When a Paladin performs a
melee maneuver that inflicts damage (such as Swing and
Thrust, though Shoot and Melee Shoot do not count) he may
also declare that he is performing Smite.
If the attack hits, in addition to any damage from the
attack itself, Smite inflicts burn damage not just on the hit
location, but on all hit locations in the Target Zone. So, if a
Paladin uses Smite and strikes an opponent, aiming for the
lower arm target zone, and hits the victim on the hand hit
location, the victim’s elbow, forearm and hand all erupt into
flames. Smite’s burn damage is X/TN 5, 3
rounds. X is the Paladin’s WIL score.
Smite will not work on just any target.
The target must be one who is an enemy
of Genosus and Genosism, who has somehow
threatened, wronged, or attacked Genosians... or
someone who has mocked Genosus, Genosian teachings, or the divine works of Genosus. In short, it
must be someone Genosus would want dead. How they
feel about or view themselves, or how they justify
their actions, has no bearing on the effect of Smite.
If Smite is performed on an innocent person, not only does
the attack not inflict burn damage, but the Paladin loses 3
Divinity immediately.
If a target struck by Smite perishes as a result of the
attack (either the fire or the raw damage) the Paladin gains
an amount of Divinity based on how great of a threat the
victim was (see Glory, Amen). This is generally between 1 and
10, with 1 being a common criminal, and 10 being a threat to
the entirety of Genosism.`
    },
    {
      name: "Shield of Dawn",
      description: `Paladins are protected by the will of Genosus, the
Indefatigable Sun. This extends to the point that missiles
flung at them seem to be slowed by the very light itself.
Paladins gain AV versus missile attacks and explosions
(this counts as cover AV) of all varieties so long as they are in
contact with light. The amount of AV they gain depends on
the intensity of the light they are exposed to.
If there is no light to be had, the Paladin can spend 1
Divinity to produce radiance of their own light equivalent to
Dimly Lit for a span of about ten seconds.`
    },
    {
      name: "Healing",
      description: `A Paladin can use Divinity to work the miracle of healing on
the wounded or the sick. They can even, in extreme cases,
restore destroyed limbs, cure blindness, and even madness.
Spending 1 Divinity per level of the wound will heal, over
the course of a few seconds (in combat, one round for each
level of the wound) and halt the bleeding until it is healed.
The Paladin must remain in contact with the wounded party
for this entire time. The wound is not reduced over time, but
is entirely removed when the healing process is complete.
A Paladin can heal himself at double this speed (one round
per two levels of the wound) and can continue taking other
actions as he does so. A Paladin’s Healing Touch is doubly
effective against burn wounds, with each point of Divinity
curing two wound levels.
A Paladin can cure most diseases with 1 to 3 Divinity
(with 1 being for a cold, and 3 being The Red Death) by praying
for several moments, and then slapping the subject on the
side of the head. If it doesn’t hurt, it doesn’t count.
Injuries that involve a bane (a lost eye, a severed limb, a
crippled limb, brain damage, and so on) are more difficult to
repair. The Paladin must spend several moments collecting
himself (as long as a minute in some cases) and then strike
the subject with his hand, and shout. At this point, both the
Paladin AND the subject need to ‘buy off’ the injury bane. The
Paladin must spend an amount of Divinity equal to the cost
of the bane, whereas the subject must spend arc points (hey,
miracles don’t work themselves—you need faith!). If either
party doesn’t have enough points to do it, the Paladin will be
able to tell before actually performing the ritual.
If successful, limbs regrow instantly (the new flesh tends
to have a golden hue to it, and is numb and difficult to use for
about an hour), eyes regrow, bones reset themselves, scarred
lungs become pink and new, madness fades, and brains
restore themselves from damage.`
    },
    {
      name: "Judgment",
      description: `Judgment is perhaps a more direct use of a Paladin’s ability
to crush evil than Smite—it also uses up some of his Divinity
rather than granting him more. Judgment is a cone of white
light more brilliant than the sun (just kidding, heretic, that
isn’t possible!) that carries with it the power of Genosus, the
Master of Light, to obliterate darkness and evil. Judgment
costs 4+X Divinity to use, and creates a cone of white light
in which no evil can survive. The Paladin most commonly
casts out his arm, and the light erupts from it with a sound
like a thunderclap. The results vary upon the nature of those
caught in it.
Regular people will be blinded if they are looking towards
the light, and may suffer sunburns. Wicked people (those
whom Genosus would judge to be worthy of severe chastisement or death) will immediately suffer burn wounds at a level
equal to X to any exposed parts of their bodies. Covered parts
may be set on fire as-per burning sleeve (burn damage) and
exposed hair and other combustibles will be set ablaze. Metal
armor will suddenly become extremely hot as per hot metal
(burn damage).
Enemy Ascendents will be affected as wicked people, but
in each case the fire damage will be increased by 1/TN 5.
Undead will generally simply be destroyed if they are
caught in the area. Powerful undead may make a WIL test to
avoid being destroyed instantly, at RS X.
Star Vampires must make a WIL test to avoid losing all of
their abilities for 24 hours. If they fail the test by 2 or more
BS, the Vampire suffers as though set ablaze (burn damage).`
    },
    {
      name: "Wrath of God",
      description: `Smite isn’t a power fueled by Divinity. It is a fountain of
Divinity. Performing their duty to crush the wicked and the
depraved is one of the chief sources of a Paladin’s power. But
it is one thing to merely punish the wicked, and quite another
to bring their sinfulness to Genosus’ attention, and to let him
deal with it in his own way.
Wrath of God creates an explosion centered on the Paladin.
This explosion will not harm the Paladin himself, or individuals that he explicitly doesn’t want to injure, but it will harm
everything else around him, animate or inanimate. Wrath of
God automatically consumes all of a Paladin’s Divinity. Yes,
that does mean that the Paladin will perish immediately upon
using this ability, collapsing into white dust and dispersing to
the four winds by the explosion.
The explosion caused by Wrath of God has a hit value of 4,
radius equal to the Paladin’s Divinity, and causes 1 damage
per point of Divinity. This is bludgeoning damage, and also
inflicts burn damage of 3/TN 5 that burns for 3 rounds to any
hit location that suffers damage from the explosion. The burn
damage can be avoided if a character benefits from enough
cover that a hit location’s damage from the explosion itself is
reduced to 0, in which case that hit location suffers no burn
damage either.
Individuals killed or enemies destroyed by Wrath of God
can never give a Paladin Divinity. Essentially, it doesn’t count
as the Paladin killing them. It’s Genosus doing the heavy
lifting for once.`
    },
    {
      name: "I See You",
      description: `Paladins do not have any special ability to tell if someone
is an infidel or a heretic just by looking at them. However, a
Paladin can ‘mark’ any living thing that he would be able to
use Smite on as an enemy of Genosus. This involves touching
the target in any way—even just a light brush in passing will
do—and willing it to be so.
When this is done, the Paladin must spend 1 Divinity,
and assign a ‘name’ to the target. It doesn’t have to be the
thing’s real name, but as long as the Paladin associates that
name with it, that is enough. From then on, whenever ANY
Paladin thinks of the name assigned to this marked target
while concentrating, they will feel a pulling sensation in the
direction that the target is, varying in strength depending
on distance.
Two targets cannot share a name. If a Paladin attempts to
use a name that is already taken, it doesn’t stick. Of course,
once a target has been destroyed, its name is up for grabs
again.
The marked subject may not be initially aware of this
effect, but just as the Paladin feels a tugging sensation
towards his target, the target will itself become aware of the
Paladin. Sometimes this manifests in the same way it does for
the Paladin—a tugging sensation on the ear or tongue—other
times it manifests as phantasmal sounds.
Generally this effect is disturbing, and even if they don’t
realize that it signifies a Paladin’s coming, the marked individual will generally be aware that something bad is on its way.
Examples include the creaking of chains that grows louder
and more frantic as the Paladin approaches; the beating of
drums and chanting, growing more furious
as the Paladin approaches; a tugging
sensation on the tongue, and whispers that intensify as the Paladin
approaches; and a pleasant
tune in the distance that
grows more distorted
and ominous as the
Paladin approaches.`
    },
  ]
}, {
  name: "Dessian Silver Guard",
  tier: 5,
  attributeMods: [
  ],
  characteristics: [
    {
      name: "Perfect",
      description: `Silver Guards cannot begin play with any sort of bane that
would physically cripple them, such as scars, missing limbs,
old wounds, lasting pain, lost eyes, brain damage, and so on.
These banes may be gained during play, but cannot normally
occur at Character Creation. At the GM’s discretion, a Silver
Guard may have acquired an injury during his career after
emerging from the gate, and so may have one or more of these
banes, but the cost of the bane is halved for the purposes
of boons and banes points at Character Creation. For the
purpose of buying off banes, they are counted at the standard cost.
Silver Guards, like Paladins, cannot be Complete Monsters,
because they must have a Faith arc in order for them to
become Ascendants.
Unlike Paladins and the Sarturi Chosen, Silver Guards
cannot take any sort of bane that would displease the judging
eyes of their mother. They are chosen specifically for their
looks. They cannot take the Skinny, Fat, or Ugly banes.`
    },
    {
      name: "Moonlit Twostep",
      description: `The Silver Guard is not constrained by physical laws in the
same way men are. They move with an unearthly grace, sometimes seeming to glide rather than walk, and in battle, they
can briefly gain altitude and launch themselves like birds of
prey down upon their enemies.
Silver Guards gain a +4 bonus to their MOB for the
purposes of movement and for mobility maneuvers, as well
as a +2 bonus to skill and attribute tests made to jump, climb,
maneuver, or otherwise move. A Silver Guard may spend
1 Divinity to perform the Soaring Charge maneuver
in the first move of combat if his orientation is
aggressive.`
    },
    {
      name: "Mark of the Moon",
      description: `A Silver Guard can ‘Mark’ an individual as an ‘Adherent’ if
they are a true believer in Bocanadessia. This has no cost,
and can be done to any willing individual who has a Faith
arc that venerates Bocanadessia, or who is willing to convert
(the act of Marking instills a new and virtually unshakeable
faith in the individual), and isn’t a Complete Monster. Being
a Complete Monster prevents this ability from working.
Marking an Adherent involves putting a hand on their head
or face, and willing it to be so.
Marked Adherents gain a spectral imprint of a handprint and a moon (in the phase that it was in at the time the
Adherent was Marked) that can only be seen by Ascended
Humans. Paladins and Sarturi Chosen can see it as well.
Marked Adherents gain the following benefits so long as they
remain true to their faith:
 They have a +2 bonus to their HLT for the purpose of
resisting disease, poison, or bleed.
 They can hear the Song of the Moon more clearly.
 They can be granted Succor by any Silver Guard.
 They gain double the normal amount of arc points for
following their Faith.
The downsides, though, are noteworthy:
 If their Faith ever changes from the pure veneration of
Bocanadessia, the Moon-mark on their face will explode.
This will inflict bludgeoning damage equal to the Silver
Guard’s WIL, to the part of the Adherent’s body that the
mark is on. This damage is not reduced by TOU or armor,
but if the Adherent’s WIL is higher than the Silver Guard’s,
than the difference between the two scores is subtracted
from the damage received (that is, if the Adherent has
8 WIL and the Silver Guard has 5 WIL, then the damage
is reduced by 3, bringing it down from 5 to 2). If they
somehow survive this, they are no longer an Adherent.
 If the Silver Guard who Marked the Adherent gives the
Adherent an order, the Adherent must pass a WIL test at
an RS equal to the Silver Guard’s WIL in order to not obey
it. This includes an order to, say, ‘drop dead’ or ‘swallow
that carving knife.’
 If the Silver Guard is killed violently, all of his Adherents
must make a HLT test at 5 RS or die instantly. One Adherent
at random may be spared from this fate per point of Divinity
the Silver Guard had in his repository when he died (so, if
a Silver Guard has 30 Adherents and 25 Divinity, and is
crushed by a boulder, only 5 of his Adherents will have to
make HLT tests).
Marking can be removed by other Ascendants without triggering the death of the Adherent. The Adherent doesn’t need
to be willing, but the Ascendant must spend 15 Divinity,
and put their hand over the Mark. Then, a WIL contest is
made between the other Ascendant and the Silver Guard
who Marked the Adherent. If the Ascendant is successful,
the Adherent’s Mark is removed. If their Faith was changed
by the Marking, it is now changed back to what it originally
was. The Silver Guard may voluntarily fail this test—but why
would they?`
    },
    {
      name: "Moonstrike",
      description: `When a Silver Guard performs a melee maneuver that inflicts
damage (such as Swing and Thrust, though Shoot and
Melee Shoot do not count) he can declare that attack
to be a Moonstrike.
If the Moonstrike inflicts a wound of any sort,
the attack also inflicts cold damage (equal to
the Silver Guard’s WIL score) to the attack’s
hit location.
If the target of this ability is another
Ascendant, they can negate (or reduce the effects
of) Moonstrike by spending Divinity of their own, on a
1-for-1 basis.
The Silver Guard may spend any amount of Divinity. Each
point of Divinity spent has the following effects:
 The victim suffers 1 point of cold damage randomly allocated on the body;
 The victim loses the ability to benefit from one of his arcs
for one month, or until any Silver Guard grants him Succor
(this effect can stack); and
 The Silver Guard regains 1 CP.
`
    },
    {
      name: "The Moon Also Rises",
      description: `Silver Guards gain Divinity in the following ways:
 Completing a task set for the Silver Guard by Bocanadessia
or her Song grants between 1-5 Divinity, depending on the
importance or difficulty of the task (1 being a minor task
or a daily function, 5 being a great service to Dessianism
as a whole).
 Slaying or defeating any enemy of Sacred Karthack or
Bocanadessia herself grants a Silver Guard between 1-5
Divinity, depending on the severity of the threat (1 being
a minor foe, 5 being a mortal enemy of Bocanadessia).
 Each Adherent a Silver Guard has grants 1 Divinity per
month, on the night of the Eclipse.
 Marking an Adherent grants a Silver Guard 1 Divinity
immediately.`
    },
    {
      name: "The White Fog",
      description: `A Silver Guard may choose to passively drain the heat out of an
area around himself, and to cause a mist to envelop the area,
reducing visibility by one lighting stage. If there are multiple
Silver Guards and their fields of White Fog overlap, visibility
is reduced by one lighting stage per field overlapping. Silver
Guards and their Adherents can see through this fog clearly,
though they cannot normally see in the dark. Additionally,
within this area, the ambient temperature drops significantly.
As before, if there are multiple Silver Guards creating fields
of White Fog, the effects combine. Light sources still function
in the White Fog, but the range that the light carries is halved,
and weak flames, like candles, may be extinguished.
Additionally, any burn damage inflicted in the White Fog
has its duration reduced by 1 per overlapping field of White
Fog, to a minimum of 1 round of burning.
Any missile attack or explosion that would affect a Silver
Guard in the White Fog treats the White Fog as cover with an
AV value equal to the Silver Guard’s WIL, +1 per overlapping
White Fog from other Silver Guards.
The size of the White Fog field depends on the current
climate and time of day. By default, the area has a radius of
50 yards`
    },
    {
      name: "Forcible Marking",
      description: `It is actually possible to forcibly turn someone into an
Adherent, but this is a secret that most Silver Guards would
rather not be revealed, and not many of them are capable of
it to begin with; only the most powerful can do it.
This ability is not available to regular Silver Guards, but
can be purchased for 50 arc points. Performing it requires
the expenditure of Divinity equal to the WIL of the victim,
and an additional expenditure of X. The Silver Guard must
successfully grasp the victim’s face (trapping the head in a
grapple would work) before doing this.
The victim must make a WIL test at RS equal to X, or
become an Adherent against his will, complete with faith
in Bocanadessia. While generally the new Adherent will still
remember, and be confused by the fact that they weren’t an
Adherent until a few moments ago, the use of Succor to drain
away their negativity can keep them under control.
This ability cannot be used on characters with the
Complete Monster bane.`
    },
    {
      name: "A Thousand Stars, One Moon",
      description: `A Silver Guard can cause their Adherents to become stronger
by spending Divinity. This allows Silver Guards who are
leaders in war to empower their armies. It also has domestic
uses. Silver Guards can empower groups of farmers or laborers
in a similar manner.
Each point of Divinity spent has the following effects,
which last for 1 hour, at which time the Silver Guard must
pay the cost again to sustain the effects:
 Increase one core attribute by 1 point per point of Divinity
(Silver Guard may choose how these points are distributed);
 Increase pain resistance by 1 per point of Divinity;
 Ignore 1 point of total bleed per point of Divinity; and
 Complete immunity to cold or cold-related damage for the
full duration.`
    },
    {
      name: "Succor",
      description: `Silver Guards have the ability to grant healing to their
Adherents (or the Adherents of other Silver Guards) through
the use of Divinity. This is not as powerful as Paladin healing—
the Silver Guard cannot instantly close wounds, nor can they
regrow lost limbs, and it cannot be used on the Silver Guard
himself. However, it is much easier for the Silver Guard to do.
A Silver Guard can cure most diseases by praying over the
kneeling or prostrate Adherent, and then laying a hand on
the spectral brand they are marked with. This costs 0 Divinity
if the disease is something non-fatal but merely unpleasant,
and 1 Divinity if the disease is potentially or actively lethal.
A Silver Guard may cause a physical injury to heal at
double the normal speed by spending 1 Divinity per 2 levels
of the wound. Frostbite and other cold-related injuries can be
cured immediately at no Divinity cost. The infection chance
of such a wound is reduced by 4. Finally, for no Divinity cost, a Silver Guard can take away
all negative thoughts, emotions, or painful memories away
from an Adherent, by holding their head and willing it to
be so. An ethereal white mist emerges from the Adherent’s
mouth and nose, and enters the Silver Guard. The Adherent
will forget all of his negativity, while the Silver Guard will
have to bear it himself. Silver Guards live with some of the
most soul-crushingly horrific knowledge to begin with, the
petty problems of the un-Ascended are so trivial that most
Silver Guards wouldn’t notice.
After about a month, the memories taken away will start
to return, but can be relieved again through another Succor.`
    },
  ]
}];

/*
{
  name: "",
  tier: 1,
  attributeMods: [{
      name: 'Strength',
      value: 0
    },
    {
      name: 'Agility',
      value: 0
    },
    {
      name: 'Endurance',
      value: 0
    },
    {
      name: 'Health',
      value: 0
    },
    {
      name: 'Willpower',
      value: 0
    },
    {
      name: 'Wit',
      value: 0
    },
    {
      name: 'Intelligence',
      value: 0
    },
    {
      name: 'Perception',
      value: 0
    }
  ],
  characteristics: [{
      name: "",
      description: ``
    },
  ]
}
*/
