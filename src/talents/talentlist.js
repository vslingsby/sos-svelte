export const talentList = [{
  "name": "GOOD FORM",
  "description": "A long time spent in mindful practice will save you in thebrief time you finally need it.",
  "requirements": "Requirements: Melee proficiency",
  "effect": "Effect: You may pick this talent multiple times. Pick a newmaneuver each time. Pick an advanced maneuver youcan perform that has an activation cost of X+1 or greater.Reduce it by 1, to a minimum of X (remember that superiormaneuvers count as advanced!)."
}, {
  "name": "SHIELD BREAKER",
  "description": "You have a knack for smashing shields, and have practicedat sundering them to deprive your enemies of their defenses.",
  "requirements": "Requirements: 1H or 2H blunt proficiency",
  "effect": "Effect: You inflict +2 damage when making Hew attacks."
}, {
  "name": "FORTITUDE",
  "description": "Whether it’s an iron jaw, extreme perseverance, or not muchof a brain to get concussed, you shrug off blows that leavelesser fighters out cold.",
  "requirements": "Requirements: END 5",
  "effect": "Effect: You gain a +2 bonus to KO checks."
}, {
  "name": "HELMSPLITTER",
  "description": "Just ask Charles Burgundy how much that sallet is worth.",
  "requirements": "Requirements: Melee proficiency, 6 STR, school level 10",
  "effect": "Effect: Whenever you Power Attack with a Swing to the heador neck, you inflict an additional +1 damage per CP spent."
}, {
  "name": "NIGHT FIGHTER",
  "description": "You think darkness is your ally?",
  "requirements": "Requirements: PER 5",
  "effect": "Effect: Reduce the CP penalties for dark lighting conditionsby -25% (for example, -75% to -50%, or -50% to -25%)."
}, {
  "name": "IRONWALL",
  "description": "You’re hard to dislodge from your feet. It takes a singular forceto put you on the ground.",
  "requirements": "Requirements: END 5",
  "effect": "Effect: You gain a +2 bonus to stability checks made to avoidfalling over, or being shoved, pushed, or dislodged fromyour position."
}, {
  "name": "HEAD GUARD",
  "description": "You’ve got a good handle on protecting your head. The head isthe most commonly armored part of the body, and for goodreason: it’s the obvious place to attack, and it’s not far fromarm-level, making it convenient as well.",
  "requirements": "Requirements: Melee proficiency",
  "effect": "Effect: When making a Parrying maneuver to defend againstan attack aimed at your head, face, or neck target zones,you may add 2 dice to the roll. This does not let you Parryif you have no CP remaining."
}, {
  "name": "WEAPON PRIMACY",
  "children": [{
    "name": "I. The Basics",
    "description": "You have trained long and hard in the use of a specific weapon.",
    "requirements": "Requirements: Melee proficiency",
    "effect": "Effect: You may pursue this talent tree multiple times: choosea new weapon each time. Choose a specific weapon of aproficiency in your school (for example, the 1H SwordArming Sword (Late)). When wielding that specificweapon, you gain +1 CP."
  }, {
    "name": "II. The Second Step",
    "description": "You have reached a level of expertise with your chosenweapon few can rival.",
    "requirements": "Requirements: The Basics talent, school level 10",
    "effect": "Effect: Same as The Basics, except the bonus is +2 CP."
  }, {
    "name": "III. The Final Mystery",
    "description": "Welcome to it.",
    "requirements": "Requirements: The Second Step talent, school level 15",
    "effect": "Effect: Same as The Second Step, except the bonus is +3 CP."
  }]
}, {
  "name": "CALLED SHOT",
  "children": [{
    "name": "I. Accuracy",
    "description": "You tend to get the tip of your weapon where it needs to go.",
    "requirements": "Requirements: Melee proficiency",
    "effect": "Effect: When rolling for a hit location with a weapon meleeattack, you may alter your roll up or down by 1. If yourtarget has talents in the Rapid Reaction tree, they usetalents from that tree after you use ones from this tree."
  }, {
    "name": "II. Superior Accuracy",
    "description": "You’re really good at Five Finger Fillet.",
    "requirements": "Requirements: Accuracy talent, AGI 6",
    "effect": "Effect: Before rolling for the hit location with a weaponmelee attack, you may call out a possible hit location. Ifyour modified roll hits that location, your attack gets +1damage. Attacks that automatically hit a particular areawithout a hit location roll may always claim this bonus."
  }, {
    "name": "III. Surgical Precision",
    "description": "You’ve never had to try twice to thread a needle.",
    "requirements": "Requirements: Superior Accuracy talent, AGI 8",
    "effect": "Effect: Same as Accuracy, but you may instead alter it up ordown by up to 2."
  }]
}, {
  "name": "MOMENTUM",
  "children": [{
    "name": "I. Flourishing Drills",
    "description": "Long hours practicing the basics has given you momentumbehind your strikes.",
    "requirements": "Requirements: Melee proficiency, school level 6",
    "effect": "Effect: If you made a Swing attack last move, declaring a Swingattack instantly refreshes you 1 CP. You may add this CPto your Swing. You can only get this bonus once per move."
  }, {
    "name": "II. Blazing Steel",
    "description": "Like a dervish, you can unleash a flurry of cuts seeminglywithout delay.",
    "requirements": "Requirements: Flourishing Drills talent, school level 12",
    "effect": "Effect: Same as Flourishing Drills, but the refresh is increasedto 2 CP."
  }, {
    "name": "III. The Cross-Cut Art",
    "description": "Wolodyjowski would be proud.",
    "requirements": "Requirements: Blazing Steel talent, school level 15",
    "effect": "Effect: Same as Blazing Steel except the refresh is increasedto 3 CP."
  }]
}, {
  "name": "SWIFT SWORD",
  "children": [{
    "name": "I. True Time",
    "description": "Hand. Body. Foot. Move in that order or move not at all.",
    "requirements": "Requirements: Melee proficiency",
    "effect": "Effect: You gain a +1 bonus to initiative tests when using amelee weapon."
  }, {
    "name": "II. The Geometry of Violence",
    "description": "Speed and violence. Violence and speed.",
    "requirements": "Requirements: True Time talent, AGI 6",
    "effect": "Effect: If you tie on an initiative test, you and your opponentmay pick up a dice and roll off. Whoever rolls higher winsthe initiative test. If it’s a tie, then the test is a tie afterall! If both characters have this talent, it cancels out, andneither gains any benefit from it."
  }, {
    "name": "III. Murderous Speed",
    "description": "Faster than blasphemy.",
    "requirements": "Requirements: The Geometry of Violence talent, school level 12",
    "effect": "Effect: You gain the Murderous Speed ability, exactly like anOhanedin. In the orientation declaration stage of combat,you do not have to declare which orientation you are notthrowing. Additionally, True Time’s bonus raises to +2.If you are already an Ohanedin, True Time’s bonus raisesto +3 instead of +2."
  }]
}, {
  "name": "RAPID REACTION",
  "children": [{
    "name": "I. Quick Reflexes",
    "description": "You’re pretty good at twitching your body away from the tipof a weapon.",
    "requirements": "Requirements: Melee proficiency",
    "effect": "Effect: When struck by a weapon melee attack, you may alterthe hit location roll up or down by 1. If your attacker hastalents in the Called Shot tree, they use talents from thattree before you use ones from this tree."
  }, {
    "name": "II. Lightning Reflexes",
    "description": "You don’t need armor there if you don’t get hit there.",
    "requirements": "Requirements: Quick Reflexes talent, WIT 6",
    "effect": "Effect: Before your opponent rolls for the hit location with aweapon melee attack, you may call out a possible hit location. If the modified roll hits that location, their attack gets-1 damage. Attacks which automatically hit a particular areawithout a hit location roll may always suffer this penalty."
  }, {
    "name": "III. Preternatural Reflexes",
    "description": "You’re putting mongeese out of business. Wait. Mongooses?",
    "requirements": "Requirements: Lightning Reflexes talent, WIT 8",
    "effect": "Effect: Same as Quick Reflexes, but you may instead alter it upor down by up to 2."
  }]
}, {
  "name": "AKIMBO",
  "children": [{
    "name": "I. Rapid Strike",
    "description": "Shields are for suckers. Double the pleasure, double the pain.",
    "requirements": "Requirements: Melee proficiency, AGI 5",
    "effect": "Effect: When you make a Simultaneous maneuver involvingtwo weapons, add +1 to your main-hand maneuver."
  }, {
    "name": "II. Rapid Rechamber",
    "description": "You’re very skilled at attacking with one weapon whilethe other returns to an ideal position to strike from, andrepeating this over and over to strike fast, hard, and often.",
    "requirements": "Requirements: Rapid Strike talent, AGI 6",
    "effect": "Effect: Same as Rapid Strike, but now you get a +1 to bothmaneuvers."
  }, {
    "name": "III. Twin Lightning",
    "description": "Your kind are often called “river stones,” because you neverstop tumbling.",
    "requirements": "Requirements: Rapid Rechamber talent, AGI 8",
    "effect": "Effect: Whenever you resolve a Simultaneous maneuverinvolving two weapons, you regain 2 CP immediatelyafterwards"
  }]
}, {
  "name": "COMBAT KICK",
  "children": [{
    "name": "I. Gastrizein",
    "description": "Kicks are an indelible part of a martial arsenal. The contextsof armed combat demand bio-mechanical adjustments, butthe kicks fulfill their purpose just as well.",
    "requirements": "Requirements: Melee proficiency",
    "effect": "Effect: Your Thrusting kicks to the belly inflict +2 damage."
  }, {
    "name": "II. Chasse Bas",
    "description": "Kicks are a good method of weakening the opponent’s balanceand mobility.",
    "requirements": "Requirements: Gastrizein talent, school level 8",
    "effect": "Effect: When you Kick an opponent’s legs, you inflict +2stun with a successful hit, regardless of damage inflicted.Increase the stability test RS against being rendered proneby 1."
  }, {
    "name": "III. Spartan Sole",
    "description": "So many people forget about their legs in armed combat—attheir own peril.",
    "requirements": "Requirements: Chasse Bas talent, school level 12",
    "effect": "Effect: Same as Gastrizein, with +4 stun, +2 KO RS, and theymust make a stability check at [BS] RS or be rendered prone."
  }]
}, {
  "name": "FURIOUS FISTS",
  "children": [{
    "name": "I. Straight Blast",
    "description": "Commonly associated with Wing Chun and certain styles ofboxing, you have mastered a rapid, piston-like punching stylethat can wear down any defense. Combined with a strongcenter and good footwork, this technique can be devastating.",
    "requirements": "Requirements: Pugilism proficiency, AGI 6",
    "effect": "Effect: When making a One-Two Punch with a Straight Punchinto another Straight Punch, you may reduce the activationcost of the maneuver chained from the first by 1."
  }, {
    "name": "II. Flicker Jab",
    "description": "Your jabs are so rapid, and come from such unorthodox angles,that most opponents cannot even perceive them.",
    "requirements": "Requirements: Straight Blast talent, AGI 8",
    "effect": "Effect: If you declare a Straight Punch with fewer than 5 CP,your opponent must make a PER test at 3 RS in order toperform any sort of defense against it. You may not increasethe CP of the Straight Punch once the PER test is made."
  }, {
    "name": "III. North Star",
    "description": "No being is supposed to be able to punch that fast.",
    "requirements": "Requirements: Flicker Jab talent, STR 7, school level 15",
    "effect": "Effect: Same as One-Two Punch, but you also get +1 dice to anyPunch you make with One-Two Punch. You still must payat least 1 dice into X to use the maneuver at all, however."
  }]
}, {
  "name": "BRAWLER",
  "children": [{
    "name": "I. Dirty Fighting",
    "description": "The only good fight is the one you win.",
    "requirements": "Requirements: Pugilism proficiency",
    "effect": "Effect: Your unarmed attacks that hit the face or groin hitlocations cause +2 stun."
  }, {
    "name": "II. Dirty Trick!",
    "description": "All’s fair in love and violent homicide.",
    "requirements": "Requirements: Dirty Fighting talent, school level 7",
    "effect": "Effect: The first time in a combat you use the Blind Tossmaneuver, its TN is reduced by 1."
  }, {
    "name": "III. Dirty Rotten Cheater",
    "description": "You’ve learned how to hit the softest parts of the body, andrarely aim for anywhere else.",
    "requirements": "Requirements: Dirty Trick! talent,school level 10",
    "effect": "Effect: If you inflict any wound to anopponent with an unarmedattack, you add 1 pain perwound level."
  }]
}, {
  "name": "FISTICUFFS",
  "children": [{
    "name": "I. Clean Fighting",
    "description": "You are a more measured fighter, preferring to fight at longerranges, peppering opponents with strikes intended to wearthem down, and only striking them when they present anopening.",
    "requirements": "Requirements: Pugilism proficiency, INT 6, school level 5",
    "effect": "Effect: Your Straight Punch and Hook Punch maneuvers maybe made at +1 reach."
  }, {
    "name": "II. Queensbury Rules",
    "description": "The fight’s the thing, you know, most noble endeavor.",
    "requirements": "Requirements: Clean Fighting talent, STR 6, school level 10",
    "effect": "Effect: Your Straight Punch and Hook Punch maneuvers bothinflict +1 damage."
  }, {
    "name": "III. Stiff Upper Lip",
    "description": "Only my pride, lads. Only my pride.",
    "requirements": "Requirements: Queensbury Rules talent, WIL 6, school level 15",
    "effect": "Effect: Once per encounter, you may negate all stun inflictedby a single attack, if the amount inflicted is less than “total.”"
  }]
}, {
  "name": "KING OF THE MAT",
  "children": [{
    "name": "I. Ground Wrestler",
    "description": "You’re more practiced in grappling on the ground thanstanding. Many fighters fear this kind of fight for how quicklyit can go disastrously wrong, but you revel in it.",
    "requirements": "Requirements: Wrestling proficiency",
    "effect": "Effect: When in a Grapple, and the fight has become a groundfight, you do not suffer the TN penalty for not having initiative, and you add full STR to your SDB instead of half STR."
  }, {
    "name": "II. Iron Grip",
    "description": "We won’t ask where you learned this, but your hands have anatural affinity for necks.",
    "requirements": "Requirements: Ground Wrestler talent, STR 6",
    "effect": "Effect: Your bare hands count as a garrote for the Grapple:Choke maneuver. Additionally, opponents using Grapple:Force to free body parts you have pinned roll at +1 TN."
  }, {
    "name": "III. Electrifying Move",
    "description": "You have a way for ending fights in a dramatic fashion.",
    "requirements": "Requirements: Iron Grip talent, STR 6",
    "effect": "Effect: Once per combat, while in a Grapple, you may declarethis talent when performing a maneuver. You gain 4 bonusCP to use for that maneuver."
  }]
}, {
  "name": "SOME KINDA JUDO",
  "children": [{
    "name": "I. The Basics of CQB",
    "description": "You really like throwing people. And they told you groundgame was important—pah!",
    "requirements": "Requirements: Wrestling proficiency, school level 5",
    "effect": "Effect: Grapple: Throws you perform inflict +1 damage. If yougo prone with the target after a Grapple: Throw, you mayre-roll the target zone dice."
  }, {
    "name": "II. Sandinista Sunset",
    "description": "The kind of person who gets up after you throw them is thekind of person who deserves to be thrown again.",
    "requirements": "Requirements: The Basics of CQB talent, school level 10",
    "effect": "Effect: When you inflict any wound with Grapple: Throw, youmay spend 2 CP to force the victim to make a KO check atRS equal to the wound level inflicted or be knocked unconscious for 1d10 minutes."
  }, {
    "name": "III. Back Up, Back Down",
    "description": "It gets funnier each time you do it.",
    "requirements": "Requirements: Sandinista Sunset talent, school level 15",
    "effect": "Effect: Same as Sandinista Sunset, but the KO check RS isnow equal to twice the wound level inflicted. Additionally,when you successfully initiate a Grapple against a pronetarget (but not vice versa), you may immediately pick themup so the fight is not a ground fight."
  }]
}, {
  "name": "POWER DRAW",
  "children": [{
    "name": "I. Practice Every Day",
    "description": "You really know how to bend a bow.",
    "requirements": "Requirements: Missile proficiency, STR 5",
    "effect": "Effect: When you use a bow, it inflicts +1 damage."
  }, {
    "name": "II. Practiced Archer",
    "description": "All the practice was worth it.",
    "requirements": "Requirements: Practice Every Day talent, school level 6, STR 6",
    "effect": "Effect: Same as Practice Every Day, but the damage bonus is +2."
  }, {
    "name": "III. Hysterical Yeoman Laughter",
    "description": "It’s like regular hysterical laughter, but cider sprays out ofyour nose.",
    "requirements": "Requirements: Practiced Archer talent, school level 12, STR 7",
    "effect": "Effect: Same as Practiced Archer, but the damage bonus is +3and you gain 5 range."
  }]
}, {
  "name": "LIGHTNING ARCHERY",
  "children": [{
    "name": "I. Swift Arm",
    "description": "You’re pretty good at putting arrows in the air fast.",
    "requirements": "Requirements: Bow proficiency",
    "effect": "Effect: The penalty for Rapid Shot is reduced by 1."
  }, {
    "name": "II. Rapid Twang",
    "description": "You have learned special techniques to shoot rapidly.",
    "requirements": "Requirements: Swift Arm talent, school level 10",
    "effect": "Effect: Same as Swift Arm, but the penalty is reduced by 2,and your maximum number of arrows shot by Rapid Shotis increased by 1."
  }, {
    "name": "III. Like a Harp",
    "description": "You can shoot ten arrows before the first hits the ground.",
    "requirements": "Requirements: Rapid Twang talent, school level 15",
    "effect": "Effect: Same as Rapid Twang, but the penalty is reduced by 3,and your maximum number of arrows shot by Rapid Shotis increased by 2."
  }]
}, {
  "name": "JAVELINEER",
  "children": [{
    "name": "I. Boar Piercer",
    "description": "You can REALLY throw javelins.",
    "requirements": "Requirements: Throwing weapon proficiency",
    "effect": "Effect: Javelins you throw inflict +1 damage."
  }, {
    "name": "II. Bear Piercer",
    "description": "We never go hungry around here.",
    "requirements": "Requirements: Boar Piercer talent, school level 8",
    "effect": "Effect: Same as Boar Piercer, but +2 damage, and +5 range."
  }, {
    "name": "III. Elephant Piercer",
    "description": "The first weapon ever fashioned—and still the best.",
    "requirements": "Requirements: Bear Piercer, school level 12",
    "effect": "Effect: Same as Bear Piercer, but +3 damage and +10 range."
  }]
}, {
  "name": "KNIFE THROWING",
  "children": [{
    "name": "I. Flick of the Wrist",
    "description": "Well, it’s going to end up in the enemy anyway...",
    "requirements": "Requirements: Throwing weapon proficiency",
    "effect": "Effect: When you throw a knife, chakram, or other smallmissile weapon, it inflicts +1 damage."
  }, {
    "name": "II. Straight Throw",
    "description": "It flies harder this way.",
    "requirements": "Requirements: Flick of the Wrist talent, school level 8",
    "effect": "Effect: If you are within one range increment of the target,you throw knives, daggers, chakrams, or other smallmissile weapons at -1 TN."
  }, {
    "name": "III. More is Better",
    "description": "Why throw one at once, when you could throw two?",
    "requirements": "Requirements: Straight Throw talent, school level 15",
    "effect": "Effect: If you are within one range increment of the target,you may throw two knives or other small missile weapons(rolling full dice for each) at the same target any time youwould throw one."
  }]
}, {
  "name": "CUTTHROAT",
  "children": [{
    "name": "I. A Loathsome Tactic!",
    "description": "Someone has to do it, you’re an expert at killing people frombehind.",
    "requirements": "Requirements: Dagger proficiency, school level 5",
    "effect": "Effect: If outflanking a target with S-Reach or shorter weapon,your Swings and Thrusts in the first round inflict +2 damage."
  }, {
    "name": "II. No, Not Like That, Idiot",
    "description": "A running man can slit a thousand throats in one night.",
    "requirements": "Requirements: A Loathsome Tactic! talent, school level 10",
    "effect": "Effect: If outflanking a target with an S-Reach or shorterweapon, you refresh [half BS] CP of each of your successfulattacks in the first round."
  }, {
    "name": "III. You Are Like a Little Baby, Watch This",
    "description": "What the hell happened to you as a child?",
    "requirements": "Requirements: No, Not Like That, Idiot talent, school level 15",
    "effect": "Effect: If outflanking a target with an S-Reach or shorterweapon, reduce your attack TN by 2 for the first round."
  }]
}, {
  "name": "SPEARMASTER",
  "children": [{
    "name": "I. Slowpoke",
    "description": "Getting past the range of a spear is hard. You know how tomake it harder.",
    "requirements": "Requirements: Spear proficiency or polearm proficiency",
    "effect": "Effect: When using a spear or polearm, and your opponentmakes an attack that would change the combat reach fromyour weapon reach or further, to inside your weapon reach,that attack has an additional 1-dice activation cost."
  }, {
    "name": "II. Ordo Dracul",
    "description": "Like ol’ Uncle Vlad, you’ve got a thing for impaling people.",
    "requirements": "Requirements: Slowpoke talent",
    "effect": "Effect: Your Thrusting attacks made with spears inflict +1damage."
  }, {
    "name": "III. Kebab Master",
    "description": "Your capabilities with the spear are compelling proof that Godis a lancer.",
    "requirements": "Requirements: Ordo Dracul talent, school level 15",
    "effect": "Effect: If you inflict a level 3 or higher wound with any sortof Thrusting attack, you regain 2 CP."
  }]
}, {
  "name": "SOARING BLADE",
  "children": [{
    "name": "I. Like a Discus",
    "description": "Oh, watch it sail!",
    "requirements": "Requirements: Throwing weapon proficiency",
    "effect": "Effect: When throwing a chakram or other disk-like weapon,you add +5 to its range."
  }, {
    "name": "II. It’s All In The Spin",
    "description": "And dad always told me I wasted my childhood skippin’ rocks.",
    "requirements": "Requirements: Like a Discus talent, school level 8",
    "effect": "Effect: When you hit targets in the limbs or neck with a disklike missile weapon, you inflict +2 damage."
  }, {
    "name": "III. Watch This",
    "description": "No seriously, watch me kill two people with this saucer.",
    "requirements": "Requirements: It’s All In The Spin talent, school level 10",
    "effect": "Effect: You may throw a disk-like weapon and have it hit onetarget and bounce into another. If a thrown missile attacksucceeds in hitting one target, and there is another withinone range increment of the first, you may resolve a secondmissile attack on that target at a -8 penalty, as the missilebounces off the first target into the second. Normal damageis inflicted both times."
  }]
}, {
  "name": "HARNISCHFECHTEN",
  "children": [{
    "name": "I. Grappling at the Sword",
    "description": "Harnischfechten is the art of (heavily) armored fighting. Allarmor has vulnerabilities—grappling and fine point controlare essential to getting at the man beneath the metal!",
    "requirements": "Requirements: Wrestling proficiency, and either 2H swordor 2H blunt proficiency",
    "effect": "Effect: If you are using a two-handed weapon, then duringa Grapple, you may treat your weapon as if it were 1 stageof reach shorter (this combines well with Half-Swording!)."
  }, {
    "name": "II. Prudence",
    "description": "If no blood is drawn then no victory is won. Give not thisvillain his trophy.",
    "requirements": "Requirements: Grappling at the Sword talent",
    "effect": "Effect: If your opponent succeeds with a damaging attack butfails to do enough damage to cause a wound, you may pay2 CP. If you do, the range of combat does not change to theattacker’s reach. Afterwards you may pay a final 1 CP tomove 1 reach closer or further."
  }, {
    "name": "III. And Stab Him Where?",
    "description": "In the ass! Not exactly gentlemanly; armored fights rarely are.",
    "requirements": "Requirements: Prudence talent, school level 10",
    "effect": "Effect: Your Joint Thrusts do full BS damage instead of half BS.If you are at M-range or shorter, you may target the upperback and lower back with Joint Thrusts."
  }]
}, {
  "name": "HEAVY ARMOR",
  "children": [{
    "name": "I. Eager Minnow",
    "description": "Zealous maintenance and personal modifications make yourarmor’s fit superb.",
    "requirements": "Requirements: Melee proficiency",
    "effect": "Effect: You gain a +2 CAR bonus for encumbrance purposes.Additionally, you may raise or lower movable visors at thestart of any move with no cost."
  }, {
    "name": "II. Tireless Lobster",
    "description": "It’s almost like a second skin.",
    "requirements": "Requirements: Eager Minnow talent",
    "effect": "Effect: Same as Eager Minnow, but the bonus is raised to +4CAR. Additionally, wearing armor long-term and sleepingin armor no longer causes you any penalty."
  }, {
    "name": "III. Unstoppable Shark",
    "description": "You are a god of the battlefield treading in heavy soles!",
    "requirements": "Requirements: Tireless Lobster talent, END 6",
    "effect": "Effect: Joint Thrusts made against you have a +2 activation cost.You also get 1 additional automatic success on all stabilityrolls inflicted by opponents in combat."
  }]
}, {
  "name": "LIGHT ARMOR",
  "children": [{
    "name": "I. Movement Efficiency",
    "description": "The best armor is not getting hit in the first place.",
    "requirements": "Requirements: Melee proficiency, AGI 5",
    "effect": "Effect: If you are unencumbered, your successful Void maneuvers always take initiative."
  }, {
    "name": "II. Roll With It",
    "description": "When you DO get hit, you know how to roll with the blows.",
    "requirements": "Requirements: Movement Efficiency talent, AGI 6",
    "effect": "Effect: If you are unencumbered, not prone, and hit by anattack that would inflict less than a level 5 wound, you mayimmediately go prone to reduce the damage of the attackby 2. Suffer all the usual effects of going prone."
  }, {
    "name": "III. Superior Void",
    "description": "You don’t even remember what it’s like to fear being hit.",
    "requirements": "Requirements: Roll With It talent, AGI 8, school level 15",
    "effect": "Effect: If you unencumbered, your Void maneuvers are madeat -1 TN."
  }]
}, {
  "name": "SHIELD TACTICS",
  "children": [{
    "name": "I. Quick Feet",
    "description": "Shields can only protect so much, so it’s important to beaware of one’s vulnerabilities.",
    "requirements": "Requirements: Melee proficiency",
    "effect": "Effect: If your shield is high and your opponent attacksyour legs or groin, or if your shield is low and youropponent attacks your head or neck, they must add1 to their maneuver’s activation cost."
  }, {
    "name": "II. The Wall",
    "description": "Oh. Maybe shields can protect everything.",
    "requirements": "Requirements: Quick Feet talent, school Level 8",
    "effect": "Effect: The same as Quick Feet, except that the activation costis increased to 2, and the enemy must also add 1 to theiractivation cost if they attack an area that does not alreadyincur the above cost."
  }, {
    "name": "III. Flicker Stab",
    "description": "Being able to hide your weapon behind your shield gives youan advantage.",
    "requirements": "Requirements: The Wall talent, school level 15",
    "effect": "Effect: If you are using a M-reach weapon or shorter witha shield and make a Thrust attack with 5 CP or less, youropponent must make a PER test at 3 RS to be able todefend. They make this test immediately after your attackdeclaration."
  }]
}, {
  "name": "SLIPPERY",
  "children": [{
    "name": "I. Tricky Bastard",
    "description": "You’re pretty good at not getting caught.",
    "requirements": "Requirements: school level 5",
    "effect": "Effect: Your MOB is increased by 2 for the purposes of ThreadThe Needle."
  }, {
    "name": "II. You’ll Never Catch Me!",
    "description": "You’re really good at not getting caught.",
    "requirements": "Requirements: Tricky Bastard talent, school level 10",
    "effect": "Effect: Same as Tricky Bastard, but the MOB bonus is +4."
  }, {
    "name": "III. Walking Aneurysm",
    "description": "Enemy officers have to take vacations after facing you.",
    "requirements": "Requirements: You’ll Never CatchMe! talent, school level 15",
    "effect": "Effect: Same as You’llNever Catch Me!, butthe MOB bonus is +6."
  }]
}, {
  "name": "RADICAL HORSE DEFENSE",
  "children": [{
    "name": "I. Skill in the Saddle",
    "description": "You are skilled at avoiding being killed on horseback.",
    "requirements": "Requirements: Melee proficiency, Riding level 4",
    "effect": "Effect: Melee attacks aimed at you while you are mountedhave a +1 activation cost."
  }, {
    "name": "II. Cossack Drag",
    "description": "You can move around a galloping horse like a rodeo acrobat.",
    "requirements": "Requirements: Skill in the Saddle talent, Riding level 6",
    "effect": "Effect: Voids you make while mounted are at -1 TN."
  }, {
    "name": "III. Born to Ride!",
    "description": "People like you set back agrarianism by millennia.",
    "requirements": "Requirements: Cossack Drag talent, Riding level 8",
    "effect": "Effect: Your Mounted Disengage and Lean now resolve at TN 7."
  }]
},
{
  "name": "HORSE ARCHER",
  "children": [{
    "name": "I. Born in the Saddle",
    "description": "It’s easier to teach a rider to shoot than a shooter to ride.",
    "requirements": "Requirements: Missile proficiency, Riding level 5",
    "effect": "Effect: The Shoot penalty for being on horseback is reduced by 2."
  }, {
    "name": "II. Parthian Shot",
    "description": "You can time your shots to the gaps in the horse’s gait.",
    "requirements": "Requirements: Born in the Saddle talent, Riding level 8",
    "effect": "Effect: Same as Born in the Saddle, but the penalty is reduced by 4."
  }, {
    "name": "III. Call of the Steppe",
    "description": "Where the sky is open, the horse and bow shall reign eternal",
    "requirements": "Requirements: Parthian Shot talent, Riding level 10",
    "effect": "Effect: Same as Parthian Shot, but the penalty is reduced by 6."
  }]
}]


/*
{
  name: "",
  description: ``,
  requirements: "",
  effect: ``,
}
{
  name: "",
  children: [
  {
  talent goes here
}
]
}
*/
