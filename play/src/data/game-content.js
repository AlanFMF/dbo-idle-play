import { huntPreviewV2018ByMonsterKey } from './generated/hunt-previews-v2018.js';
import { huntPreviewByMonsterKey } from './generated/hunt-previews-v2014.js';
import { senzuItems } from './generated/senzu-items-v2007.js';
import { authoritativeNpcs } from './generated/absolute-npcs-v2000.js';
import { authoritativeQuests } from './generated/absolute-quests-v2000.js';
import { authoritativeItemCatalog } from './generated/absolute-items-v1800.js';
import {
  authoritativeMonsters,
  authoritativeMonsterSpawns
} from './generated/absolute-monsters-v1700.js';
import {
  talkactionTransformationChains,
  talkactionStandardTransitions,
  talkactionSpecialTransitions
} from './generated/talkaction-transformations.js';
import { expandedCharacters } from './generated/absolute-vocations.js';
import {
  applyWodboVocationCatalog,
  pendingWodboVocationDefinitions,
  wodboVocationCatalog,
  wodboPendingVocations
} from './generated/wodbo-vocations-v21260.js';
import { authoritativeSpells } from './generated/absolute-spells-v1600.js';
import { spellSourceOverridesV2021 } from './generated/spell-source-overrides-v2021.js';
import { spellSourceVisualsV2022 } from './generated/spell-source-visuals-v2022.js';
import {
  rebornQuestDefinition,
  rebornQuestStages,
  rebornVocationMap
} from './generated/reborn-quest-v2032.js';
import { absoluteItemCatalog, absoluteZones } from './generated/absolute-content.js';
import {
  derivedCombatStats,
  defaultSkills,
  characterXpRequired
} from '../core/skills/skills.js';
import { maxResources } from '../core/balance/absolute-balance-engine.js';

// A handful of monster lookTypes ship with a fully blank spritesheet in
// the main asset pack (an upstream extraction failure, confirmed by
// inspecting the actual pixels — the files load fine, they're just
// empty). The exact same lookTypes have a real, clean portrait sitting
// in the exact-transformations pack instead, so hunt-preview thumbnails
// use that. The in-arena animated sprite gets the equivalent fix in
// hunt-arena-renderer.js's patchBlankMonsterOutfits. lookType 118 has no
// art in either pack; it borrows 119's portrait as the closest
// available stand-in rather than showing nothing.
const BLANK_LOOKTYPE_PORTRAITS = Object.fromEntries(
  [14, 15, 16, 29, 30, 41, 42, 43, 78, 79, 105, 119, 604, 808, 828, 829]
    .map(lookType => [
      lookType,
      `./assets/generated/exact-transformations/portraits/${lookType}.png`
    ])
    .concat([[118, './assets/generated/exact-transformations/portraits/119.png']])
);

export const characters = {
  goku: {
    id: 'goku', name: 'Goku', sprite: './assets/generated/portraits/goku.webp', outfitId: 'goku',
    vocationSourceId: 1,
    aptitudes: {"strength": 1.25, "kiBlasting": 0.89, "kiLevel": 0.872, "healing": 0.845},
    base: { hp: 120, ki: 110, attack: 10, defense: 6, speed: 1.04, hpPerLevel: 9, kiPerLevel: 8, attackPerLevel: 1.15, defensePerLevel: 0.55 },
    forms: [
      { id: 'base', name: 'Base', level: 1, multiplier: 1 },
      { id: 'kaioken', name: 'Kaioken', level: 10, multiplier: 1.55 },
      { id: 'ssj', name: 'Super Saiyajin', level: 25, multiplier: 2.3 },
      { id: 'ssj2', name: 'Super Saiyajin 2', level: 50, multiplier: 3.4 }
    ]
  },
  vegeta: {
    id: 'vegeta', name: 'Vegeta', sprite: './assets/generated/portraits/vegeta.webp', outfitId: 'vegeta',
    vocationSourceId: 17,
    aptitudes: {"strength": 1.25, "kiBlasting": 0.89, "kiLevel": 0.872, "healing": 0.845},
    base: { hp: 115, ki: 105, attack: 11, defense: 5, speed: 1.03, hpPerLevel: 8, kiPerLevel: 8, attackPerLevel: 1.22, defensePerLevel: 0.50 },
    forms: [
      { id: 'base', name: 'Base', level: 1, multiplier: 1 },
      { id: 'ssj', name: 'Super Saiyajin', level: 25, multiplier: 2.25 },
      { id: 'majin', name: 'Majin Vegeta', level: 55, multiplier: 3.55 }
    ]
  },
  gohan: {
    id: 'gohan', name: 'Gohan', sprite: './assets/generated/portraits/gohan.webp', outfitId: 'gohan',
    vocationSourceId: 57,
    aptitudes: {"strength": 1.25, "kiBlasting": 0.89, "kiLevel": 0.872, "healing": 0.845},
    base: { hp: 130, ki: 115, attack: 9, defense: 7, speed: 1.01, hpPerLevel: 10, kiPerLevel: 9, attackPerLevel: 1.05, defensePerLevel: 0.65 },
    forms: [
      { id: 'base', name: 'Base', level: 1, multiplier: 1 },
      { id: 'ssj', name: 'Super Saiyajin', level: 25, multiplier: 2.2 },
      { id: 'mistico', name: 'Místico', level: 60, multiplier: 3.8 }
    ]
  }
};

export const zones = [
  {
    "id": "earth-outskirts",
    "name": "Arredores de Earth",
    "description": "Área inicial original com Dinos e Bandits.",
    "level": 1,
    "maxLevel": 5,
    "recommended": "Níveis 1–5",
    "lureOptions": [1, 2, 3],
    "defaultLure": 1,
    "arenaTheme": "earth",
    "background": "linear-gradient(180deg,#4d6f3f,#2a3d29)",
    "monsters": [
      {
        "id": "dino",
        "name": "Dino",
        "requiredLevel": 1,
        "hp": 120,
        "sourceHp": 120,
        "attackMin": 3,
        "attackMax": 7,
        "attackInterval": 1000,
        "xp": 30,
        "speed": 250,
        "lookType": 390,
        "sprite": "./assets/generated/monster-portraits/dino.webp",
        "outfitId": "dino",
        "loot": [
          {
            "serverId": 2666,
            "chance": 100000,
            "countMax": 10
          }
        ],
        "sourceFile": "Dino.xml",
        "balanceSource": {"provider":"old.wodbo.net","matchedName":"Triceratops LvL 1","officialFields":["hp","xp"],"derivedFields":["attackMin","attackMax"]}
      },
      {
        "id": "bandit-scout",
        "name": "Bandit Scout",
        "requiredLevel": 2,
        "hp": 200,
        "sourceHp": 200,
        "attackMin": 5,
        "attackMax": 10,
        "attackInterval": 1000,
        "xp": 40,
        "speed": 200,
        "lookType": 386,
        "sprite": "./assets/generated/monster-portraits/bandit-scout.webp",
        "outfitId": "bandit-scout",
        "loot": [
          {
            "serverId": 2148,
            "chance": 100000,
            "countMax": 50
          },
          {
            "serverId": 2152,
            "chance": 25000,
            "countMax": 10
          },
          {
            "serverId": 12621,
            "chance": 1000,
            "countMax": 1
          },
          {
            "serverId": 12639,
            "chance": 1000,
            "countMax": 1
          }
        ],
        "sourceFile": "Bandit Scout.xml",
        "balanceSource": {"provider":"old.wodbo.net","matchedName":"Bandit LvL 2","officialFields":["hp","xp"],"derivedFields":["attackMin","attackMax"]}
      },
      {
        "id": "bandit-swordman",
        "name": "Bandit Swordman",
        "requiredLevel": 3,
        "hp": 280,
        "sourceHp": 280,
        "attackMin": 7,
        "attackMax": 14,
        "attackInterval": 1000,
        "xp": 75,
        "speed": 300,
        "lookType": 387,
        "sprite": "./assets/generated/monster-portraits/bandit-swordman.webp",
        "outfitId": "bandit-swordman",
        "loot": [
          {
            "serverId": 2148,
            "chance": 100000,
            "countMax": 75
          },
          {
            "serverId": 2152,
            "chance": 25000,
            "countMax": 20
          },
          {
            "serverId": 12775,
            "chance": 2500,
            "countMax": 5
          },
          {
            "serverId": 12776,
            "chance": 2500,
            "countMax": 5
          }
        ],
        "sourceFile": "Bandit Swordman.xml",
        "balanceSource": {"provider":"old.wodbo.net","matchedName":"Bandit LvL 3","officialFields":["hp","xp"],"derivedFields":["attackMin","attackMax"]}
      },
      {
        "id": "bandit-human",
        "name": "Bandit Human",
        "requiredLevel": 4,
        "hp": 350,
        "sourceHp": 350,
        "attackMin": 9,
        "attackMax": 17,
        "attackInterval": 1000,
        "xp": 90,
        "speed": 300,
        "lookType": 472,
        "sprite": "./assets/generated/monster-portraits/bandit-human.webp",
        "outfitId": "bandit-human",
        "loot": [
          {
            "serverId": 2148,
            "chance": 100000,
            "countMax": 75
          },
          {
            "serverId": 2152,
            "chance": 25000,
            "countMax": 20
          },
          {
            "serverId": 12775,
            "chance": 2500,
            "countMax": 5
          },
          {
            "serverId": 12776,
            "chance": 2500,
            "countMax": 5
          },
          {
            "serverId": 12717,
            "chance": 1000,
            "countMax": 1
          }
        ],
        "sourceFile": "Bandit Human.xml",
        "balanceSource": {"provider":"old.wodbo.net","matchedName":"Bandit LvL 4","officialFields":["hp","xp"],"derivedFields":["attackMin","attackMax"]}
      },
      {
        "id": "dinosaur",
        "name": "Dinosaur",
        "requiredLevel": 5,
        "hp": 500,
        "sourceHp": 500,
        "attackMin": 12,
        "attackMax": 22,
        "attackInterval": 1000,
        "xp": 65,
        "speed": 350,
        "lookType": 431,
        "sprite": "./assets/generated/monster-portraits/dinosaur.webp",
        "outfitId": "dinosaur",
        "loot": [
          {
            "serverId": 2666,
            "chance": 100000,
            "countMax": 10
          },
          {
            "serverId": 2671,
            "chance": 50000,
            "countMax": 5
          }
        ],
        "sourceFile": "Dinosaur.xml",
        "balanceSource": {"provider":"old.wodbo.net","matchedName":"Dinosaur LvL 1","officialFields":["hp","xp"],"derivedFields":["attackMin","attackMax"]}
      }
    ]
  },
  {
    "id": "bandit-camp",
    "name": "Acampamento Bandit",
    "description": "Bandits mais fortes do conteúdo original.",
    "level": 6,
    "maxLevel": 12,
    "recommended": "Níveis 6–12",
    "lureOptions": [1, 2, 3, 4],
    "defaultLure": 2,
    "arenaTheme": "bandit",
    "background": "linear-gradient(180deg,#6b5134,#38291b)",
    "monsters": [
      {
        "id": "bandit",
        "name": "Bandit",
        "requiredLevel": 6,
        "hp": 5000,
        "sourceHp": 5000,
        "attackMin": 250,
        "attackMax": 1000,
        "attackInterval": 1000,
        "xp": 1800,
        "speed": 280,
        "lookType": 388,
        "sprite": "./assets/generated/monster-portraits/bandit.webp",
        "outfitId": "bandit",
        "loot": [
          {
            "serverId": 2148,
            "chance": 100000,
            "countMax": 100
          },
          {
            "serverId": 2152,
            "chance": 25000,
            "countMax": 20
          },
          {
            "serverId": 12775,
            "chance": 2500,
            "countMax": 5
          },
          {
            "serverId": 12776,
            "chance": 2500,
            "countMax": 5
          },
          {
            "serverId": 12717,
            "chance": 1000,
            "countMax": 1
          }
        ],
        "sourceFile": "Bandit.xml"
      },
      {
        "id": "bandit-gun",
        "name": "Bandit Gun",
        "requiredLevel": 6,
        "hp": 3000,
        "sourceHp": 3000,
        "attackMin": 100,
        "attackMax": 250,
        "attackInterval": 1000,
        "xp": 2500,
        "speed": 300,
        "lookType": 475,
        "sprite": "./assets/generated/monster-portraits/bandit-gun.webp",
        "outfitId": "bandit-gun",
        "loot": [
          {
            "serverId": 2148,
            "chance": 100000,
            "countMax": 100
          },
          {
            "serverId": 2152,
            "chance": 25000,
            "countMax": 25
          }
        ],
        "sourceFile": "Bandit Gun.xml"
      }
    ]
  }
];

function lookTypeVisualForm(form){
  const lookType=Math.trunc(Number(form?.lookType));
  if(!Number.isFinite(lookType)||lookType<=0)return form;
  return {...form,
    outfitId:`looktype-${lookType}`,
    portrait:`./assets/generated/looktype-transformations/portraits/${lookType}.png`
  };
}

Object.assign(characters, expandedCharacters);

// V21.26.4 — Chilled/Jenk were removed before any live character used them.
// Reuse their now-free vocation-id ranges for the new Free vocations C13/Yamcha.
delete characters.chilled;
delete characters.jenk;

function createFreeVocationFromSeed(id,name,seedId,normalVocationIds,rebornVocationIds){
  const seed=characters[seedId]||characters.goku;
  const clone=structuredClone(seed);
  clone.id=id; clone.name=name;
  delete clone.vipVocation; delete clone.questVocation; delete clone.locked;
  clone.vocationSourceId=normalVocationIds[0];
  const make=(vocationId,index,path)=>({
    id:`${path}-${index}`, name:index===0&&path==='normal'?name:`${name} · ${path==='normal'?'Normal':'Reborn'} ${index+1}`,
    level:path==='normal'?[1,50,100,150,200][index]:[1,50,100,150,200,400,600,800,1000][index],
    vocationId, lookType:Number(seed.forms?.[Math.min(index,Math.max(0,(seed.forms?.length||1)-1))]?.lookType||seed.vocationSourceId||1),
    multiplier:1+index*.12, formula:seed.serverFormula||seed.forms?.[0]?.formula
  });
  clone.forms=[...normalVocationIds.map((v,i)=>make(v,i,'normal')),...rebornVocationIds.map((v,i)=>make(v,i,'reborn'))];
  characters[id]=clone;
}
createFreeVocationFromSeed('c13','C13','c16',[461,462,463,464,465],[466,467,468,469,470,471,472,492,494]);
createFreeVocationFromSeed('yamcha','Yamcha','tenshinhan',[316,317,318,319,320],[321,322,323,324,325,326,327,327,519]);
for (const character of Object.values(characters)) {
  const sourceForms = talkactionTransformationChains[character.id];
  if (sourceForms?.length) {
    const forms=sourceForms.map(lookTypeVisualForm);
    character.forms = forms;
    character.serverFormula = forms[0].formula;
    character.sprite = forms[0].portrait || character.sprite;
    character.outfitId = forms[0].outfitId || character.outfitId;
    character.vocationSourceId =
      character.vocationSourceId || forms[0].vocationId;
  }
}

// V20.31 — The normal !transformar chains stop at the pre-Reborn vocation.
// The original Reborn NPC changes that final vocation to a separate Reborn
// vocation with doReborn(cid, 1, lookType, vocation). Attach that branch to
// each playable character so the NPC can reset the player to level 1 without
// losing the source look/vocation and so post-Reborn transforms continue.
for (const character of Object.values(characters)) {
  const currentForms = character.forms || [];
  const sourceExpanded = expandedCharacters[character.id]?.forms || [];
  const preReborn = [...currentForms].reverse().find(form =>
    rebornVocationMap[String(form.vocationId)]
  );
  if (!preReborn) continue;

  const mapping = rebornVocationMap[String(preReborn.vocationId)];
  const sourceReborn = sourceExpanded.find(form =>
    Number(form.vocationId) === Number(mapping.toVocation)
  );
  const rebornForm = lookTypeVisualForm(sourceReborn || {
    id:`reborn-voc-${mapping.toVocation}`,
    name:`${character.name} Reborn`,
    level:1,
    vocationId:mapping.toVocation,
    lookType:mapping.lookType,
    outfitId:`${character.id}-form-${mapping.toVocation}`,
    portrait:`./assets/generated/transformations/portraits/${character.id}-form-${mapping.toVocation}.png`,
    multiplier:1.12,
    formula:preReborn.formula || character.serverFormula
  });
  if (!currentForms.some(form => Number(form.vocationId) === Number(mapping.toVocation))) {
    currentForms.push({...rebornForm, level:1});
  }

  let vocation = Number(mapping.toVocation);
  let guard = 0;
  while (talkactionStandardTransitions[String(vocation)] && guard++ < 24) {
    const transition = talkactionStandardTransitions[String(vocation)];
    const nextVocation = Number(transition.toVocation);
    if (!currentForms.some(form => Number(form.vocationId) === nextVocation)) {
      currentForms.push({
        id:`post-reborn-voc-${nextVocation}`,
        name:`${character.name} · Reborn Forma ${nextVocation}`,
        level:Number(transition.requiredLevel || 1),
        vocationId:nextVocation,
        lookType:Number(transition.lookType || mapping.lookType),
        outfitId:`looktype-${Number(transition.lookType)}`,
        portrait:`./assets/generated/looktype-transformations/portraits/${Number(transition.lookType)}.png`,
        multiplier:1.12 + guard * 0.12,
        formula:character.serverFormula
      });
    }
    vocation = nextVocation;
  }
  character.forms = currentForms;
}

export const standardTransformationTransitions =
  talkactionStandardTransitions;
export const specialTransformationTransitions =
  talkactionSpecialTransitions;

export const itemCatalog = {
  depot:{
    id:'depot',name:'Depot',type:'misc',rarity:'common',icon:'DP',
    description:'Armazenamento pessoal com 400 espaços.',
    requiredLevel:0,stackable:false,stats:{},value:0
  },
  starter_helmet:{
    id:'starter_helmet',serverId:13391,name:"Kame's Glasses",
    type:'helmet',rarity:'common',icon:'SG',
    description:'+100 HP/Ki, regeneração de HP e Ki +15/s.',
    requiredLevel:1,stackable:false,
    stats:{defense:1,hp:100,ki:100,hpRegen:15,kiRegen:15},value:0,
    balanceSource:{provider:'old.wodbo.net',matchedName:'sun glasses'}
  },
  starter_armor:{
    id:'starter_armor',serverId:12640,name:'Fighter Armor',
    type:'armor',rarity:'common',icon:'FA',
    description:'+100 HP/Ki, regeneração de HP e Ki +30/s.',
    requiredLevel:1,stackable:false,
    stats:{defense:10,hp:100,ki:100,hpRegen:30,kiRegen:30},value:0,
    balanceSource:{provider:'old.wodbo.net',matchedName:'fighter armor'}
  },
  starter_legs:{
    id:'starter_legs',serverId:12667,name:'Starter Legs',
    type:'legs',rarity:'common',icon:'PT',
    description:'Regeneração de HP e Ki +5/s.',
    requiredLevel:1,stackable:false,
    stats:{defense:1,hpRegen:5,kiRegen:5},value:0,
    balanceSource:{provider:'old.wodbo.net',matchedName:'panties'}
  },
  starter_boots:{
    id:'starter_boots',serverId:12697,name:'First Boots',
    type:'boots',rarity:'common',icon:'HB',
    description:'+100 HP/Ki, regeneração de HP e Ki +15/s.',
    requiredLevel:1,stackable:false,
    stats:{defense:2,hp:100,ki:100,hpRegen:15,kiRegen:15},value:0,
    balanceSource:{provider:'old.wodbo.net',matchedName:'hercules boots'}
  },
  starter_gloves:{
    id:'starter_gloves',serverId:12699,name:'Yellow Glove',
    type:'weapon',combatStyle:'gloves',rarity:'common',icon:'YG',
    description:'Attack 3, Defense 3. Usa Strength.',
    requiredLevel:1,stackable:false,
    stats:{attack:3,defense:3},value:0,
    balanceSource:{provider:'old.wodbo.net',matchedName:'yellow gloves'}
  },
  starter_sword:{
    id:'starter_sword',serverId:12716,name:'Small Sword',
    type:'weapon',combatStyle:'sword',rarity:'common',icon:'SS',
    description:'Attack 2, Defense 3. Usa Strength.',
    requiredLevel:1,stackable:false,
    sourceAttributes:{weaponType:'sword'},
    stats:{attack:2,defense:3},value:0,
    balanceSource:{provider:'old.wodbo.net',matchedName:'small sword'}
  },
  starter_blaster:{
    id:'starter_blaster',serverId:12747,name:'Blue Ki',
    type:'weapon',combatStyle:'ki',rarity:'common',icon:'BK',
    description:'Ki Blasting inicial. Range 5.',
    requiredLevel:1,stackable:false,
    sourceAttributes:{weaponType:'wand',range:'5'},
    stats:{attack:4},value:0,
    balanceSource:{provider:'old.wodbo.net',matchedName:'blue ki'}
  },
  starter_backpack:{
    id:'starter_backpack',serverId:12764,name:'Backpack',
    type:'backpack',rarity:'common',icon:'BP',
    description:'Backpack inicial com 20 espaços.',
    containerCapacity:20,stackable:false,value:0,
    balanceSource:{provider:'old.wodbo.net',matchedName:'backpack'}
  },

senzu:{id:'senzu',serverId:12779,name:'Semente dos Deuses',type:'consumable',rarity:'rare',icon:'SZ',description:'Recupera toda a vida.',value:100},
  scouter:{id:'scouter',serverId:2662,name:'Magician Hat',type:'helmet',rarity:'uncommon',icon:'MH',description:'Capacete original do servidor. +3 ataque, +2 defesa.',stats:{attack:3,defense:2},value:250},
  armor:{id:'armor',serverId:2463,name:'Liquer Armor',type:'armor',rarity:'rare',icon:'LA',description:'+8 defesa, +30 HP.',stats:{defense:8,hp:30},value:650},
  gloves:{id:'gloves',serverId:2640,name:'Soft Boots',type:'boots',rarity:'common',icon:'SB',description:'+2 velocidade e +2% esquiva.',stats:{speed:2,dodge:2},value:180},
  z_sword:{id:'z_sword',serverId:2400,name:'Jiren Glove',type:'weapon',combatStyle:'gloves',rarity:'epic',icon:'JG',description:'+14 ataque e +4% crítico.',stats:{attack:14,crit:4},stackable:false,value:2400},
  saiyan_legs:{id:'saiyan_legs',serverId:2477,name:'Black Janemba Legs',type:'legs',rarity:'uncommon',icon:'BJ',description:'+5 defesa.',stats:{defense:5},value:420},
  flying_boots:{id:'flying_boots',serverId:2643,name:'Black Janemba Boots',type:'boots',rarity:'rare',icon:'BB',description:'+2 velocidade e +3% esquiva.',stats:{speed:2,dodge:3},value:850},
  power_ring:{id:'power_ring',serverId:2164,name:'Might Ring',type:'ring',rarity:'epic',icon:'MR',description:'+8 ataque e +40 HP.',stats:{attack:8,hp:40},value:3200},
  dragon_necklace:{id:'dragon_necklace',serverId:2171,name:'Platinum Amulet',type:'necklace',rarity:'legendary',icon:'PA',description:'+6 defesa e +6% crítico.',stats:{defense:6,crit:6},value:5000},
  capsule_pack:{id:'capsule_pack',serverId:1988,name:'The Backpack',type:'backpack',rarity:'rare',icon:'BP',description:'Container com 20 espaços.',containerCapacity:20,stackable:false,stats:{hp:20},value:700},
  ki_ammo:{id:'ki_ammo',serverId:2544,name:'Oblivion Bar',type:'ammo',rarity:'rare',icon:'OB',description:'+5 ataque.',stats:{attack:5},value:900},
  server_2148:{"id":"server_2148","serverId":2148,"name":"Cent","type":"currency","rarity":"common","icon":"C","description":"Item original do servidor #2148.","value":1,"sourceAttributes":{"weight":"10","worth":"1"}},
  server_2152:{"id":"server_2152","serverId":2152,"name":"Dollar","type":"currency","rarity":"common","icon":"D","description":"Item original do servidor #2152.","value":100,"sourceAttributes":{"weight":"10","worth":"100"}},
  server_2666:{"id":"server_2666","serverId":2666,"name":"Meat","type":"food","rarity":"common","icon":"M","description":"Item original do servidor #2666.","value":0,"sourceAttributes":{"weight":"100","showcount":"0"}},
  server_2671:{"id":"server_2671","serverId":2671,"name":"Ham","type":"food","rarity":"common","icon":"H","description":"Item original do servidor #2671.","value":0,"sourceAttributes":{"weight":"100","showcount":"0"}},
  server_12621:{"id":"server_12621","serverId":12621,"name":"Eye Mask","type":"helmet","rarity":"rare","icon":"EM","description":"Health and KI Regeneration +50/s","value":0,"sourceAttributes":{"description":"Health and KI Regeneration +50/s","healthGain":"50","healthTicks":"1000","manaGain":"50","manaTicks":"1000","weight":"1000","armor":"5","slotType":"head"},"stats":{"defense":5,"healthRegen":50,"kiRegen":50}},
  server_12639:{
    "id":"server_12639",
    "serverId":12639,
    "name":"Black Coat",
    "type":"armor",
    "rarity":"rare",
    "icon":"BC",
    "description":"+250 HP, Armor 25, Critical/Strength/Ki Blasting +2.",
    "requiredLevel":1,
    "value":0,
    "sourceAttributes":{"slotType":"body"},
    "stats":{
      "defense":25,
      "hp":250,
      "skillBonuses":{"critical":2,"gloves":2,"kiBlasting":2}
    },
    "balanceSource":{"provider":"old.wodbo.net","matchedName":"black coat","url":"https://old.wodbo.net/items"}
  },
  server_12717:{
    "id":"server_12717",
    "serverId":12717,
    "name":"Jin Sword",
    "type":"weapon",
    "combatStyle":"sword",
    "rarity":"uncommon",
    "icon":"JS",
    "description":"Espada inicial. Attack 4, Defense 2.",
    "requiredLevel":1,
    "value":0,
    "sourceAttributes":{"weaponType":"sword"},
    "stats":{"attack":4,"defense":2},
    "stackable":false,
    "balanceSource":{"provider":"old.wodbo.net","matchedName":"jin sword","url":"https://old.wodbo.net/items"}
  },
  server_12775:{"id":"server_12775","serverId":12775,"name":"HP Potion","type":"consumable","rarity":"common","icon":"HP","description":"Life +400","value":0,"sourceAttributes":{"description":"Life +400","weight":"10"},"restoreHp":400},
  server_12776:{"id":"server_12776","serverId":12776,"name":"Ki Potion","type":"consumable","rarity":"common","icon":"KP","description":"Ki +400","value":0,"sourceAttributes":{"description":"Ki +400","weight":"10"},"restoreKi":400},
  training_gloves:{
    id:'training_gloves',
    serverId:null,
    name:'Two Tones Band',
    type:'weapon',
    rarity:'training',
    noRarityTier:true,
    icon:'./assets/items/v2130/two-tones-band.png',
    description:'Faixa de treino de Attack Speed. Pode ser equipada nas duas mãos; duas faixas dobram o treino de Attack Speed.',
    stats:{attack:1,defense:1},
    combatStyle:'gloves',
    trainingSkill:'attackSpeed',
    stackable:false,
    value:0
  }
};

export const vipProducts = [
  {id:'vip30',name:'VIP 30 dias',price:100,kind:'vip',days:30,image:'./assets/ui/v2130/vip-card.png',benefits:['+20% XP','Hunts, Bosses e Quests VIP','3 Depots VIP de 400 slots','Spells e buffs VIP']},
  {id:'vip60',name:'VIP 60 dias',price:190,kind:'vip',days:60,image:'./assets/ui/v2130/vip-card.png',badge:'Economize 10 PP',benefits:['Todos os beneficios VIP por 60 dias']},
  {id:'vip90',name:'VIP 90 dias',price:270,kind:'vip',days:90,image:'./assets/ui/v2130/vip-card.png',badge:'Melhor valor',benefits:['Todos os beneficios VIP por 90 dias']},
  {id:'xp1h',name:'XP Boost 1 hora',price:10,kind:'xp_boost',hours:1,image:'./assets/ui/v2130/boost-xp.png',benefits:['+20% XP acumulativo com VIP']},
  {id:'xp24h',name:'XP Boost 24 horas',price:120,kind:'xp_boost',hours:24,image:'./assets/ui/v2130/boost-xp.png',benefits:['+20% XP acumulativo com VIP']},
  {id:'xp7d',name:'XP Boost 7 dias',price:500,kind:'xp_boost',hours:168,image:'./assets/ui/v2130/boost-xp.png',benefits:['+20% XP acumulativo com VIP']},
  {id:'loot1h',name:'Loot Boost 1 hora',price:10,kind:'loot_boost',hours:1,image:'./assets/ui/v2130/boost-loot.png',benefits:['+20% chance de drop']},
  {id:'loot24h',name:'Loot Boost 24 horas',price:120,kind:'loot_boost',hours:24,image:'./assets/ui/v2130/boost-loot.png',benefits:['+20% chance de drop']},
  {id:'loot7d',name:'Loot Boost 7 dias',price:500,kind:'loot_boost',hours:168,image:'./assets/ui/v2130/boost-loot.png',benefits:['+20% chance de drop']},
  {id:'supplies',name:'Pacote de Suprimentos',price:70,kind:'supplies',image:'./assets/ui/v2130/supplies.png',benefits:['2.000 Rose Senzu','1 compra a cada 7 dias por conta']},
  {id:'gamepass',name:'Game Pass',price:200,kind:'gamepass',image:'./assets/ui/v2130/gamepass-card.png',benefits:['Libera a trilha Passe de recompensas','Não exige status VIP']},
  {id:'rename',name:'Troca de Nick',price:150,kind:'rename',image:'./assets/ui/v2130/nick-card.png',benefits:['Altere o nickname do personagem']},
  {id:'two_tones_band',name:'Two Tones Band',price:100,kind:'item',itemId:'training_gloves',image:'./assets/items/v2130/two-tones-band.png',benefits:['Attack 1 · Defense 1','Treina Attack Speed','Equipe 2 para treinar 2x mais rápido','Item de treino sem tier de raridade']},
  ...['kyabe','vermouth','champa','paikuhan','botamo','monaka'].map(id=>({id:`vocation_${id}`,name:`Vocacao VIP: ${id[0].toUpperCase()+id.slice(1)}`,price:500,kind:'vocation',vocationId:id,benefits:['Desbloqueio permanente na conta','Scaling 2x das vocacoes free']}))
];

Object.assign(itemCatalog, absoluteItemCatalog);
Object.assign(itemCatalog, authoritativeItemCatalog);

// V21.14 Pass cosmetics/backpacks + Cloud Backpack resistance correction.
itemCatalog.pass_beta_backpack={
  id:'pass_beta_backpack',serverId:null,clientId:null,name:'Beta Backpack',type:'backpack',slot:'backpack',rarity:'mythic',noRarityTier:true,
  description:'Backpack exclusiva do Passe Beta · 50 slots · Resistência geral 10%.',containerCapacity:50,stackable:false,moveable:true,
  stats:{capacity:50,allResistance:10},sourceAttributes:{containerSize:50,slotType:'backpack',absorbPercentAll:10},
  icon:'./assets/ui/v2114/beta-backpack.png?v=21.24.8',asset:{preview:'./assets/ui/v2114/beta-backpack.png?v=21.24.8',sheet:null,width:1,height:1},value:0,noNpcSell:true
};
for(const [id,res] of [['server_2000',5],['server_2001',10]]){
  const bp=itemCatalog[id];if(!bp)continue;
  bp.stats={...(bp.stats||{}),allResistance:res};
  bp.sourceAttributes={...(bp.sourceAttributes||{}),absorbPercentAll:res};
  bp.description=`${bp.name} · ${bp.containerCapacity||bp.sourceAttributes.containerSize||0} slots · Resistência geral ${res}%.`;
}

// V21.4.0 - Dragon Balls. These are collection/trade items: they are never
// accepted by Bulma/NPC sell, but remain valid for the player marketplace.
for (let star = 1; star <= 7; star += 1) {
  const id = `dragon_ball_${star}`;
  const serverId = 12749 + star;
  const clientId = 11832 + star;
  const sourceBall = itemCatalog[`server_${serverId}`] || absoluteItemCatalog[`server_${serverId}`] || null;
  const sourceIcon = sourceBall?.icon || `./assets/generated/full-registry/previews/item/${clientId}.png`;
  itemCatalog[id] = {
    id,
    serverId,
    clientId,
    name:`Esfera do Dragão ${star} Estrela${star === 1 ? '' : 's'}`,
    type:'misc',
    rarity:'common',
    noRarityTier:true,
    noNpcSell:true,
    playerMarketOnly:true,
    stackable:true,
    icon:sourceIcon,
    asset:sourceBall?.asset ? structuredClone(sourceBall.asset) : {
      preview:sourceIcon,
      sheet:`./assets/generated/full-registry/sheets/item/${clientId}.png`,
      width:1,
      height:1
    },
    originalServerItemId:serverId,
    originalClientItemId:clientId,
    value:0,
    description:`Esfera do Dragão de ${star} estrela${star === 1 ? '' : 's'}. Sprite original do servidor (item ${serverId}). Não pode ser vendida à Bulma; pode ser negociada apenas no Mercado de Players.`
  };
}

// V21.5.0 - Premium Points are exposed as a virtual market asset. They do not
// occupy inventory slots: the authoritative market moves points directly
// between account balances. Lots must always be multiples of 10 and are
// priced per individual PP.
itemCatalog.premium_points_trade = {
  id:'premium_points_trade',
  serverId:null,
  name:'Premium Points',
  type:'premium-points',
  rarity:'common',
  noRarityTier:true,
  noNpcSell:true,
  playerMarketOnly:true,
  stackable:true,
  virtualMarketAsset:true,
  marketLotSize:10,
  marketCurrencyOnly:'zeni',
  icon:'./assets/ui/v2130/premium-points.png',
  value:0,
  description:'Premium Points negociáveis no Mercado Global em lotes de 10. O preço informado é sempre por 1 PP.'
};

// One item ("server_7827") carried an inappropriate joke name/description
// from the source data instead of a real one — same decorative "trophy"
// icon as the other Goku collectibles, so it's renamed to match them.
// Must run after both catalog merges above, since either one replaces
// the whole item object (not just a field) and would otherwise silently
// undo this fix.
if (itemCatalog.server_7827) {
  itemCatalog.server_7827.name = 'Goku Trophy';
  itemCatalog.server_7827.description = 'Goku Trophy';
}
// "Oblivion Bar" was the only ammo item missing an explicit stackable
// flag (every other ammo item in the catalog has stackable:true) —
// without it, the inventory's safe "opt-in to stack" default treated it
// as a unique item, so each pickup took its own backpack slot instead of
// piling into one stack like every other arrow/bolt.
if (itemCatalog.ki_ammo) {
  itemCatalog.ki_ammo.stackable = true;
}

// --- Source-faithful equipment balance ---------------------------------
// Combat stats imported from the original DBO Absolut server are already
// meaningful relative to one another. Do not re-derive them from the Idle
// rarity label: rarity is only a presentation hint and was itself inferred.
// Keeping the XML values here preserves the original equipment hierarchy.
// Progression safety is handled later by assigning a minimum equip level from
// the first hunt where an equipment item can actually drop.
for (const item of Object.values(itemCatalog)) {
  if (!item?.stats || typeof item.stats !== 'object') continue;
  item.originalStats = structuredClone(item.stats);
  item.idleBalance = {
    ...(item.idleBalance || {}),
    statPolicy:'original-server-values'
  };
}
// ------------------------------------------------------------------------

// Runtime behavior that is not represented by the Absolute items.xml.
// Balanced down from the source's flat 1000/1000: at low levels (where
// these are first affordable) that already fully overheals a fresh
// character, and unlike Senzus these are unlimited-supply NPC purchases,
// so they stay as a cheap "starter tier" top-up rather than a full heal.
Object.assign(itemCatalog.server_12775, {
  type:'consumable',
  restoreHp:400,
  consumableKind:'hp',
  description:'Recupera 400 de HP.'
});
Object.assign(itemCatalog.server_12776, {
  type:'consumable',
  restoreKi:400,
  consumableKind:'ki',
  description:'Recupera 400 de Ki.'
});
Object.assign(itemCatalog.server_12779, {
  type:'consumable',
  restoreFullHp:true,
  restoreFullKi:true,
  consumableKind:'senzu',
  description:'Recupera completamente HP e Ki.'
});
itemCatalog.senzu = {
  ...itemCatalog.server_12779,
  id:'senzu',
  name:'Semente dos Deuses',
  restoreFullHp:true,
  restoreFullKi:true,
  consumableKind:'senzu'
};

// Keep legacy starter aliases synchronized with the corrected catalog.
for (const [alias, serverId] of Object.entries({
  starter_helmet:13391,
  starter_armor:12640,
  starter_legs:12667,
  starter_boots:12697,
  starter_gloves:12699,
  starter_sword:12716,
  starter_blaster:12747,
  starter_backpack:12764
})) {
  const original = itemCatalog[`server_${serverId}`];
  if (original) {
    itemCatalog[alias] = {...original, id:alias};
  }
}


// V12.24 — cápsulas comerciais e Senzu Green.
for (const capsule of [
  {id:'green_capsule',serverId:12760,name:'Green Capsule',rarity:'uncommon'},
  {id:'blue_capsule',serverId:12761,name:'Blue Capsule',rarity:'rare'},
  {id:'red_capsule',serverId:12762,name:'Red Capsule',rarity:'epic'},
  {id:'silver_capsule',serverId:12763,name:'Silver Capsule',rarity:'legendary'}
]) {
  const original = itemCatalog[`server_${capsule.serverId}`] || {};
  itemCatalog[capsule.id] = {
    ...original,
    ...capsule,
    type:'backpack',
    icon:'CP',
    containerCapacity:25,
    stackable:false,
    value:2500,
    description:'Cápsula com 25 espaços.'
  };
}

Object.assign(itemCatalog.server_12779, {
  type:'consumable',
  restoreHp:25000,
  restoreKi:25000,
  restoreFullHp:false,
  restoreFullKi:false,
  consumableKind:'senzu',
  description:'Recupera 25.000 de HP e 25.000 de Ki.'
});
itemCatalog.senzu = {
  ...itemCatalog.server_12779,
  id:'senzu',
  name:'Senzu Green',
  restoreHp:25000,
  restoreKi:25000,
  restoreFullHp:false,
  restoreFullKi:false,
  consumableKind:'senzu',
  description:'Recupera 25.000 de HP e 25.000 de Ki.'
};

for (const zone of absoluteZones) {
  if (!zones.some(entry => entry.id === zone.id)) zones.push(zone);
}


// Every Hunt monster is resolved only by its original lookType.
for (const zone of zones) {
  zone.monsters = (zone.monsters || []).filter(monster =>
    Number(monster.lookType || 0) > 0 &&
    Number(monster.hp || 0) > 1
  );
  for (const monster of zone.monsters) {
    monster.sprite =
      `./generated/web/absolute-monsters-png/${monster.lookType}.png`;
    monster.originalSprite = true;
  }
}


const authoritativeMonsterByName = new Map(
  authoritativeMonsters.map(monster => [
    monster.name.toLowerCase(),
    monster
  ])
);

for (const zone of zones) {
  for (const monster of zone.monsters || []) {
    const original = authoritativeMonsterByName.get(
      String(monster.name || '').toLowerCase()
    );
    if (!original) continue;

    // Keep the authoritative combat data as reference. The source-faithful
    // adapter below converts its scale for Idle while preserving relative
    // HP, damage patterns and XP hierarchy.
    monster.authoritativeId = original.id;
    const curatedWodboBalance = monster.balanceSource?.provider === 'old.wodbo.net';
    if (!curatedWodboBalance) monster.xp = original.experience;
    monster.speed = original.speed;
    monster.lookType = original.look.type || monster.lookType;
    monster.corpseId = original.look.corpse || monster.corpseId;
    monster.defense = original.defense.defense;
    monster.armor = original.defense.armor;
    // Raw per-attack table is retained for reference; the adapter below
    // creates scaled copies in monster.attacks so attack patterns survive.
    monster.authoritativeAttacks = original.attacks;
    monster.elements = original.elements;
    monster.immunities = original.immunities;
    monster.originalLoot = original.loot;
  }
}

// Equipment with no level requirement in the old XML can otherwise be worn
// immediately in the Idle even when it only drops much later. Infer a minimum
// equip level from the first original hunt that drops it. Stats stay untouched.
{
  const equippableTypes = new Set([
    'helmet','necklace','armor','weapon','legs','boots','ring','ammo'
  ]);
  const earliestDropLevel = new Map();
  for (const zone of zones) {
    const zoneLevel = Math.max(1, Number(zone.level) || 1);
    for (const monster of zone.monsters || []) {
      for (const drop of monster.originalLoot || monster.loot || []) {
        const serverId = Number(drop.serverId ?? drop.id);
        if (!serverId) continue;
        const current = earliestDropLevel.get(serverId);
        if (current === undefined || zoneLevel < current) earliestDropLevel.set(serverId, zoneLevel);
      }
    }
  }
  for (const item of Object.values(itemCatalog)) {
    if (!item || !equippableTypes.has(item.type) || String(item.id || '').startsWith('starter_')) continue;
    const sourceLevel = Math.max(0, Number(item.requiredLevel || item.requirements?.level || 0));
    const dropLevel = earliestDropLevel.get(Number(item.serverId));
    if (sourceLevel > 0 || !dropLevel || dropLevel <= 1) continue;
    item.requiredLevel = dropLevel;
    if (item.requirements && typeof item.requirements === 'object') item.requirements.level = dropLevel;
    item.idleBalance = {
      ...(item.idleBalance || {}),
      inferredRequiredLevel:dropLevel,
      levelPolicy:'first-original-hunt-drop'
    };
  }
}

// V20.49 — Todo equipamento entregue ao personagem no momento da criação
// é equipamento de level 1. O balanceamento por primeira Hunt roda acima e
// pode inferir level 11+ para os IDs originais; este override final garante
// que os itens do kit inicial (inclusive Yellow Glove) sejam equipáveis
// imediatamente, tanto pelo alias starter_* quanto pelo ID real do servidor.
for (const [alias, serverId] of Object.entries({
  starter_helmet:13391,
  starter_armor:12640,
  starter_legs:12667,
  starter_boots:12697,
  starter_gloves:12699,
  starter_sword:12716,
  starter_blaster:12747,
  starter_backpack:12764
})) {
  for (const item of [itemCatalog[alias], itemCatalog[`server_${serverId}`]]) {
    if (!item) continue;
    item.requiredLevel = 1;
    if (item.requirements && typeof item.requirements === 'object') {
      item.requirements.level = 1;
    }
    item.idleBalance = {
      ...(item.idleBalance || {}),
      starterRequiredLevel:1,
      levelPolicy:'starter-kit-level-1'
    };
  }
}

// A monster's currency loot (Cent/Dollar/Gold/Blue Bar) came in with the
// same raw, unscaled values as everything else — some monsters could
// drop tens of millions of gold in a single kill, which trivializes the
// whole economy. Every monster's currency drops are rescaled so their
// maximum possible payout stays proportional to the zone's own level,
// capped at 50,000 gold for the single highest-level zone in the game;
// low-level zones pay out far less.
const GLOBAL_MAX_ZONE_LEVEL = Math.max(...zones.map(zone => Number(zone.level) || 1));
const MAX_GOLD_AT_TOP_ZONE = 50000;
const CURRENCY_VALUE_BY_SERVER_ID = { 2148:1, 2152:100, 2160:10000, 13539:1000000 };

function rescaleMonsterGoldDrops(monster, zoneLevel, relativeStrength) {
  if (!Array.isArray(monster.loot) || !monster.loot.length) return;

  const zoneGoldBudget =
    MAX_GOLD_AT_TOP_ZONE * (zoneLevel / GLOBAL_MAX_ZONE_LEVEL);
  // Even the weakest monster in a zone still pays out half the zone's
  // budget — early kills in a zone shouldn't feel worthless, only the
  // toughest monster there should approach the full cap.
  const targetMaxPayout = Math.max(
    1, zoneGoldBudget * (0.5 + 0.5 * relativeStrength)
  );

  // A high-denomination currency (e.g. a 1,000,000-value "Blue Bar")
  // blows the whole budget even at the minimum possible count of 1 — so
  // for low/mid zones it has to be dropped from the loot table entirely
  // rather than merely scaled down, or the 50k cap below would be a
  // no-op for every monster that happens to drop one.
  monster.loot = monster.loot.filter(drop => {
    const unitValue = CURRENCY_VALUE_BY_SERVER_ID[drop.serverId];
    return unitValue === undefined || unitValue <= targetMaxPayout;
  });

  const currencyDrops = monster.loot.filter(
    drop => CURRENCY_VALUE_BY_SERVER_ID[drop.serverId] !== undefined
  );
  if (!currencyDrops.length) return;

  const oldMaxPayout = currencyDrops.reduce(
    (sum, drop) =>
      sum + CURRENCY_VALUE_BY_SERVER_ID[drop.serverId] * Number(drop.countMax || 0),
    0
  );
  if (oldMaxPayout <= 0) return;

  const scale = targetMaxPayout / oldMaxPayout;
  for (const drop of currencyDrops) {
    drop.countMax = Math.round(Number(drop.countMax || 0) * scale);
  }
  // Rescaling can legitimately round a drop down to 0 (e.g. a Dollar
  // entry on a very low-level monster) — drop those instead of forcing
  // a minimum of 1, which is exactly the bug that let a single
  // high-value currency ignore the cap in the first place.
  monster.loot = monster.loot.filter(drop =>
    CURRENCY_VALUE_BY_SERVER_ID[drop.serverId] === undefined ||
    drop.countMax > 0
  );
}

// --- Source-faithful monster balance -----------------------------------
// The original XML scale is too large for the Idle combat formulas, but the
// *relationships* between monsters are valuable. This pass converts each
// zone to an Idle-sized scale while preserving the original HP, attack and XP
// hierarchy instead of flattening every creature to a fixed 7-10 hit curve.
{
  const BASELINE_STATE = {
    profile:{level:1,hp:1,maxHp:1,ki:1,maxKi:1},
    skills:defaultSkills(), equipment:{}, settings:{}
  };
  const BASELINE_CHARACTER = characters.goku;

  const median = values => {
    const sorted = values.filter(Number.isFinite).filter(v => v > 0).sort((a,b)=>a-b);
    if (!sorted.length) return 1;
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function playerPowerAtLevel(level) {
    BASELINE_STATE.profile.level = level;
    const resources = maxResources(BASELINE_STATE, BASELINE_CHARACTER, {});
    const combat = derivedCombatStats(
      BASELINE_STATE, BASELINE_CHARACTER, {}, itemCatalog
    );
    return {
      hp:resources.maxHp,
      attack:combat.attack,
      attackIntervalMs:combat.attackInterval,
      physicalDefense:combat.physicalDefense
    };
  }

  function sourceAttackDps(original) {
    let dps = 0;
    for (const attack of original?.attacks || []) {
      const low = Math.min(Math.abs(Number(attack.min) || 0), Math.abs(Number(attack.max) || 0));
      const high = Math.max(Math.abs(Number(attack.min) || 0), Math.abs(Number(attack.max) || 0));
      const average = (low + high) / 2;
      if (!average) continue;
      const chance = clamp((Number(attack.chance) || 100) / 100, 0, 1);
      const interval = Math.max(0.4, (Number(attack.intervalMs) || 1000) / 1000);
      dps += average * chance / interval;
    }
    return dps;
  }

  // The two hand-curated opening zones already use approved old.wodbo.net
  // values and should remain exact. Imported Absolute zones use the adapter.
  for (const zone of zones) {
    if (!zone.monsters?.length || ['earth-outskirts','bandit-camp'].includes(zone.id)) continue;

    const level = Math.max(1, Number(zone.level) || 1);
    const player = playerPowerAtLevel(level);
    const records = zone.monsters.map(monster => {
      const original = authoritativeMonsterByName.get(String(monster.name || '').toLowerCase());
      const sourceHp = Math.max(1, Number(original?.health?.max || monster.hp || 1));
      const sourceDps = Math.max(1, sourceAttackDps(original));
      const sourceXp = Math.max(0, Number(original?.experience ?? monster.xp ?? 0));
      return {monster, original, sourceHp, sourceDps, sourceXp};
    });

    const medianHp = median(records.map(r => r.sourceHp));
    const medianDps = median(records.map(r => r.sourceDps));
    const medianXp = median(records.map(r => r.sourceXp));

    // Longer fights are acceptable later in an idle game, but growth is
    // deliberately shallow. Original within-zone ratios remain the main
    // source of variation.
    const targetMedianHits = 8 + Math.min(10, Math.log2(level + 1) * 0.75);
    const targetMedianHp = player.attack * targetMedianHits;
    const targetMedianTtd = Math.max(12, 22 - Math.log2(level + 1) * 0.7);
    const targetMedianDps = player.hp / targetMedianTtd;
    const xpRequiredForLevel = characterXpRequired(level);
    const targetMedianXp = xpRequiredForLevel / 14;

    const strengthRows = [];

    for (const record of records) {
      const {monster, original, sourceHp, sourceDps, sourceXp} = record;
      const hpRatio = clamp(sourceHp / medianHp, 0.2, 5);
      const dpsRatio = clamp(sourceDps / medianDps, 0.2, 5);
      const xpRatio = sourceXp > 0 ? clamp(sourceXp / medianXp, 0.2, 5) : 0.35;

      // Compress only extreme outliers; ordinary source ratios remain visible.
      const balancedHp = Math.max(20, Math.round(targetMedianHp * Math.pow(hpRatio, 0.62)));
      const desiredDps = targetMedianDps * Math.pow(dpsRatio, 0.62);
      const damageScale = desiredDps / sourceDps;

      const scaledAttacks = (original?.attacks || []).map(attack => ({
        ...attack,
        min: -Math.max(1, Math.round(Math.abs(Number(attack.min) || 0) * damageScale)),
        max: -Math.max(1, Math.round(Math.abs(Number(attack.max) || 0) * damageScale))
      }));
      const attackValues = scaledAttacks.flatMap(attack => [
        Math.abs(Number(attack.min) || 0),
        Math.abs(Number(attack.max) || 0)
      ]).filter(value => value > 0);
      const fallbackAverage = Math.max(1, desiredDps * ((Number(monster.attackInterval) || 1000) / 1000));

      monster.originalHp = sourceHp;
      monster.originalExperience = sourceXp;
      monster.originalAttackDps = sourceDps;
      monster.hp = balancedHp;
      monster.sourceHp = balancedHp;
      monster.attacks = scaledAttacks;
      monster.attackMin = attackValues.length
        ? Math.max(1, Math.min(...attackValues))
        : Math.max(1, Math.round(fallbackAverage * 0.75));
      monster.attackMax = attackValues.length
        ? Math.max(monster.attackMin + 1, Math.max(...attackValues))
        : Math.max(monster.attackMin + 1, Math.round(fallbackAverage * 1.25));
      monster.xp = Math.max(1, Math.round(targetMedianXp * Math.pow(xpRatio, 0.68)));
      monster.idleBalance = {
        policy:'original-server-relative-scale',
        sourceHp,
        sourceDps,
        sourceXp
      };

      const compositeStrength = Math.sqrt(hpRatio * dpsRatio);
      strengthRows.push({monster, compositeStrength});
      rescaleMonsterGoldDrops(monster, level, clamp((compositeStrength - 0.2) / 4.8, 0, 1));
    }

    // Level gates follow the original HP+DPS ranking rather than HP alone.
    strengthRows.sort((a,b) => a.compositeStrength - b.compositeStrength);
    const spread = Math.max(3, Math.round(level * 0.30));
    strengthRows.forEach((row, index) => {
      if (row.monster.requiredLevel !== undefined) return;
      const progress = strengthRows.length <= 1 ? 0 : index / (strengthRows.length - 1);
      row.monster.requiredLevel = level + Math.round(progress * spread);
    });
  }
}
// ------------------------------------------------------------------------

// V20.26 support/visual policy plus the V20.24 spell tier corrections.
// These are Idle-specific product/balance decisions layered on top of the
// original server data without modifying the authoritative Lua import.
const SUPPORT_BUFF_DURATION_MS_V2026 = 60_000;
const SUPPORT_BUFF_COOLDOWN_MS_V2026 = 120_000;

function isAttributeBuffSpellV2026(spell) {
  if (!spell || spell.aggressive !== false) return false;
  return (spell.conditions || []).some(condition =>
    condition?.type === 'CONDITION_ATTRIBUTES'
  );
}

function isSpeedBuffSpellV2026(spell) {
  if (!spell || spell.aggressive !== false) return false;
  return (spell.conditions || []).some(condition =>
    condition?.type === 'CONDITION_HASTE'
  );
}

function correctedSpellIconV2026({spell, sourceVisual, mergedCombats}) {
  // Source Lua magic-effect/distance-shoot IDs are zero-based while the
  // extracted DAT preview registry is one-based. The old icon path skipped
  // that translation, so many spell buttons displayed the neighbouring
  // effect. Prefer the spell's real aura/source event, then the first combat
  // effect, and only then a missile fallback.
  const sourceEventEffect = (sourceVisual?.visualEvents || []).find(event =>
    event?.effectId != null && Number.isFinite(Number(event.effectId))
  )?.effectId;
  const combatEffect = (mergedCombats || []).find(combat =>
    combat?.effectId != null && Number.isFinite(Number(combat.effectId))
  )?.effectId;
  const effectId =
    spell?.visualEffectId ??
    sourceVisual?.visualEffectId ??
    sourceEventEffect ??
    spell?.impactEffectId ??
    combatEffect ??
    spell?.effectId ??
    null;
  if (effectId != null && Number.isFinite(Number(effectId))) {
    return `./assets/generated/full-registry/previews/effect/${Number(effectId) + 1}.png`;
  }

  const sourceEventMissile = (sourceVisual?.visualEvents || []).find(event =>
    event?.missileId != null && Number.isFinite(Number(event.missileId))
  )?.missileId;
  const combatMissile = (mergedCombats || []).find(combat =>
    combat?.missileId != null && Number.isFinite(Number(combat.missileId))
  )?.missileId;
  const missileId = sourceEventMissile ?? combatMissile ?? spell?.missileId ?? null;
  if (missileId != null && Number.isFinite(Number(missileId))) {
    return `./assets/generated/full-registry/previews/missile/${Number(missileId) + 1}.png`;
  }
  return spell?.icon || null;
}

const spellBalanceOverridesV2024 = {
  'explosive': {
    damageMultiplier:0.70,
    accessTier:'free',
    premium:false,
    balanceNote:'Free counterpart: exactly 70% of Big Explosion.'
  },
  'big-explosion': {
    damageMultiplier:1.00,
    accessTier:'vip',
    premium:true,
    balanceNote:'VIP level-50 reference spell.'
  },
  'namekjin-rage': {
    damageMultiplier:1.00,
    balanceNote:'Level-200 tier; visual-only combats do not dilute damage.'
  },
  // SpellCreator callbacks were valid in the Lua but the legacy parser did
  // not attach them to the generated combat objects. Restore the callbacks
  // so every stage is a real hit and the global runtime can split the tier
  // budget across them correctly.
  'black-furie': {
    combatFormulaFallback:{min:70000,max:80000},
    balanceNote:'Restored 70k-80k Lua callback on all four offensive stages.'
  },
  'absalon-explosion': {
    combatFormulaFallback:{min:60000,max:80000},
    balanceNote:'Restored 60k-80k Lua callback on all seven offensive stages.'
  },
  // The source Teleport script has COMBAT_PHYSICALDAMAGE but no damage
  // callback/formula. Its doCombat is only the target/effect trigger.
  'teleport': {
    damageDisabled:true,
    balanceNote:'Utility teleport: no fabricated 1-point damage.'
  }
};

export const spells = authoritativeSpells.map(spell => {
  const sourceOverride = spellSourceOverridesV2021[spell.id] || {};
  const balanceOverride = spellBalanceOverridesV2024[spell.id] || {};
  // Some legacy imported IDs were mojibaked (for example Palhaço), while
  // the uploaded spells.xml is correctly encoded. Fall back to the exact
  // source script so those entries still receive the authoritative profile.
  const sourceVisual = spellSourceVisualsV2022[spell.id] ||
    Object.values(spellSourceVisualsV2022).find(profile =>
      profile?.sourceScript && spell?.script &&
      profile.sourceScript.toLowerCase() === spell.script.toLowerCase()
    ) || {};
  const combatOverrides = sourceVisual.combatVisualOverrides || {};
  const mergedCombats = (spell.combats || []).map(combat => {
    const patch = combatOverrides[combat.name] || {};
    const fallback = balanceOverride.combatFormulaFallback;
    const canRestoreDamageFormula =
      fallback &&
      !combat.formula &&
      combat.combatType !== 'COMBAT_HEALING';
    return {
      ...combat,
      formula:canRestoreDamageFormula
        ? {
            kind:'COMBAT_FORMULA_LEVELMAGIC',
            minA:0,
            minB:-Math.abs(Number(fallback.min || 0)),
            maxA:0,
            maxB:-Math.abs(Number(fallback.max || fallback.min || 0)),
            healing:false,
            sourceFallback:true
          }
        : combat.formula,
      effectId:patch.effectId ?? combat.effectId ?? null,
      missileId:patch.missileId ?? combat.missileId ?? null,
      area:Array.isArray(patch.area) ? patch.area : (combat.area || []),
      areaMetrics:patch.areaMetrics || combat.areaMetrics || null
    };
  });
  const combatIndexByName = new Map(
    mergedCombats.map((combat, index) => [combat.name, index])
  );
  const sequenceFromNames = entries => (entries || [])
    .map(entry => ({
      combatIndex:combatIndexByName.get(entry.combatName),
      delayMs:Number(entry.delayMs || 0)
    }))
    .filter(entry => Number.isInteger(entry.combatIndex));
  const sourceSequence = sequenceFromNames(sourceVisual.sequenceCombatNames);
  const sourceVisualRepeatOnly =
    spell.aggressive === false &&
    mergedCombats.length === 1 &&
    (sourceVisual.visualEvents || []).some(event => Number(event.repeatCount || 1) > 1);
  const sourceDirectionalSequence = sourceVisual.directionalSequenceCombatNames
    ? Object.fromEntries(
        Object.entries(sourceVisual.directionalSequenceCombatNames).map(
          ([direction, entries]) => [direction, sequenceFromNames(entries)]
        )
      )
    : null;

  const mergedSpellForSupportPolicy = {
    ...spell,
    ...sourceOverride,
    ...sourceVisual,
    ...balanceOverride,
    combats:mergedCombats
  };
  const standardizedAttributeBuff = isAttributeBuffSpellV2026(mergedSpellForSupportPolicy);
  const standardizedSpeedBuff = isSpeedBuffSpellV2026(mergedSpellForSupportPolicy);
  const standardizedSupportBuff = standardizedAttributeBuff || standardizedSpeedBuff;
  const sourceCooldownSetGroups = sourceVisual.cooldownSetGroups || spell.cooldownSetGroups || [];
  const sourceCooldownBlockGroups = sourceVisual.cooldownBlockGroups || spell.cooldownBlockGroups || [];
  const standardizedSupportGroup = standardizedAttributeBuff
    ? 'idle:attribute-buff'
    : standardizedSpeedBuff
      ? 'idle:speed-buff'
      : null;
  const standardizedCooldownSetGroups = standardizedSupportBuff
    ? [
        ...sourceCooldownSetGroups.map(group => ({
          ...group,
          durationMs:SUPPORT_BUFF_COOLDOWN_MS_V2026
        })),
        {
          group:standardizedSupportGroup,
          durationMs:SUPPORT_BUFF_COOLDOWN_MS_V2026
        }
      ].filter((entry, index, list) =>
        entry?.group && list.findIndex(other => other?.group === entry.group) === index
      )
    : sourceCooldownSetGroups;
  const standardizedCooldownBlockGroups = standardizedSupportBuff
    ? [...new Set([...sourceCooldownBlockGroups, standardizedSupportGroup].filter(Boolean))]
    : sourceCooldownBlockGroups;
  const standardizedVisualEvents = standardizedAttributeBuff
    ? (sourceVisual.visualEvents || []).map(event => {
        const intervalMs = Math.max(0, Number(event?.intervalMs || 0));
        if (
          event?.anchor !== 'self' ||
          intervalMs <= 0 ||
          Number(event?.repeatCount || 1) <= 1
        ) return event;
        return {
          ...event,
          repeatCount:Math.max(
            Number(event.repeatCount || 1),
            Math.ceil(SUPPORT_BUFF_DURATION_MS_V2026 / intervalMs)
          )
        };
      })
    : (sourceVisual.visualEvents || spell.visualEvents || []);
  const correctedIcon = correctedSpellIconV2026({
    spell:{...spell,...sourceOverride,...sourceVisual},
    sourceVisual,
    mergedCombats
  });

  return {
    ...spell,
    ...sourceOverride,
    ...sourceVisual,
    ...balanceOverride,
    accessTier:balanceOverride.accessTier || (spell.premium ? 'vip' : 'free'),
    damageMultiplier:Number(balanceOverride.damageMultiplier ?? 1),
    balancePolicy:'level-tier-normalized-v2025',
    balanceVersion:'20.26',
    supportBalanceVersion:standardizedSupportBuff ? '60s-active-120s-cooldown-v2026' : null,
    supportDurationMs:standardizedSupportBuff ? SUPPORT_BUFF_DURATION_MS_V2026 : null,
    visualEvents:standardizedVisualEvents,
    icon:correctedIcon,
    combats:mergedCombats,
    sequence:sourceSequence.length
      ? sourceSequence
      : sourceVisual.sequence ||
        (sourceVisualRepeatOnly ? [{combatIndex:0,delayMs:0}] : null) ||
        sourceOverride.sequence ||
        spell.sequence,
    directionalSequence:sourceDirectionalSequence ||
      sourceVisual.directionalSequence ||
      sourceOverride.directionalSequence ||
      spell.directionalSequence,
    // V20.22 source profiles are the authoritative layer for Lua/storage
    // cooldowns and success-side visual events. V20.21 remains as a
    // compatibility fallback for directional sequences not represented in
    // the profile generator.
    cooldownBlockGroups:standardizedCooldownBlockGroups,
    cooldownSetGroups:standardizedCooldownSetGroups,
    cooldownMs:standardizedSupportBuff
      ? SUPPORT_BUFF_COOLDOWN_MS_V2026
      : Number(sourceVisual.cooldownMs ?? sourceOverride.cooldownMs ?? spell.cooldownMs ?? 0),
    sourceExhaustionMs:standardizedSupportBuff
      ? SUPPORT_BUFF_COOLDOWN_MS_V2026
      : Number(sourceVisual.sourceExhaustionMs ?? sourceOverride.sourceExhaustionMs ?? spell.cooldownMs ?? 0)
  };
});

// V21.23.0 — custo percentual de Ki para o late game.
// A base original usa valores fixos (6k, 8k, 10k...), que deixam de ter
// impacto quando o personagem possui milhões de Ki. A partir do tier Lv200
// o custo passa a ser exclusivamente percentual do Ki máximo. As curas da
// família Regeneration também usam percentual em todos os níveis.
const KI_PERCENT_BY_SPELL_LEVEL_V2123 = Object.freeze([
  Object.freeze({minLevel:1000,percent:6}),
  Object.freeze({minLevel:600,percent:5}),
  Object.freeze({minLevel:400,percent:4}),
  Object.freeze({minLevel:300,percent:3.5}),
  Object.freeze({minLevel:250,percent:3}),
  Object.freeze({minLevel:200,percent:2.5})
]);
const REGENERATION_KI_PERCENT_V2123 = Object.freeze({
  'regeneration':2,
  'regeneration-area':3,
  'big-regeneration':4,
  'majin-regeneration':5,
  'saiyajin-regeneration':5,
  'perfect-regeneration':5,
  'namekian-regeneration':5
});
for (const spell of spells) {
  const regenerationPercent=Number(REGENERATION_KI_PERCENT_V2123[spell.id]||0);
  const tierPercent=Number(
    KI_PERCENT_BY_SPELL_LEVEL_V2123.find(tier=>Number(spell.level||0)>=tier.minLevel)?.percent||0
  );
  const percent=regenerationPercent||tierPercent;
  if(percent>0){
    spell.kiCostMode='percent';
    spell.kiCostPercent=percent;
    spell.kiCostPolicy='max-ki-percent-v2123';
  }
}

// V21.14.0 — Spell de suporte universal para assumir o agro em conteúdo
// cooperativo. Usa a arte do Mystic Defense por combinar visualmente com
// proteção/tank. O exhaustion permanece no grupo de suporte e não trava ataque.
spells.push(Object.freeze({
  id:'guardian-taunt',name:'Provocação Guardiã',words:'provocacao guardia',kind:'instant',
  level:1,kiCost:250,aggressive:false,premium:false,runtimeKind:'utility',targetRequired:false,
  vocationIds:[],conditions:[],combats:[],sequence:[],
  icon:'./assets/generated/full-registry/previews/effect/246.png',
  cooldownMs:10000,sourceExhaustionMs:10000,
  cooldownBlockGroups:[],cooldownSetGroups:[],
  description:'Puxa o agro do inimigo compartilhado para você. Cooldown: 10 segundos.'
}));

export const monsterCatalog = authoritativeMonsters;
export const monsterSpawnCatalog = authoritativeMonsterSpawns;

export const npcCatalog = authoritativeNpcs;
export const questCatalog = [
  ...authoritativeQuests,
  {
    id:rebornQuestDefinition.id,
    name:rebornQuestDefinition.name,
    minimumLevel:rebornQuestDefinition.minimumLevel,
    maximumLevel:rebornQuestDefinition.maximumLevel,
    objectives:rebornQuestStages.map(stage => `Derrotar ${stage.name}`),
    rewards:['Acesso ao NPC Reborn'],
    storageWrites:[rebornQuestDefinition.storageId],
    runtimeMode:'reborn-sequential-bosses',
    sourceFound:true,
    sourceFiles:rebornQuestDefinition.sourceFiles
  }
];

// --- Senzu balance pass V20.29 ------------------------------------------
// The Absolute scripts jump from 100k at Senzu Bean to 220k at the top
// tiers. In the Idle combat scale that turns the later senzus into near/full
// heals and removes most of the danger from high-level hunts. V20.29 keeps
// a controlled flat recovery curve. Every tier restores the same flat
// amount of HP and Ki. Rola Bean is intentionally above Senzu Bean and is
// the strongest Senzu sold by Bulma. No senzu uses full-restore flags.
const SENZU_BALANCE_V2029 = Object.fromEntries(
  senzuItems.map(senzu => [senzu.id, {
    restoreHp:Number(senzu.restoreHp || 0),
    restoreKi:Number(senzu.restoreKi || 0)
  }])
);
const commonSenzuIds = new Set([
  'server_12777', // Leaf
  'server_12778', // Root
  'server_7636',  // Rola Bean
  'server_12779', // Senzu Bean
  'server_12780', // Magic Senzu Bean
  'server_7634',  // Super Senzu Red
  'server_2151',  // Rose Senzu
  'server_7635',  // Black Senzu
  'server_2537',  // Majora Senzu
  'server_2156',  // Oblivion Senzu
  'server_2157',  // Mystic Senzu
  'server_2536'   // Coca-Cola Bean
  // Shenlong Senzu (2158) permanece exclusivo de recompensas especiais/Passe.
]);
const questOnlySenzuIds = new Set();

for (const senzu of senzuItems) {
  const original = itemCatalog[senzu.id] || {};
  const tuning = SENZU_BALANCE_V2029[senzu.id];
  const questOnly = !commonSenzuIds.has(senzu.id);
  if (questOnly) questOnlySenzuIds.add(senzu.id);

  itemCatalog[senzu.id] = {
    ...original,
    ...senzu,
    ...tuning,
    type:'consumable',
    consumableKind:'senzu',
    restoreFullHp:false,
    restoreFullKi:false,
    stackable:true,
    questOnly,
    description:
      `Recupera ${tuning.restoreHp.toLocaleString('pt-BR')} HP e `
      + `${tuning.restoreKi.toLocaleString('pt-BR')} Ki.`
      + (questOnly ? ' Senzu raro obtido por progressão/quest.' : ''),
    value:0,
    sellPrice:null,
    buyPrice:null
  };
}

// Correct source identity for Rose Senzu. Absolute actions.xml points to
// item 2151 and the DAT entry for client item 3034 starts at sprite 39707.
// Keeping the authoritative 2151 mapping also fixes the icon automatically.
if (itemCatalog.server_2151) {
  itemCatalog.server_2151 = {
    ...itemCatalog.server_2151,
    icon:'./assets/generated/full-registry/previews/item/3034.png',
    asset:{
      ...(itemCatalog.server_2151.asset || {}),
      preview:'./assets/generated/full-registry/previews/item/3034.png',
      sheet:'./assets/generated/full-registry/sheets/item/3034.png',
      width:1,
      height:1
    },
    sourceSpriteId:39707
  };
}
itemCatalog.senzu={...itemCatalog.server_12779,id:'senzu',serverId:12779};

// Remove the quest-only senzus from every monster's loot table, and cap
// the common tier's drop chance/count so they stay a helpful top-up
// rather than a way to render the HP bar meaningless.
{
  const questOnlyServerIds = new Set(
    [...questOnlySenzuIds].map(id => itemCatalog[id]?.serverId)
  );
  const commonSenzuServerIds = new Set(
    [...commonSenzuIds].map(id => itemCatalog[id]?.serverId)
  );
  const MAX_COMMON_SENZU_CHANCE = 15000; // 15%, chance is in 1/100000ths
  const MAX_COMMON_SENZU_COUNT = 10;

  // `zones` already contains every absolute-* zone (merged in above), so
  // this single pass covers hand-curated and imported zones alike.
  for (const zone of zones) {
    for (const monster of zone.monsters || []) {
      if (!Array.isArray(monster.loot)) continue;
      monster.loot = monster.loot.filter(drop =>
        !questOnlyServerIds.has(drop.serverId)
      );
      for (const drop of monster.loot) {
        if (!commonSenzuServerIds.has(drop.serverId)) continue;
        drop.chance = Math.min(drop.chance, MAX_COMMON_SENZU_CHANCE);
        drop.countMax = Math.min(drop.countMax, MAX_COMMON_SENZU_COUNT);
      }
    }
  }
}
// ------------------------------------------------------------------------


// V20.12 — Curadoria de Hunts.
// Entidades administrativas, criaturas exclusivas de quests e bosses não
// participam das áreas normais de caça.
export function isExcludedHuntMonster(monster) {
  const text = [
    monster?.name,
    monster?.id,
    monster?.sourceFile
  ].filter(Boolean).join(' ').toLowerCase();

  const administrative =
    /game\s*master|gamemaster|gamemaxter|\bgm\b|god\b/.test(text);
  const questExclusive =
    /quest\s*monster|questmonster|quest\b/.test(text);
  const explicitBoss =
    Boolean(monster?.isBoss) ||
    /\bboss\b/.test(text) ||
    /shenron|ozaru|vegeta|freeza|cell\b|buu|janemba|broly|beerus|whis|zamasu|golden|liquer|hitto|gattai black/.test(text);

  return administrative || questExclusive || explicitBoss;
}

export const huntCurationReport = [];

for (const zone of zones) {
  const originalMonsters = Array.isArray(zone.monsters)
    ? zone.monsters
    : [];

  const removed = originalMonsters.filter(isExcludedHuntMonster);
  if (removed.length) {
    huntCurationReport.push({
      zoneId:zone.id,
      zoneName:zone.name,
      removed:removed.map(monster => ({
        id:monster.id,
        name:monster.name,
        sourceFile:monster.sourceFile || null,
        lookType:monster.lookType || null
      }))
    });
  }

  zone.monsters = originalMonsters
    .filter(monster => !isExcludedHuntMonster(monster))
    .map(monster => {
      const previewKey=`${zone.id}::${monster.id}`;
      // A handful of lookTypes (see patchBlankMonsterOutfits in
      // hunt-arena-renderer.js for the in-arena version of this same
      // fix) have a fully blank source spritesheet upstream, which also
      // corrupted their auto-generated hunt-preview thumbnail crop. The
      // same lookTypes have a real, clean portrait sitting in the
      // exact-transformations asset pack instead.
      const blankLookTypePortrait = BLANK_LOOKTYPE_PORTRAITS[monster.lookType];
      return {
        ...monster,
        huntPreview:
          blankLookTypePortrait ||
          (monster.lookType ? `./generated/web/absolute-monsters-png/${monster.lookType}.png` : null) ||
          huntPreviewByMonsterKey[previewKey] ||
          huntPreviewV2018ByMonsterKey[previewKey] ||
          './assets/generated/outfits/goku.png',
        sprite:monster.lookType
          ? `./generated/web/absolute-monsters-png/${monster.lookType}.png`
          : './generated/web/absolute-monsters-png/390.png'
      };
    });

  zone.disabledForHunt = zone.monsters.length === 0;
}


// V20.31 — Quest Reborn, reconstructed from the original tpmonster.lua.
// These zones are intentionally appended after normal Hunt curation because
// the bosses live under monster/Quest Reborn and must never appear in a
// regular hunt. Each stage contains exactly one original boss; the app moves
// to the next stage only when that boss dies.
export const rebornQuest = rebornQuestDefinition;
// V21.17: Whiss entra no Reborn com a sprite inicial 615.
if(rebornVocationMap['574'])rebornVocationMap['574']={...rebornVocationMap['574'],lookType:615,toVocation:575};
export { rebornQuestStages, rebornVocationMap };
for (const stage of rebornQuestStages) {
  // V20.32 — Reborn is endgame/group content. The previous Idle import
  // compressed 3–5 million source HP into ~15–25k, so advanced characters
  // deleted every boss almost instantly. Restore the source-million scale,
  // add a gentle stage escalation, and preserve the original attack ratios
  // while raising their pressure for a level-1000 encounter.
  const hpScale = Number(rebornQuestDefinition.bossHpScaleBase || 1) +
    Number(stage.index || 0) * Number(rebornQuestDefinition.bossHpScalePerStage || 0);
  const damageScale = Number(rebornQuestDefinition.bossDamageScaleBase || 1) +
    Number(stage.index || 0) * Number(rebornQuestDefinition.bossDamageScalePerStage || 0);
  const rebornSpellEffects=[80,222,236,53,41,113],rebornSpellMissiles=[36,31,19,40,24,3];
  const scaledAttacks = stage.attacks.map((attack,index) => ({
    ...attack,
    min:Number(attack.min || 0) * damageScale,
    max:Number(attack.max || 0) * damageScale,
    ...(index===0||String(attack.name||'').toLowerCase()==='melee'?{}:{type:'ki',range:Math.max(6,Number(attack.range||1)),effectId:rebornSpellEffects[index%rebornSpellEffects.length],missileId:rebornSpellMissiles[index%rebornSpellMissiles.length]})
  }));
  const attackValues = scaledAttacks.flatMap(attack => [
    Math.abs(Number(attack.min || 0)),
    Math.abs(Number(attack.max || 0))
  ]).filter(Boolean);
  const balancedHp = Math.max(
    Number(stage.sourceHp || 1),
    Math.round(Number(stage.sourceHp || 1) * hpScale)
  );
  const monster = {
    id:stage.bossId,
    name:stage.name,
    requiredLevel:rebornQuestDefinition.minimumLevel,
    hp:balancedHp,
    sourceHp:stage.sourceHp,
    originalHp:stage.sourceHp,
    xp:0,
    speed:stage.speed,
    lookType:stage.lookType,
    attackMin:Math.max(1, Math.min(...attackValues)),
    attackMax:Math.max(...attackValues, 1),
    attackInterval:Math.min(...scaledAttacks.map(a => Number(a.intervalMs || 1000))),
    attacks:scaledAttacks,
    loot:stage.loot,
    sourceFile:stage.sourceFile,
    isBoss:true,
    bossUsesKiSpells:true,
    bossSpellPriority:true,
    questOnly:true,
    originalSprite:true,
    sprite:`./generated/web/absolute-monsters-png/${stage.lookType}.png`,
    huntPreview:
      BLANK_LOOKTYPE_PORTRAITS[stage.lookType] ||
      `./assets/generated/exact-transformations/portraits/${stage.lookType}.png`,
    idleBalance:{
      policy:'reborn-quest-level-1000-party-scale',
      sourceHp:stage.sourceHp,
      balancedHp,
      hpScale,
      damageScale,
      difficultyLevel:rebornQuestDefinition.difficultyLevel,
      recommendedPartySize:rebornQuestDefinition.recommendedPartySize,
      sourceOrder:stage.index + 1
    }
  };
  zones.push({
    id:stage.id,
    name:`Quest Reborn · ${stage.name}`,
    description:'Etapa da Quest Reborn original.',
    level:rebornQuestDefinition.difficultyLevel,
    minEntryLevel:rebornQuestDefinition.minimumLevel,
    maxLevel:rebornQuestDefinition.maximumLevel,
    recommendedLevel:rebornQuestDefinition.difficultyLevel,
    lureOptions:[1],
    defaultLure:1,
    arenaTheme:'reborn',
    background:'linear-gradient(180deg,#34221b,#100b09)',
    questType:'reborn',
    questStage:stage.index,
    disabledForHunt:false,
    monsters:[monster]
  });
}


// V21.26.4 — display-name corrections. Internal ids stay unchanged for save compatibility.
if (characters.kaio) {
  characters.kaio.name = 'Shin';
  for (const form of (characters.kaio.forms || [])) {
    if (form.name === 'Kaio' || form.name === 'Kaioshin') form.name = 'Shin';
    else if (form.name === 'Kaio Reborn' || form.name === 'Kaioshin Reborn') form.name = 'Shin Reborn';
  }
}
if (characters.tsuful) {
  characters.tsuful.name = 'Baby Tsuful';
  for (const form of (characters.tsuful.forms || [])) {
    if (form.name === 'Tsuful') form.name = 'Baby Tsuful';
    else if (String(form.name || '').startsWith('Tsuful ·')) form.name = String(form.name).replace(/^Tsuful/, 'Baby Tsuful');
  }
}
if (characters.shenron) {
  characters.shenron.name = 'Li Shenron';
  for (const form of (characters.shenron.forms || [])) {
    if (form.name === 'Shenron') form.name = 'Li Shenron';
    else if (String(form.name || '').startsWith('Shenron ·')) form.name = String(form.name).replace(/^Shenron/, 'Li Shenron');
  }
}

// V20.67 — vocacoes Distance e conteudo VIP.
for (const id of ['freeza','bulma','c16']) {
  const c=characters[id]; if(!c) continue;
  c.serverFormula={...(c.serverFormula||{}),meleeDamage:1,distanceDamage:5};
  for(const f of c.forms||[]) if(f.formula) f.formula={...f.formula,meleeDamage:1,distanceDamage:5};
}
const vipVocationDefinitions={
  // The base lookType is the sprite shown before the first !transformar step.
  // Every following form is generated directly from talkactionStandardTransitions,
  // which mirrors transformar.lua. This prevents a pre-Reborn vocation from
  // accidentally borrowing sprites from the separate Reborn branch.
  kyabe:{seed:'goku',baseVocationId:690,baseLookType:691},
  vermouth:{seed:'beerus',baseVocationId:767,baseLookType:737},
  champa:{seed:'beerus',baseVocationId:734,baseLookType:683},
  paikuhan:{seed:'piccolo',baseVocationId:722,baseLookType:657},
  botamo:{seed:'majin-boo',baseVocationId:710,baseLookType:675},
  monaka:{seed:'krillin',baseVocationId:670,baseLookType:664}
};
export const vipTransformVerificationV216=[];
for(const [id,def] of Object.entries(vipVocationDefinitions)){
  const seed=characters[def.seed]||characters.goku;
  const display=id[0].toUpperCase()+id.slice(1);
  const chain=[{
    vocationId:Number(def.baseVocationId),lookType:Number(def.baseLookType),level:1,effect:0,sourceVocation:null
  }];
  let vocation=Number(def.baseVocationId), guard=0;
  while(talkactionStandardTransitions[String(vocation)] && guard++<16){
    const transition=talkactionStandardTransitions[String(vocation)];
    chain.push({
      vocationId:Number(transition.toVocation),
      lookType:Number(transition.lookType),
      level:Number(transition.requiredLevel||1),
      effect:Number(transition.effect||0),
      sourceVocation:vocation
    });
    vocation=Number(transition.toVocation);
  }
  const forms=chain.map((entry,index)=>({
    id:index===0?'base':`vip-form-${index+1}`,
    name:index===0?'Base':`${display} · Forma ${index+1}`,
    level:entry.level,
    vocationId:entry.vocationId,
    lookType:entry.lookType,
    effect:entry.effect,
    outfitId:`looktype-${entry.lookType}`,
    portrait:`./assets/generated/looktype-transformations/portraits/${entry.lookType}.png`,
    multiplier:1+index*.35,
    formula:seed.serverFormula
  }));
  vipTransformVerificationV216.push(Object.freeze({
    id,baseVocationId:def.baseVocationId,forms:forms.map(form=>({vocationId:form.vocationId,lookType:form.lookType,level:form.level}))
  }));
  characters[id]={...structuredClone(seed),id,name:display,vipVocation:true,
    vocationSourceId:def.baseVocationId,
    sprite:`./assets/generated/looktype-transformations/portraits/${def.baseLookType}.png`,
    outfitId:`looktype-${def.baseLookType}`,
    serverFormula:{...(seed.serverFormula||{}),meleeDamage:Number(seed.serverFormula?.meleeDamage||1)*2,distanceDamage:Number(seed.serverFormula?.distanceDamage||1)*2,kiDamage:Number(seed.serverFormula?.kiDamage||1)*2},
    forms:forms.map(f=>({...f,formula:f.formula?{...f.formula,meleeDamage:Number(f.formula.meleeDamage||1)*2,distanceDamage:Number(f.formula.distanceDamage||1)*2,kiDamage:Number(f.formula.kiDamage||1)*2}:f.formula}))};
}
Object.freeze(vipTransformVerificationV216);

// V21.2.2 — Quest vocations.
// These vocations cannot be purchased. They are unlocked account-wide by
// completing specific progression quests and use the same 2x combat scaling
// policy as VIP vocations. LookTypes/outfit ids follow transformar.lua.
export const questVocationsV2122 = Object.freeze({
  'quest-goku-black':{name:'Goku Black',seed:'goku',forms:[{vocationId:532,lookType:587,level:1},{vocationId:533,lookType:587,level:100},{vocationId:534,lookType:589,level:200}]},
  'quest-jiren':{name:'Jiren',seed:'broly',forms:[{vocationId:977,lookType:997,level:1},{vocationId:978,lookType:997,level:100},{vocationId:979,lookType:998,level:200}]},
  'quest-zamasu':{name:'Zamasu',seed:'kaio',forms:[{vocationId:562,lookType:607,level:1},{vocationId:563,lookType:608,level:100},{vocationId:564,lookType:609,level:200}]},
  'quest-whiss':{name:'Whiss',seed:'goku',forms:[{vocationId:572,lookType:615,level:1,outfitId:'exact-voc-572'},{vocationId:573,lookType:616,level:100,outfitId:'exact-voc-573'},{vocationId:574,lookType:619,level:200,outfitId:'exact-voc-574'},{vocationId:575,lookType:615,level:1,reborn:true,outfitId:'exact-voc-575'},{vocationId:576,lookType:616,level:50,reborn:true,outfitId:'exact-voc-576'},{vocationId:577,lookType:615,level:100,reborn:true,outfitId:'exact-voc-577'},{vocationId:578,lookType:619,level:200,reborn:true,outfitId:'exact-voc-578'},{vocationId:579,lookType:618,level:400,reborn:true,outfitId:'exact-voc-579'},{vocationId:580,lookType:620,level:600,reborn:true,outfitId:'exact-voc-580'},{vocationId:581,lookType:621,level:2000,reborn:true,outfitId:'exact-voc-581'}]},
  'quest-bills':{name:'Bills',seed:'goku',forms:[{vocationId:552,lookType:502,level:1},{vocationId:553,lookType:503,level:100},{vocationId:554,lookType:504,level:200}]}
});
for(const [id,def] of Object.entries(questVocationsV2122)){
  const seed=characters[def.seed]||characters.goku;
  const forms=def.forms.map((form,index)=>({
    id:index===0?'base':`quest-form-${index+1}`,
    name:index===0?'Base':`${def.name} · Forma ${index+1}`,
    level:Number(form.level ?? (index===0?1:100)),
    vocationId:form.vocationId,
    lookType:form.lookType,
    outfitId:`looktype-${form.lookType}`,
    portrait:`./assets/generated/looktype-transformations/portraits/${form.lookType}.png`,
    multiplier:1+index*.35,
    formula:{...(seed.serverFormula||{}),meleeDamage:Number(seed.serverFormula?.meleeDamage||1)*2,distanceDamage:Number(seed.serverFormula?.distanceDamage||1)*2,kiDamage:Number(seed.serverFormula?.kiDamage||1)*2}
  }));
  characters[id]={...structuredClone(seed),id,name:def.name,questVocation:true,
    vocationSourceId:forms[0].vocationId,
    sprite:forms[0].portrait,outfitId:forms[0].outfitId,
    serverFormula:{...(seed.serverFormula||{}),meleeDamage:Number(seed.serverFormula?.meleeDamage||1)*2,distanceDamage:Number(seed.serverFormula?.distanceDamage||1)*2,kiDamage:Number(seed.serverFormula?.kiDamage||1)*2},
    forms
  };
}


// V21.24.5 — VIP/Quest vocations are created after the generic Reborn pass,
// so their post-Reborn !transformar chains must be attached here as well.
// The source of truth is reborn.lua + transformar.lua, already imported into
// rebornVocationMap/talkactionStandardTransitions.
function appendLateRebornBranch(character){
  if(!character?.forms?.length)return;
  const forms=character.forms;
  const preReborn=[...forms].reverse().find(form=>rebornVocationMap[String(form.vocationId)]);
  if(!preReborn)return;
  const mapping=rebornVocationMap[String(preReborn.vocationId)];
  if(!forms.some(form=>Number(form.vocationId)===Number(mapping.toVocation))){
    forms.push({
      id:`reborn-voc-${mapping.toVocation}`,
      name:`${character.name} Reborn`,
      level:1,
      vocationId:Number(mapping.toVocation),
      lookType:Number(mapping.lookType),
      outfitId:`looktype-${Number(mapping.lookType)}`,
      portrait:`./assets/generated/looktype-transformations/portraits/${Number(mapping.lookType)}.png`,
      multiplier:Math.max(1.12,Number(preReborn.multiplier||1)*1.12),
      formula:preReborn.formula||character.serverFormula
    });
  }
  let vocation=Number(mapping.toVocation),guard=0;
  while(talkactionStandardTransitions[String(vocation)]&&guard++<24){
    const transition=talkactionStandardTransitions[String(vocation)];
    const nextVocation=Number(transition.toVocation);
    if(!forms.some(form=>Number(form.vocationId)===nextVocation)){
      forms.push({
        id:`post-reborn-voc-${nextVocation}`,
        name:`${character.name} · Reborn Forma ${nextVocation}`,
        level:Number(transition.requiredLevel||1),
        vocationId:nextVocation,
        lookType:Number(transition.lookType||mapping.lookType),
        outfitId:`looktype-${Number(transition.lookType||mapping.lookType)}`,
        portrait:`./assets/generated/looktype-transformations/portraits/${Number(transition.lookType||mapping.lookType)}.png`,
        multiplier:1.12+guard*.12,
        formula:character.serverFormula
      });
    }
    vocation=nextVocation;
  }
}
for(const id of ['kyabe','vermouth','champa','paikuhan','botamo','monaka','quest-goku-black','quest-jiren','quest-zamasu','quest-bills']){
  appendLateRebornBranch(characters[id]);
}

// The original transformar.lua points the Lv 2000 ultimate stages of Gohan
// and Kagome at lookTypes belonging to another character. Until a dedicated
// ultimate sprite is present in the source pack, keep each character on its
// own final Reborn appearance instead of cross-swapping to C17/King Vegeta.
const gohanUltimate=(characters.gohan?.forms||[]).find(form=>Number(form.vocationId)===502);
if(gohanUltimate){gohanUltimate.lookType=68;gohanUltimate.outfitId='looktype-68';gohanUltimate.portrait='./assets/generated/looktype-transformations/portraits/68.png';}
const kagomeUltimate=(characters.kagome?.forms||[]).find(form=>Number(form.vocationId)===496);
if(kagomeUltimate){kagomeUltimate.lookType=362;kagomeUltimate.outfitId='looktype-362';kagomeUltimate.portrait='./assets/generated/looktype-transformations/portraits/362.png';}

// V21.26.4 — global transformation milestone extension.
// Legacy routes still carrying the old endgame milestones are migrated before
// the curated route overlay is applied: Lv 800 -> 1000 and Lv 1000 -> 2000.
for (const character of Object.values(characters)) {
  for (const form of (character.forms || [])) {
    if (Number(form.level) === 800) form.level = 1000;
    else if (Number(form.level) === 1000) form.level = 2000;
  }
}

// V21.26 — WoDBO manual vocation pass.
// Apply this only after every legacy Free/VIP/Quest/Reborn branch has been
// assembled. The helper preserves all source vocation ids as compatibility
// aliases while replacing the active visual/progression routes with the 702
// manually validated WoDBO slots. Pending vocations are data-only and never
// enter `characters` until their Free/VIP/Quest policy is chosen.
export const activeWodboVocationsV2126 = Object.freeze(
  applyWodboVocationCatalog(characters,rebornVocationMap)
);
export const pendingVocationsV2126 = Object.freeze(
  pendingWodboVocationDefinitions()
);
export { wodboVocationCatalog, wodboPendingVocations };

// V21.2.1 — bosses are Free content gated by consumable tickets.
// Tickets are tradeable stackable items. VIP Hunts drop them at ~1%; Free Hunts at ~0.1% inside the boss level bracket.
export const bossTicketsV2121 = Object.freeze({
  'vip-boss-500':{itemId:'boss_ticket_champa',name:'Ticket: Champa Challenge',level:500,icon:'./assets/items/v2130/boss-ticket-champa.png'},
  'vip-boss-750':{itemId:'boss_ticket_golden_freeza',name:'Ticket: Golden Freeza Raid',level:750,icon:'./assets/items/v2130/boss-ticket-golden-freeza.png'},
  'vip-boss-1000':{itemId:'boss_ticket_zamasu',name:'Ticket: Julgamento de Zamasu',level:1000,icon:'./assets/items/v2130/boss-ticket-zamasu.png'},
  'vip-boss-1250':{itemId:'boss_ticket_liquer',name:'Ticket: Liquer Boss',level:1250,icon:'./assets/items/v2130/boss-ticket-liquir.png'},
  'vip-boss-1500':{itemId:'boss_ticket_vermouth',name:'Ticket: Vermouth Judgment',level:1500,icon:'./assets/items/v2130/boss-ticket-vermouth.png'}
});
for(const ticket of Object.values(bossTicketsV2121)){
  itemCatalog[ticket.itemId]={
    id:ticket.itemId,serverId:null,name:ticket.name,type:'ticket',rarity:'rare',icon:ticket.icon,
    description:`Consumido ao iniciar o Boss de nível ${ticket.level}. Em Party, somente o líder gasta o ticket. Negociável somente no Mercado Global.`,
    requiredLevel:ticket.level,stackable:true,value:0,buyPrice:null,sellPrice:null,noNpcSell:true,playerMarketOnly:true
  };
}

function vipMonsterVisual(lookType,{vocation=null}={}){
  if(vocation){
    return {
      sprite:`./assets/generated/vip-outfits/${vocation}-${lookType}.png`,
      huntPreview:`./assets/generated/vip-portraits/vip-${vocation}-${lookType}.png`,
      outfitId:`vip-${vocation}-${lookType}`,
      forceOutfitSheet:true
    };
  }
  return {
    sprite:`./generated/web/absolute-monsters-png/${lookType}.png`,
    huntPreview:`./generated/web/absolute-monsters-png/${lookType}.png`,
    outfitId:`vip-monster-${lookType}`
  };
}
function createVipContent({id,name,level,monsterName,lookType,vocation=null,boss=false,loot=[],ticketItemId=null}){
  const visual=vipMonsterVisual(lookType,{vocation});
  return {
    id,name,
    description:boss?'Boss Free com técnicas de Ki, ticket obrigatório e recompensas temáticas raras.':'Hunt exclusiva VIP com criatura, loot e Bestiário próprios.',
    level,maxLevel:level+199,recommendedLevel:level,recommended:boss?`Free · Ticket · Níveis ${level}+`:`VIP · Níveis ${level}+`,
    lureOptions:boss?[1]:[1,2,3,4,5,6,7,8],defaultLure:boss?1:5,
    arenaTheme:'space',background:'linear-gradient(180deg,#2a1642,#090b16)',
    vipOnly:!boss,contentType:boss?'boss':'hunt',bossTicketItemId:boss?ticketItemId:null,vipLootMultiplier:1.20,vipRarityBonus:1.35,
    monsters:[{
      id:`${id}-enemy`,name:monsterName,requiredLevel:level,
      hp:Math.round(level*1400),sourceHp:Math.round(level*1400),
      attackMin:Math.round(level*10),attackMax:Math.round(level*16),attackInterval:1000,
      xp:Math.round(level*900),speed:boss?360:320,lookType,...visual,loot
    }]
  };
}
const v212VipContent=[
  createVipContent({id:'vip-200',name:'Templo de Bills VIP',level:200,monsterName:'Ultra God Bills VIP',lookType:584,loot:[{serverId:2151,chance:18000,countMax:5}]}),
  createVipContent({id:'vip-350',name:'Santuário Zamasu VIP',level:350,monsterName:'Zamasu Disciple',lookType:610,loot:[{serverId:12779,chance:9000,countMax:3}]}),
  createVipContent({id:'vip-500',name:'Império Golden Freeza VIP',level:500,monsterName:'Golden Freeza Elite',lookType:603,loot:[{serverId:2151,chance:14000,countMax:7}]}),
  createVipContent({id:'vip-700',name:'Arena de Champa VIP',level:700,monsterName:'Champa Warrior',lookType:683,vocation:'champa',loot:[{serverId:12779,chance:8000,countMax:4}]}),
  createVipContent({id:'vip-750',name:'Domínio Golden Freeza VIP',level:750,monsterName:'Golden Freeza Elite Guard',lookType:603,loot:[{serverId:2151,chance:13000,countMax:7}]}),
  createVipContent({id:'vip-900',name:'Dimensão Vermouth VIP',level:900,monsterName:'Vermouth Destroyer',lookType:737,vocation:'vermouth',loot:[{serverId:2151,chance:12000,countMax:8}]}),
  createVipContent({id:'vip-1000',name:'Fenda Zamasu VIP',level:1000,monsterName:'Zamasu Elite',lookType:610,loot:[{serverId:12779,chance:7000,countMax:4}]}),
  createVipContent({id:'vip-1250',name:'Território Liquer VIP',level:1250,monsterName:'Liquer Elite',lookType:971,loot:[{serverId:2151,chance:10000,countMax:9}]}),
  createVipContent({id:'vip-1500',name:'Reino Vermouth VIP',level:1500,monsterName:'Vermouth Elite',lookType:737,vocation:'vermouth',loot:[{serverId:2151,chance:9000,countMax:10}]}),

  createVipContent({id:'vip-boss-500',name:'Champa Challenge',level:500,monsterName:'Champa',lookType:683,vocation:'champa',boss:true,ticketItemId:'boss_ticket_champa',loot:[
    {serverId:13407,chance:300,countMax:1},{serverId:2157,chance:700,countMax:1}
  ]}),
  createVipContent({id:'vip-boss-750',name:'Golden Freeza Raid',level:750,monsterName:'Golden Freeza',lookType:603,boss:true,ticketItemId:'boss_ticket_golden_freeza',loot:[
    {serverId:2393,chance:180,countMax:1},{serverId:2502,chance:130,countMax:1},{serverId:2503,chance:110,countMax:1},{serverId:2504,chance:110,countMax:1},{serverId:7891,chance:130,countMax:1}
  ]}),
  createVipContent({id:'vip-boss-1000',name:'Julgamento de Zamasu',level:1000,monsterName:'Zamasu',lookType:610,boss:true,ticketItemId:'boss_ticket_zamasu',loot:[
    {serverId:2395,chance:180,countMax:1},{serverId:2510,chance:120,countMax:1},{serverId:2511,chance:100,countMax:1},{serverId:2512,chance:100,countMax:1},{serverId:2513,chance:120,countMax:1},{serverId:12605,chance:90,countMax:1}
  ]}),
  createVipContent({id:'vip-boss-1250',name:'Liquer Boss',level:1250,monsterName:'Liquer Boss',lookType:971,boss:true,ticketItemId:'boss_ticket_liquer',loot:[
    {serverId:2457,chance:160,countMax:1},{serverId:2463,chance:130,countMax:1},{serverId:2645,chance:130,countMax:1},{serverId:2647,chance:130,countMax:1},{serverId:13537,chance:100,countMax:1}
  ]}),
  createVipContent({id:'vip-boss-1500',name:'Vermouth Judgment',level:1500,monsterName:'Vermouth',lookType:737,vocation:'vermouth',boss:true,ticketItemId:'boss_ticket_vermouth',loot:[
    {serverId:2498,chance:140,countMax:1},{serverId:2487,chance:110,countMax:1},{serverId:2488,chance:110,countMax:1},{serverId:2642,chance:130,countMax:1},{serverId:2519,chance:110,countMax:1},{serverId:13538,chance:90,countMax:1}
  ]})
];
zones.push(...v212VipContent);

// V21.8.0 — Boss cooperativo da Guild. A zona nunca aparece na lista de
// Hunts/Bosses e so pode ser iniciada pelo servidor depois do convite da Guild.
// O lookType 743 e o Daishinkan da base original. Cada sobrevivente recebe sua
// propria rolagem de recompensas ao final do combate.
export const GUILD_BOSS_ZONE_ID='guild-daishinkan-boss';
export const GUILD_CHAMPA_BOSS_ZONE_ID='guild-champa-boss';
export const guildBossZoneV218={
  id:GUILD_BOSS_ZONE_ID,
  name:'Boss da Guild · Daishinkan',
  description:'Desafio cooperativo de Guild. Invocação consome 100 PP do Cofre e a tentativa e perdida se todos os participantes morrerem.',
  level:1000,maxLevel:5000,recommendedLevel:1500,recommended:'Guild · Grupo numeroso recomendado',
  lureOptions:[1],defaultLure:1,maxLure:1,arenaTheme:'space',
  background:'linear-gradient(180deg,#14213d,#050812)',vipOnly:false,
  contentType:'guild-boss',guildBoss:true,guildBossType:'daishinkan',guildDragonBallChance:0.05,hiddenFromHuntList:true,
  monsters:[{
    id:'guild-daishinkan-boss-enemy',name:'Daishinkan · Guardião da Guild',requiredLevel:1,
    hp:75000000,sourceHp:75000000,attackMin:45000,attackMax:80000,attackInterval:900,
    xp:60000000,speed:460,lookType:743,
    sprite:'./assets/generated/exact-transformations/portraits/758.png',
    huntPreview:'./assets/generated/exact-transformations/portraits/758.png',outfitId:'exact-voc-758',forceOutfitSheet:true,
    guildBossOutfitSheet:'./assets/generated/exact-transformations/outfits/758.png',
    isBoss:true,bossUsesKiSpells:true,bossSpellPriority:true,
    attacks:[
      {name:'Golpe Divino',chance:100,intervalMs:900,range:1,type:'physical',min:-45000,max:-80000},
      {name:'Pulso do Daishinkan',chance:42,intervalMs:2200,range:7,type:'ki',min:-52000,max:-96000,effectId:222,missileId:31},
      {name:'Julgamento Celestial',chance:24,intervalMs:4200,range:8,type:'ki',min:-68000,max:-118000,effectId:236,missileId:36}
    ],
    // Chance usa base 100000: 20000 = 20%. Bencao do Abate aplica somente
    // ao loot-base abaixo; Esferas sao roladas separadamente a exatos 5% cada.
    loot:[
      {itemId:'boss_ticket_champa',chance:20000,countMax:1},
      {itemId:'boss_ticket_golden_freeza',chance:20000,countMax:1},
      {itemId:'boss_ticket_zamasu',chance:20000,countMax:1},
      {itemId:'boss_ticket_liquer',chance:20000,countMax:1},
      {itemId:'boss_ticket_vermouth',chance:20000,countMax:1},
      // V21.12.0 — drops exclusivos adicionais do Daishinkan da Guild.
      // 5% base cada; por serem loot-base, podem receber Bênção do Abate.
      {serverId:2138,chance:5000,countMax:1}, // Majora Amulet
      {serverId:2529,chance:5000,countMax:1}, // Blue Potara Ring
      {serverId:2157,chance:100000,countMin:10,countMax:100}
    ]
  }]
};

// V21.9.0 — segundo Boss da Guild. Champa Doll (server_13407) e consumida
// do inventario do invocador. Ele e bem mais fraco que o Daishinkan, mas
// continua sendo um encontro cooperativo com 1 minuto de janela para entrada.
export const guildChampaBossZoneV219={
  id:GUILD_CHAMPA_BOSS_ZONE_ID,
  name:'Boss da Guild · Champa',
  description:'Desafio cooperativo de Guild invocado com 1 Champa Doll do jogador. Recrutas nao podem invocar.',
  level:500,maxLevel:5000,recommendedLevel:850,recommended:'Guild · Grupo recomendado',
  lureOptions:[1],defaultLure:1,maxLure:1,arenaTheme:'earth',
  background:'linear-gradient(180deg,#49321c,#121009)',vipOnly:false,
  contentType:'guild-boss',guildBoss:true,guildBossType:'champa',guildDragonBallChance:0.01,hiddenFromHuntList:true,
  monsters:[{
    id:'guild-champa-boss-enemy',name:'Champa · Desafio da Guild',requiredLevel:1,
    hp:18000000,sourceHp:18000000,attackMin:10000,attackMax:22000,attackInterval:1100,
    xp:18000000,speed:420,lookType:683,
    sprite:'./assets/generated/vip-portraits/vip-champa-683.png',
    huntPreview:'./assets/generated/vip-portraits/vip-champa-683.png',outfitId:'vip-champa-683',forceOutfitSheet:true,
    guildBossOutfitSheet:'./assets/generated/vip-outfits/champa-683.png',
    isBoss:true,bossUsesKiSpells:true,bossSpellPriority:true,
    attacks:[
      {name:'Golpe de Champa',chance:100,intervalMs:1100,range:1,type:'physical',min:-10000,max:-22000},
      {name:'Hakai de Champa',chance:42,intervalMs:2400,range:7,type:'ki',min:-14000,max:-30000,effectId:80,missileId:36},
      {name:'Explosao do Universo 6',chance:22,intervalMs:4200,range:8,type:'ki',min:-20000,max:-39000,effectId:222,missileId:31}
    ],
    // Tickets: 5% base cada. Esferas: 1% fixo cada. Mystic Senzu: 5–50.
    loot:[
      {itemId:'boss_ticket_champa',chance:5000,countMax:1},
      {itemId:'boss_ticket_golden_freeza',chance:5000,countMax:1},
      {itemId:'boss_ticket_zamasu',chance:5000,countMax:1},
      {itemId:'boss_ticket_liquer',chance:5000,countMax:1},
      {itemId:'boss_ticket_vermouth',chance:5000,countMax:1},
      {serverId:2157,chance:100000,countMin:5,countMax:50}
    ]
  }]
};
zones.push(guildBossZoneV218,guildChampaBossZoneV219);

// V21.6.0 — boss equipment now follows the boss-level ladder instead of the
// irregular legacy item values. Internal `defense` remains for combat math;
// the UI continues to show only Armor on body pieces to avoid duplication.
const v216BossItemTiers=Object.freeze({
  'vip-boss-750': {level:750, armor:300, regen:9000, attack:42, weaponDefense:34, mainSkill:36, weaponSkill:11, defenseSkill:9, kiSkill:5, bodyResist:7, headResist:4, speed:35},
  'vip-boss-1000':{level:1000,armor:340, regen:10000,attack:48, weaponDefense:36, mainSkill:44, weaponSkill:15, defenseSkill:11,kiSkill:7, bodyResist:8, headResist:4, speed:40},
  'vip-boss-1250':{level:1250,armor:400, regen:12000,attack:55, weaponDefense:42, mainSkill:52, weaponSkill:18, defenseSkill:13,kiSkill:9, bodyResist:9, headResist:5, speed:45},
  'vip-boss-1500':{level:1500,armor:470, regen:15000,attack:63, weaponDefense:48, mainSkill:60, weaponSkill:21, defenseSkill:15,kiSkill:11,bodyResist:10,headResist:6, speed:55}
});
function v216ItemByServerId(serverId){
  return Object.values(itemCatalog).find(item=>Number(item?.serverId)===Number(serverId));
}
function v216SetStat(item,key,value){
  item.stats ||= {};
  item.sourceAttributes ||= {};
  item.stats[key]=value;
  if(key==='hpRegenPerSecond'){ item.stats.hpRegen=value; item.sourceAttributes.healthGain=value; }
  else if(key==='kiRegenPerSecond'){ item.stats.kiRegen=value; item.sourceAttributes.manaGain=value; }
  else item.sourceAttributes[key]=value;
}
export const bossDropProgressionV216=[];
for(const [zoneId,tier] of Object.entries(v216BossItemTiers)){
  const zone=zones.find(entry=>entry.id===zoneId);
  const normalized=[];
  for(const drop of (zone?.monsters?.[0]?.loot||[])){
    const item=drop.itemId?itemCatalog[drop.itemId]:v216ItemByServerId(drop.serverId);
    if(!item || item.type==='currency' || item.stackable || item.moveable===false)continue;
    const type=String(item.type||'').toLowerCase();
    item.requiredLevel=tier.level;
    item.requirements={...(item.requirements||{}),level:tier.level};
    item.idleBalance={...(item.idleBalance||{}),bossDropLevel:tier.level,statPolicy:'v21.6-progressive-boss-tier'};
    if(['helmet','armor','legs','boots'].includes(type)){
      v216SetStat(item,'armor',tier.armor);
      item.stats.defense=tier.armor;
      item.sourceAttributes.defense=tier.armor;
      v216SetStat(item,'hpRegenPerSecond',tier.regen);
      v216SetStat(item,'kiRegenPerSecond',tier.regen);
      item.sourceAttributes.healthTicks=1000;
      item.sourceAttributes.manaTicks=1000;
      item.stats.skillBonuses={...(item.stats.skillBonuses||{})};
      if(type==='helmet'){
        item.stats.skillBonuses.gloves=Math.max(Number(item.stats.skillBonuses.gloves||0),tier.mainSkill);
        item.stats.skillBonuses.defense=Math.max(Number(item.stats.skillBonuses.defense||0),tier.defenseSkill);
        item.stats.allResistance=Math.max(Number(item.stats.allResistance||0),tier.headResist);
      }else if(type==='armor'){
        item.stats.allResistance=Math.max(Number(item.stats.allResistance||0),tier.bodyResist);
      }else{
        item.stats.skillBonuses.kiLevel=Math.max(Number(item.stats.skillBonuses.kiLevel||0),tier.kiSkill);
        if(type==='boots')item.stats.speed=Math.max(Number(item.stats.speed||0),tier.speed);
      }
      item.description=`Armor ${tier.armor} · regeneração de HP/Ki +${tier.regen.toLocaleString('pt-BR')}/s.`;
    }else if(type==='weapon'){
      item.stats ||= {};
      if(Number(item.stats.attack||item.sourceAttributes?.attack||0)>0){
        v216SetStat(item,'attack',tier.attack);
        v216SetStat(item,'defense',tier.weaponDefense);
        item.stats.skillBonuses={...(item.stats.skillBonuses||{}),gloves:Math.max(Number(item.stats.skillBonuses?.gloves||0),tier.weaponSkill),defense:Math.max(Number(item.stats.skillBonuses?.defense||0),tier.defenseSkill)};
        item.description=`Ataque ${tier.attack} · defesa ${tier.weaponDefense} · equipamento do boss Lv ${tier.level}.`;
      }else{
        const shieldDefense=Math.max(tier.armor-20,tier.weaponDefense);
        v216SetStat(item,'defense',shieldDefense);
        item.stats.allResistance=Math.max(Number(item.stats.allResistance||0),tier.bodyResist);
        item.description=`Defesa ${shieldDefense} · resistência ${item.stats.allResistance}% · equipamento do boss Lv ${tier.level}.`;
      }
    }
    normalized.push({serverId:Number(item.serverId||0),name:item.name,type:item.type,requiredLevel:item.requiredLevel,armor:Number(item.stats?.armor||0),attack:Number(item.stats?.attack||0),defense:Number(item.stats?.defense||0),regen:Number(item.stats?.hpRegenPerSecond||item.stats?.hpRegen||0)});
  }
  bossDropProgressionV216.push(Object.freeze({zoneId,...tier,items:normalized}));
}
Object.freeze(bossDropProgressionV216);

// V21.10.0 — corrige todas as entradas que compartilham o serverId do
// Liquer Armor. O catálogo possui um alias legado (`armor`) e a entrada
// `server_2463`; corrigir somente o primeiro fazia algumas telas/rotinas ainda
// exibirem os atributos antigos (Armor 260 / regen 8k).
export const liquerArmorBalanceV2110=Object.freeze(
  Object.values(itemCatalog).filter(item=>Number(item?.serverId)===2463)
);
export const liquerArmorBalanceV219=liquerArmorBalanceV2110[0]||null;
for(const item of liquerArmorBalanceV2110){
  item.requiredLevel=1250;
  item.requirements={...(item.requirements||{}),level:1250};
  v216SetStat(item,'armor',420);
  item.stats.defense=420;
  item.stats.allResistance=Math.max(9,Number(item.stats.allResistance||0));
  item.sourceAttributes.defense=420;
  item.sourceAttributes.absorbPercentAll=9;
  v216SetStat(item,'hpRegenPerSecond',14000);
  v216SetStat(item,'kiRegenPerSecond',14000);
  item.sourceAttributes.healthTicks=1000;
  item.sourceAttributes.manaTicks=1000;
  item.description='Armor 420 · regeneração de HP/Ki +14.000/s · resistência geral 9% · equipamento do boss Lv 1250.';
  item.idleBalance={...(item.idleBalance||{}),bossDropLevel:1250,statPolicy:'v21.10-liquer-armor'};
}

// V21.10.0 — a Goku Black Armor é recompensa da quest Lv500 e precisa ser
// claramente superior à Fusion Armor (Armor 50 / regen 3.500/s).
export const gokuBlackArmorBalanceV2110=Object.freeze(
  Object.values(itemCatalog).filter(item=>Number(item?.serverId)===2464)
);
for(const item of gokuBlackArmorBalanceV2110){
  v216SetStat(item,'armor',80);
  item.stats.defense=80;
  item.sourceAttributes.defense=80;
  v216SetStat(item,'hpRegenPerSecond',6000);
  v216SetStat(item,'kiRegenPerSecond',6000);
  item.sourceAttributes.healthTicks=1000;
  item.sourceAttributes.manaTicks=1000;
  item.description='Armor 80 · regeneração de HP/Ki +6.000/s · recompensa da Quest de Goku Black.';
  item.idleBalance={...(item.idleBalance||{}),statPolicy:'v21.10-goku-black-quest-balance'};
}

// V21.12.0 — recompensas das Quests passam a ser sidegrades de progressão,
// nunca substitutos superiores aos equipamentos dos Bosses da mesma faixa.
// Mantemos a Goku Black Armor acima da Fusion Armor (pedido anterior), mas
// abaixo do equipamento de Boss Lv750. Jiren/Kaioshin eram os maiores outliers.
export const questRewardBalanceV2112=[];
function v2112QuestArmor(serverId,{armor,hpRegen=0,kiRegen=0,resistance=null,kiLevel=null,speed=null,description=''}){
  for(const item of Object.values(itemCatalog).filter(entry=>Number(entry?.serverId)===Number(serverId))){
    v216SetStat(item,'armor',armor);item.stats.defense=armor;item.sourceAttributes.defense=armor;
    if(hpRegen>0){v216SetStat(item,'hpRegenPerSecond',hpRegen);item.sourceAttributes.healthTicks=1000;}
    if(kiRegen>0){v216SetStat(item,'kiRegenPerSecond',kiRegen);item.sourceAttributes.manaTicks=1000;}
    if(resistance!=null){item.stats.allResistance=Number(resistance);item.sourceAttributes.absorbPercentAll=Number(resistance);}
    if(kiLevel!=null){item.stats.skillBonuses={...(item.stats.skillBonuses||{}),kiLevel:Number(kiLevel)};item.sourceAttributes.magiclevelpoints=Number(kiLevel);}
    if(speed!=null){item.stats.speed=Number(speed);item.sourceAttributes.speed=Number(speed);}
    item.description=description||`Armor ${armor} · recompensa de Quest balanceada abaixo dos equipamentos de Boss equivalentes.`;
    item.idleBalance={...(item.idleBalance||{}),statPolicy:'v21.12-quest-sidegrade-below-boss'};
    questRewardBalanceV2112.push({serverId:Number(serverId),name:item.name,armor:Number(item.stats.armor||0),hpRegen:Number(item.stats.hpRegenPerSecond||0),kiRegen:Number(item.stats.kiRegenPerSecond||0),resistance:Number(item.stats.allResistance||0)});
  }
}
// Goku Black mantém superioridade sobre Fusion Armor (50 / 3.500/s), sem
// alcançar Golden Freeza Boss (300 / 9.000/s).
v2112QuestArmor(2464,{armor:80,hpRegen:6000,kiRegen:6000,description:'Armor 80 · regeneração de HP/Ki +6.000/s · superior à Fusion Armor, mas abaixo dos equipamentos de Boss.'});
// Freeza quest set permanece bem abaixo do Boss Lv750.
for(const sid of [2376,2378,2379])v2112QuestArmor(sid,{armor:120,hpRegen:5000,kiRegen:5000,description:'Armor 120 · regeneração de HP/Ki +5.000/s · equipamento de Quest, abaixo do Boss Lv750.'});
v2112QuestArmor(2382,{armor:120,hpRegen:5000,kiRegen:5000,speed:15,description:'Armor 120 · regeneração de HP/Ki +5.000/s · velocidade +15 · equipamento de Quest.'});
// Jiren Lv700 estava acima do Golden Freeza Lv750. Reduzido para ~80% do
// armor e regen do Boss Lv750.
v2112QuestArmor(2539,{armor:240,hpRegen:7200,kiRegen:7200,resistance:4,description:'Armor 240 · regeneração de HP/Ki +7.200/s · resistência geral 4% · recompensa de Quest.'});
// Kaioshin Lv900 não ultrapassa Zamasu Lv1000 nem o regen do Boss Lv750.
v2112QuestArmor(13444,{armor:220,hpRegen:7800,kiRegen:0,kiLevel:4,description:'Armor 220 · regeneração de HP +7.800/s · Ki Level +4 · recompensa de Quest.'});
// Bills Lv1300 continua abaixo do conjunto Liquer Lv1250 em atributos brutos,
// funcionando como alternativa de mobilidade em vez de upgrade absoluto.
v2112QuestArmor(13499,{armor:300,hpRegen:9500,kiRegen:9500,kiLevel:4,speed:35,description:'Armor 300 · regeneração de HP/Ki +9.500/s · Ki Level +4 · velocidade +35 · recompensa de Quest.'});
Object.freeze(questRewardBalanceV2112);
for(const spell of spells){
  const n=String(spell.name||'').toLowerCase();
  if(n==='big explosion'||n.includes('super speed')||n.includes('giga power up'))spell.premium=true;
  if(Number(spell.level)>=600 && n.includes('power up'))spell.premium=true;
}



// V21.12.0 — Rings que concedem Strength passam a conceder exatamente a
// mesma quantidade de Distance/Ki Blasting. O importador original soma os
// bônus melee em `gloves`, mas não espelhava esse valor para Distance.
export const ringDistanceBalanceV2111=[];
for(const item of Object.values(itemCatalog)){
  if(String(item?.type||'').toLowerCase()!=='ring')continue;
  const bonuses=item.stats?.skillBonuses;
  if(!bonuses)continue;
  const strength=Number(bonuses.gloves ?? bonuses.strength ?? 0);
  if(!Number.isFinite(strength)||strength===0)continue;
  bonuses.gloves=strength;
  bonuses.kiBlasting=strength;
  item.sourceAttributes ||= {};
  item.sourceAttributes.skillDist=strength;
  item.idleBalance={...(item.idleBalance||{}),ringSkillPolicy:'v21.11-strength-equals-distance'};
  ringDistanceBalanceV2111.push(item);
}
Object.freeze(ringDistanceBalanceV2111);

// V21.17.0 — Amuletos/necklaces seguem a mesma política dos Rings:
// qualquer Strength concedido também concede Distance/Ki Blasting equivalente.
export const amuletDistanceBalanceV2117=[];
for(const item of Object.values(itemCatalog)){
  const type=String(item?.type||'').toLowerCase(),name=String(item?.name||'').toLowerCase();
  if(type!=='necklace'&&!name.includes('amulet'))continue;
  const bonuses=item.stats?.skillBonuses;if(!bonuses)continue;
  const strength=Number(bonuses.gloves ?? bonuses.strength ?? 0);if(!Number.isFinite(strength)||strength===0)continue;
  bonuses.gloves=strength;bonuses.kiBlasting=strength;item.sourceAttributes ||= {};item.sourceAttributes.skillDist=strength;
  item.idleBalance={...(item.idleBalance||{}),amuletSkillPolicy:'v21.17-strength-equals-distance'};amuletDistanceBalanceV2117.push(item);
}
Object.freeze(amuletDistanceBalanceV2117);

// V21.1 — global hunt/drop rebalance.
// A single deterministic pass replaces the irregular imported hunt scaling with
// a smooth level curve while preserving each monster's identity/art/attacks.
const V211_STARTER_SERVER_IDS = new Set(
  Object.values(itemCatalog)
    .filter(item => String(item?.id || '').startsWith('starter_') || item?.idleBalance?.levelPolicy === 'starter-kit-level-1')
    .map(item => Number(item.serverId || 0))
    .filter(Boolean)
);
const V211_CURRENCY_IDS = new Set([2148, 2152, 2160]);
// Legacy Tibia equipment that the first V21.1 broad "unused item" pass could inject.
// Never allow these IDs in hunt loot.
const V211_TIBIA_EQUIPMENT_IDS = new Set([2175,2181,2182,2183,2185,2186,2187,2188,2189,2190,2191,2195,2321,2323,2342,2343,2358,2377,2380,2381,2383,2384,2385,2391,2392,2430,2434,2448]);
const V211_EQUIPMENT_TYPES = new Set(['helmet','armor','legs','boots','weapon','amulet','accessory','ammo']);
// V21.1.2 — only DBO/custom equipment may be auto-introduced into hunt loot.
// The Absolute catalog also contains legacy Tibia equipment (rods, spellbooks,
// swords, axes, generic dragon gear, etc.); those assets remain available to
// tooling/admin commands but are never injected by the hunt progression pass.
const V211_DBO_ITEM_NAME = /(goku|vegeta|freeza|frieza|cell|majin|buu|boo|saiyan|piccolo|gohan|trunks|goten|broly|beerus|whiss|whis|champa|kyabe|monaka|botamo|vermouth|paikuhan|kaioshin|shenron|porunga|bulma|android|bardock|raditz|nappa|vegetto|vegito|gogeta|jiren|zamasu|janemba|fusion|kame|gattai|liquer|absolut)/i;
const v211ItemEntries = Object.values(itemCatalog);
const v211UsedServerIds = new Set();
for (const zone of zones) for (const monster of (zone.monsters || [])) {
  for (const drop of (monster.loot || [])) if (Number(drop?.serverId)) v211UsedServerIds.add(Number(drop.serverId));
}
const v211UnusedEquipment = v211ItemEntries
  .filter(item => Number(item?.serverId) > 0)
  .filter(item => !V211_STARTER_SERVER_IDS.has(Number(item.serverId)))
  .filter(item => !V211_TIBIA_EQUIPMENT_IDS.has(Number(item.serverId)))
  .filter(item => V211_EQUIPMENT_TYPES.has(String(item.type || '').toLowerCase()))
  .filter(item => V211_DBO_ITEM_NAME.test(String(item.name || '')))
  .filter(item => !v211UsedServerIds.has(Number(item.serverId)))
  .filter(item => item.moveable !== false && !item.stackable)
  .filter((item, index, arr) => arr.findIndex(other => Number(other.serverId) === Number(item.serverId)) === index)
  .sort((a,b) => Number(a.serverId)-Number(b.serverId));

function v211Round(value, step=1){ return Math.max(step, Math.round(Number(value||0)/step)*step); }
function v211Clamp(value,min,max){ return Math.max(min,Math.min(max,value)); }
function v211SetRequiredLevel(serverId, level){
  for (const item of v211ItemEntries) if (Number(item?.serverId) === Number(serverId)) {
    item.requiredLevel = level;
    item.requirements = {...(item.requirements||{}), level};
    item.idleBalance = {...(item.idleBalance||{}), dropRequiredLevel:level, levelPolicy:'v21.1-hunt-progression'};
  }
}

for (const item of v211UnusedEquipment) {
  item.questOnly = true;
  item.idleBalance = {
    ...(item.idleBalance || {}),
    progressionSource:'future-quest-reward',
    dropPolicy:'quest-only'
  };
  if (typeof item.description === 'string' && !/quest/i.test(item.description)) {
    item.description = item.description.trim() + ' Recompensa reservada para quests de progressão.';
  }
}

const v211HuntZones = zones
  .filter(zone => zone && zone.disabledForHunt !== true && zone.questType !== 'reborn' && zone.guildBoss !== true)
  .sort((a,b) => Number(a.level||1)-Number(b.level||1) || String(a.id).localeCompare(String(b.id)));
let v211UnusedCursor = 0;
for (const zone of v211HuntZones) {
  const level = Math.max(1, Number(zone.level || zone.recommendedLevel || 1));
  const monsters = zone.monsters || [];
  const hpOrder = [...monsters].sort((a,b)=>Number(a.sourceHp||a.hp||1)-Number(b.sourceHp||b.hp||1));
  const denom = Math.max(1, hpOrder.length - 1);
  for (const monster of monsters) {
    const idx = Math.max(0, hpOrder.indexOf(monster));
    const role = 0.90 + (idx/denom)*0.22; // 0.90 .. 1.12 within one hunt
    const bossFactor = monster.isBoss || zone.contentType === 'boss' ? 2.25 : 1;
    // Level 200 ~= 235–292k HP, level 1000 ~= 1.27–1.58m HP.
    const targetHp = (120 * Math.pow(level,1.45)) * role * bossFactor;
    const targetMaxDamage = (6.0 * Math.pow(level,1.15)) * (0.94 + (idx/denom)*0.12) * (bossFactor>1?1.18:1);
    const targetMinDamage = targetMaxDamage * 0.58;
    const targetXp = targetHp * (0.50 + Math.min(0.18, level/10000)) * (zone.vipOnly ? 1.12 : 1);
    monster.originalHp ??= monster.hp;
    monster.originalAttackMin ??= monster.attackMin;
    monster.originalAttackMax ??= monster.attackMax;
    monster.originalXp ??= monster.xp;
    monster.hp = v211Round(targetHp, 10);
    monster.sourceHp = monster.hp;
    monster.attackMin = v211Round(targetMinDamage, 1);
    monster.attackMax = Math.max(monster.attackMin+1, v211Round(targetMaxDamage, 1));
    monster.xp = v211Round(targetXp, 10);
    monster.idleBalance = {...(monster.idleBalance||{}), policy:'v21.1-global-curve', level, role:Number(role.toFixed(3)), hpExponent:1.45, damageExponent:1.15, xpPolicy:'ttk-proportional'};

    // Rebuild direct currency reward around effort/TTK. Equipment and consumables
    // remain meaningful but extreme imported chances are clamped.
    const targetZeni = Math.max(8, Math.round((18 * Math.pow(level,1.13) + monster.hp*0.018) * (zone.vipOnly?1.15:1)));
    const retained = [];
    for (const drop of (monster.loot || [])) {
      const sid=Number(drop?.serverId||0);
      if(V211_CURRENCY_IDS.has(sid) || V211_TIBIA_EQUIPMENT_IDS.has(sid)) continue;
      const item=drop?.itemId?itemCatalog[drop.itemId]:v211ItemEntries.find(entry=>Number(entry?.serverId)===sid);
      // V21.1.3 — progression equipment was moved out of random hunt drops.
      // These items are now reserved for bespoke quests / end-of-hunt rewards.
      if (drop?.balanceSource === 'v21.1-unused-item-progression' || item?.questOnly) continue;
      const type=String(item?.type||'').toLowerCase();
      const copy={...drop};
      if(V211_EQUIPMENT_TYPES.has(type)) copy.chance=Math.round(v211Clamp(Number(copy.chance||0),120,1800)); // .12–1.8%
      else if(item?.stackable) copy.chance=Math.round(v211Clamp(Number(copy.chance||0),800,35000));
      else copy.chance=Math.round(v211Clamp(Number(copy.chance||0),250,12000));
      retained.push(copy);
    }
    const dollarCount=Math.max(1,Math.ceil((targetZeni/100)*2)); // average ~targetZeni at 100% chance
    retained.unshift({serverId:2152,chance:100000,countMax:dollarCount,balanceSource:'v21.1-ttk-zeni'});
    monster.loot=retained;
  }

  // V21.1.3 — no random progression equipment injection in Hunts.
  // Unused DBO equipment stays reserved for future quest rewards.
}
for (const item of v211UnusedEquipment) {
  const reqLevel = Math.max(1, Math.floor(Number(item.requiredLevel || item.level || 1)));
  v211SetRequiredLevel(Number(item.serverId), reqLevel);
}

export const globalHuntBalanceV211 = Object.freeze({
  version:'21.1.3',
  zonesBalanced:v211HuntZones.length,
  newlyUsedEquipment:v211UnusedCursor,
  starterServerIds:[...V211_STARTER_SERVER_IDS],
  hpExponent:1.45,
  damageExponent:1.15,
  currencyPolicy:'TTK proportional',
  equipmentChanceRange:[280,1800]
});


// V21.22 — auditoria cruzada com os monster XML do servidor DBO original.
// O importador legado tinha três colisões de nomes/arquivos que herdavam o
// lookType de outra criatura. Corrigimos pela origem (sourceFile), nunca pelo
// nome exibido, e mantemos preview/sprite apontando para o mesmo lookType.
const V2122_SOURCE_LOOKTYPE_FIXES = Object.freeze({
  'Ginyu Squad.xml':434,
  'Clone Ghost.xml':421,
  'Dabura Killer.xml':432
});
for (const zone of zones) {
  for (const monster of (zone.monsters || [])) {
    const fixedLookType=V2122_SOURCE_LOOKTYPE_FIXES[String(monster.sourceFile || '')];
    if (!fixedLookType || Number(monster.lookType) === fixedLookType) continue;
    monster.lookType=fixedLookType;
    monster.sprite=`./generated/web/absolute-monsters-png/${fixedLookType}.png`;
    monster.huntPreview=`./generated/web/absolute-monsters-png/${fixedLookType}.png`;
    delete monster.outfitId;
  }
}

// V21.2 — each monster receives its own Hunt entry. The original mixed areas
// remain in the registry for save/backward compatibility but are hidden from
// the picker. This preserves each source monster's original loot identity and
// gives Bestiary hunters several valid choices inside the same level bracket.
const v212SplitHunts=[];
for(const sourceZone of [...zones]){
  if(sourceZone.vipOnly||sourceZone.contentType==='boss'||sourceZone.questType==='reborn'||sourceZone.disabledForHunt)continue;
  const monsters=Array.isArray(sourceZone.monsters)?sourceZone.monsters:[];
  if(monsters.length<=1)continue;
  sourceZone.hiddenFromHuntList=true;
  monsters.forEach((monster,index)=>{
    const entryLevel=Math.max(1,Number(monster.requiredLevel||sourceZone.level||1));
    v212SplitHunts.push({
      ...sourceZone,
      id:`${sourceZone.id}--${monster.id || 'monster'}-${index+1}`,
      name:`${sourceZone.name} · ${monster.name}`,
      description:`Hunt dedicada a ${monster.name}. Loot filtrado pela tabela original desta criatura.`,
      level:entryLevel,recommendedLevel:Math.max(entryLevel,Number(sourceZone.recommendedLevel||entryLevel)),
      recommended:`Níveis ${entryLevel}+ · ${monster.name}`,
      sourceZoneId:sourceZone.id,singleMonsterHunt:true,hiddenFromHuntList:false,
      monsters:[structuredClone(monster)]
    });
  });
}
zones.push(...v212SplitHunts);
export const huntSplitReportV212=Object.freeze({sourceZones:new Set(v212SplitHunts.map(z=>z.sourceZoneId)).size,splitHunts:v212SplitHunts.length});

// V21.2.2 — fill the 1250–1500 Free-Hunt gap so the Liquer ticket also has
// a legitimate 0.1% Free source. These are scaled variants of existing
// Cemitério dos Fantasmas creatures, not new arbitrary item tables.
const v2122BridgeSeeds=[
  {targetLevel:1250,sourceName:'Titanius',suffix:'Ascendido'},
  {targetLevel:1350,sourceName:'Hawk',suffix:'Ascendido'},
  {targetLevel:1450,sourceName:'Fire Guardian3',suffix:'Ascendido'}
];
export const v2122BridgeHunts=[];
for(const seed of v2122BridgeSeeds){
  const source=zones.find(z=>!z.vipOnly&&!z.hiddenFromHuntList&&z.singleMonsterHunt&&String(z.monsters?.[0]?.name||'')===seed.sourceName) || zones.find(z=>!z.vipOnly&&!z.hiddenFromHuntList&&z.singleMonsterHunt&&String(z.monsters?.[0]?.name||'').includes(seed.sourceName));
  if(!source)continue;
  const monster=structuredClone(source.monsters[0]);const sourceLevel=Math.max(1,Number(source.level||monster.requiredLevel||1));const ratio=seed.targetLevel/sourceLevel;
  monster.id=`${monster.id}-v2122-${seed.targetLevel}`;monster.name=`${monster.name} ${seed.suffix}`;monster.requiredLevel=seed.targetLevel;
  monster.hp=Math.round(Number(monster.hp||1)*Math.pow(ratio,1.45));monster.sourceHp=monster.hp;
  monster.attackMin=Math.max(1,Math.round(Number(monster.attackMin||1)*Math.pow(ratio,1.15)));monster.attackMax=Math.max(monster.attackMin+1,Math.round(Number(monster.attackMax||2)*Math.pow(ratio,1.15)));
  monster.xp=Math.max(1,Math.round(Number(monster.xp||1)*Math.pow(ratio,1.30)));
  const zone={...structuredClone(source),id:`free-bridge-${seed.targetLevel}-${String(seed.sourceName).toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,name:`Fronteira dos Fantasmas · ${monster.name}`,description:`Hunt Free de transição Lv ${seed.targetLevel}, baseada em criatura original do Cemitério dos Fantasmas.`,level:seed.targetLevel,recommendedLevel:seed.targetLevel,recommended:`Níveis ${seed.targetLevel}+`,hiddenFromHuntList:false,singleMonsterHunt:false,bridgeHunt:true,sourceZoneId:source.id,monsters:[monster]};
  v2122BridgeHunts.push(zone);
}
zones.push(...v2122BridgeHunts);

// V21.6.0 — Shenlong is reserved for special/Dragon Ball content and is no
// longer offered as a normal Hunt. The old imported Lv4733 area is removed
// rather than merely hidden so it cannot reappear through filters/saves.
const v216RemovedShenlongHunts=[];
for(let index=zones.length-1;index>=0;index-=1){
  const zone=zones[index];
  const isOldShenlong=String(zone?.id||'')==='absolute-30' || (
    Number(zone?.level||0)===4733 && (zone?.monsters||[]).some(monster=>/^shenlong$/i.test(String(monster?.name||'')))
  );
  if(isOldShenlong)v216RemovedShenlongHunts.push(...zones.splice(index,1));
}
export const removedShenlongHuntsV216=Object.freeze(v216RemovedShenlongHunts.map(zone=>Object.freeze({id:zone.id,level:zone.level,name:zone.name})));

// Free Hunt progression now continues naturally from the Goku Black region to
// level 5000. These are scaled variants of existing DBO monsters, preserving
// their art while using the same global HP/damage/XP curve as earlier Hunts.
const v216EndgameHuntSeeds=[
  {level:2400,source:'Black',suffix:'Ascendido',area:'Fronteira Sombria'},
  {level:2700,source:'Diundrah',suffix:'Ascendida',area:'Fenda Diundrah'},
  {level:3000,source:'Demonius',suffix:'Ascendido',area:'Abismo Demonius'},
  {level:3300,source:'Black Fusion',suffix:'Ascendido',area:'Nexus da Fusão'},
  {level:3600,source:'Goku Black',suffix:'Ascendido',area:'Templo Black'},
  {level:3900,source:'Black',suffix:'Transcendente',area:'Fronteira Transcendente'},
  {level:4200,source:'Diundrah',suffix:'Transcendente',area:'Fenda Transcendente'},
  {level:4500,source:'Demonius',suffix:'Transcendente',area:'Abismo Transcendente'},
  {level:4750,source:'Black Fusion',suffix:'Transcendente',area:'Nexus Transcendente'},
  {level:5000,source:'Goku Black',suffix:'Transcendente',area:'Domínio Final Black'}
];
export const endgameHuntsV216=[];
function v216EndgameSource(name){
  return zones.find(zone=>!zone.vipOnly&&!zone.hiddenFromHuntList&&!zone.disabledForHunt&&zone.singleMonsterHunt&&String(zone.monsters?.[0]?.name||'')===name)
    || zones.find(zone=>!zone.vipOnly&&!zone.hiddenFromHuntList&&!zone.disabledForHunt&&String(zone.monsters?.[0]?.name||'').includes(name));
}
for(const seed of v216EndgameHuntSeeds){
  const source=v216EndgameSource(seed.source);
  if(!source?.monsters?.[0])continue;
  const monster=structuredClone(source.monsters[0]);
  const level=seed.level;
  const hp=v211Round(120*Math.pow(level,1.45),10);
  const maxDamage=v211Round(6*Math.pow(level,1.15),1);
  const minDamage=v211Round(maxDamage*.58,1);
  const xp=v211Round(hp*(.50+Math.min(.18,level/10000)),10);
  const targetZeni=Math.max(8,Math.round(18*Math.pow(level,1.13)+hp*.018));
  const dollarCount=Math.max(1,Math.ceil((targetZeni/100)*2));
  const senzuCount=Math.max(10,Math.min(24,10+Math.floor((level-2400)/250)));
  monster.id=`${String(monster.id||seed.source).replace(/[^a-z0-9_-]+/gi,'-')}-v216-${level}`;
  monster.name=`${seed.source} ${seed.suffix}`;
  monster.requiredLevel=level;
  monster.hp=hp;monster.sourceHp=hp;
  monster.attackMin=minDamage;monster.attackMax=Math.max(minDamage+1,maxDamage);
  monster.xp=xp;
  monster.speed=Math.max(340,Math.min(430,Number(monster.speed||340)+Math.floor((level-2400)/300)*4));
  monster.loot=[
    {serverId:2152,chance:100000,countMax:dollarCount,balanceSource:'v21.6-endgame-zeni'},
    {serverId:12779,chance:12000,countMax:senzuCount,balanceSource:'v21.6-endgame-senzu'}
  ];
  monster.idleBalance={...(monster.idleBalance||{}),policy:'v21.6-endgame-curve',level,hpExponent:1.45,damageExponent:1.15,xpPolicy:'ttk-proportional'};
  const zone={
    ...structuredClone(source),
    id:`free-endgame-${level}`,
    name:`${seed.area} · ${monster.name}`,
    description:`Hunt Free de progressão Lv ${level}. Força, XP e Zeni seguem a curva endgame até o level 5000.`,
    level,recommendedLevel:level,recommended:`Níveis ${level}+`,
    vipOnly:false,hiddenFromHuntList:false,disabledForHunt:false,
    singleMonsterHunt:true,endgameHunt:true,sourceZoneId:source.id,
    monsters:[monster]
  };
  zones.push(zone);
  endgameHuntsV216.push(zone);
}
Object.freeze(endgameHuntsV216);

// V21.9.0 — cada Hunt pertence a exatamente um bracket de Ticket.
// O limite superior e exclusivo: Lv1500, por exemplo, pertence somente ao
// Vermouth e nunca recebe ao mesmo tempo o Ticket do Liquer.
export const bossTicketDropRangesV2122 = Object.freeze([
  {bossZoneId:'vip-boss-500',itemId:'boss_ticket_champa',minLevel:500,maxLevel:750},
  {bossZoneId:'vip-boss-750',itemId:'boss_ticket_golden_freeza',minLevel:750,maxLevel:1000},
  {bossZoneId:'vip-boss-1000',itemId:'boss_ticket_zamasu',minLevel:1000,maxLevel:1250},
  {bossZoneId:'vip-boss-1250',itemId:'boss_ticket_liquer',minLevel:1250,maxLevel:1500},
  {bossZoneId:'vip-boss-1500',itemId:'boss_ticket_vermouth',minLevel:1500,maxLevel:Infinity}
]);
for(const zone of zones){
  if(!zone||zone.hiddenFromHuntList||zone.disabledForHunt||zone.contentType==='boss'||zone.questType==='reborn'||zone.questType==='progression')continue;
  const level=Math.max(1,Number(zone.level||zone.recommendedLevel||1));
  const chance=zone.vipOnly?1000:100; // 1% VIP / 0.1% Free (100000 = 100%)
  const range=bossTicketDropRangesV2122.find(entry=>
    level>=entry.minLevel && (entry.maxLevel===Infinity || level<entry.maxLevel)
  );
  for(const monster of (zone.monsters||[])){
    monster.loot ||= [];
    // Remove qualquer ticket legado/injetado anteriormente para impedir duas
    // tabelas de ticket na mesma Hunt.
    monster.loot=monster.loot.filter(drop=>!String(drop.itemId||'').startsWith('boss_ticket_'));
    if(range)monster.loot.push({itemId:range.itemId,chance,countMax:1,balanceSource:'v21.9-single-boss-ticket-bracket'});
  }
}

// Boss techniques deliberately use Ki damage so Barrier becomes a meaningful
// defensive skill in endgame encounters. The Hunt engine renders these with
// the same effect/missile registry used by player spells.
const v212BossSpellProfiles={
  'vip-boss-500':[
    {name:'Hakai Burst',chance:35,intervalMs:2200,range:7,type:'ki',damage:1.15,effectId:80,missileId:36},
    {name:'God Ki Wave',chance:28,intervalMs:3200,range:8,type:'ki',damage:1.35,effectId:222,missileId:31}
  ],
  'vip-boss-750':[
    {name:'Death Beam',chance:38,intervalMs:1900,range:8,type:'ki',damage:1.10,effectId:140,missileId:19},
    {name:'Golden Supernova',chance:22,intervalMs:4200,range:7,type:'ki',damage:1.55,effectId:80,missileId:36}
  ],
  'vip-boss-1000':[
    {name:'Negative Karma Ball',chance:34,intervalMs:2300,range:8,type:'ki',damage:1.20,effectId:236,missileId:31},
    {name:'Divine Wrath',chance:24,intervalMs:3900,range:7,type:'ki',damage:1.50,effectId:222,missileId:36}
  ],
  'vip-boss-1250':[
    {name:'Time Skip Attack',chance:40,intervalMs:1800,range:6,type:'ki',damage:1.15,effectId:53,missileId:31},
    {name:'Rage Explosion',chance:22,intervalMs:3600,range:7,type:'ki',damage:1.60,effectId:80,missileId:36}
  ],
  'vip-boss-1500':[
    {name:'Destroyer Sphere',chance:35,intervalMs:2100,range:8,type:'ki',damage:1.25,effectId:236,missileId:36},
    {name:'God of Destruction',chance:20,intervalMs:4300,range:7,type:'ki',damage:1.70,effectId:80,missileId:31}
  ]
};
for(const [zoneId,profiles] of Object.entries(v212BossSpellProfiles)){
  const boss=zones.find(z=>z.id===zoneId)?.monsters?.[0];
  if(!boss)continue;
  const low=Math.max(1,Number(boss.attackMin||1));
  const high=Math.max(low+1,Number(boss.attackMax||low+1));
  boss.attacks=[
    {name:'melee',chance:100,intervalMs:1000,range:1,type:'physical',min:-low,max:-high},
    ...profiles.map(profile=>({
      ...profile,
      min:-Math.round(low*profile.damage),
      max:-Math.round(high*profile.damage),
      damage:undefined
    }))
  ];
  boss.damageType='ki';
  boss.bossUsesKiSpells=true;
  boss.bossSpellPriority=true;
}

// V21.2 — walkable progression quests. Unlike Reborn (sequential boss rooms),
// these expeditions require the Party to traverse a small dungeon route with
// WASD/arrow movement. Guard tiles launch shared encounters; only after every
// guardian is defeated can the final reward chest be reached.
const V212_QUEST_MAPS = [
  [
    '#####################',
    '#S....G.............#',
    '###################.#',
    '#........G..........#',
    '#.###################',
    '#.............G.....#',
    '###################.#',
    '#..................E#',
    '#####################'
  ],
  [
    '#####################',
    '#S...........G......#',
    '#.###################',
    '#.........G.........#',
    '###################.#',
    '#.....G.............#',
    '#.###################',
    '#E..................#',
    '#####################'
  ],
  [
    '#####################',
    '#S....G.............#',
    '###################.#',
    '#..............G....#',
    '#.###################',
    '#...G...............#',
    '###################.#',
    '#..................E#',
    '#####################'
  ]
];

function v212ServerItemId(serverId){
  return itemCatalog[`server_${serverId}`]?.id || Object.values(itemCatalog).find(item=>Number(item?.serverId)===Number(serverId))?.id || `server_${serverId}`;
}
function v212QuestGuardPositions(map){
  const out=[];
  map.forEach((row,y)=>{for(let x=0;x<row.length;x+=1)if(row[x]==='G')out.push({x,y});});
  return out;
}
function v212GuardianSource(level,index){
  const sorted=[...v212SplitHunts].sort((a,b)=>Math.abs(Number(a.level||1)-level)-Math.abs(Number(b.level||1)-level)||String(a.id).localeCompare(String(b.id)));
  return sorted[index%Math.max(1,sorted.length)] || zones.find(z=>z.monsters?.length);
}
const v212ItemQuestSeeds=[
  {id:'freeza-scout',name:'Posto Avançado de Freeza',level:700,rewardServerId:2376,theme:'freeza'},
  {id:'freeza-fortress',name:'Fortaleza de Freeza',level:750,rewardServerId:2378,theme:'freeza'},
  {id:'freeza-armory',name:'Arsenal Imperial de Freeza',level:800,rewardServerId:2379,theme:'freeza'},
  {id:'freeza-throne',name:'Trono de Freeza',level:850,rewardServerId:2382,theme:'freeza'},
  {id:'janemba-rift',name:'Fenda de Janemba',level:200,rewardServerId:12728,theme:'janemba'},
  {id:'goku-black-temple',name:'Templo de Goku Black',level:500,rewardServerId:2464,theme:'black'},
  {id:'jiren-trial',name:'Provação de Jiren',level:700,rewardServerId:2539,theme:'jiren'},
  {id:'kaioshin-sanctuary',name:'Santuário Kaioshin',level:900,rewardServerId:13444,theme:'kaioshin'},
  {id:'whis-temple',name:'Templo de Whis VIP',level:1100,rewardServerId:2437,theme:'whis',vipOnly:true},
  {id:'bills-trial',name:'Provação de Bills VIP',level:1300,rewardServerId:13499,theme:'bills',vipOnly:true}
];

// V21.5.0 - Quest vocations are no longer piggy-backed on item quests. Each
// vocation receives its own Lv 1500+ expedition and its own vocation sprite
// as the quest emblem. Completion unlocks only the vocation on the account.
const v215VocationQuestSeeds=Object.entries(questVocationsV2122)
  .map(([vocationId,def],index)=>({
    id:`vocation-${vocationId.replace(/^quest-/, '')}`,
    name:`Provação da Vocação · ${def.name}`,
    level:1500,
    theme:`vocation-${index+1}`,
    vocationQuest:true,
    unlockVocationId:vocationId,
    rewardName:`Vocação ${def.name}`,
    // V21.26.4: use the current vocation portrait. WoDBO vocations no longer
    // point at the obsolete exact-transformations image set.
    questLogo:characters[vocationId]?.sprite ||
      `./assets/generated/looktype-transformations/portraits/${def.forms?.[0]?.lookType || 390}.png`
  }));
const v212ProgressionQuestSeeds=[...v212ItemQuestSeeds,...v215VocationQuestSeeds];
export const progressionQuestsV212=[];
for(const [questIndex,seed] of v212ProgressionQuestSeeds.entries()){
  const map=V212_QUEST_MAPS[questIndex%V212_QUEST_MAPS.length];
  const guardPositions=v212QuestGuardPositions(map);
  const guards=[];
  for(const [guardIndex,pos] of guardPositions.entries()){
    const sourceZone=v212GuardianSource(seed.level,questIndex*3+guardIndex);
    const sourceMonster=structuredClone(sourceZone?.monsters?.[0] || {id:'guardian',name:'Guardian',hp:1000,attackMin:10,attackMax:20,xp:100,lookType:119,speed:320});
    const zoneId=`quest-${seed.id}-guard-${guardIndex+1}`;
    // V21.6 — expedition guardians are deliberately above same-level Hunt mobs.
    // Item quests are solo-endgame challenges; vocation quests are tougher still.
    const questHpFactor=(seed.vocationQuest?4.2:3.2)+guardIndex*.35;
    const questDamageFactor=(seed.vocationQuest?2.05:1.70)+guardIndex*.10;
    const curveHp=120*Math.pow(Math.max(1,Number(seed.level||1)),1.45);
    const curveMaxDamage=6*Math.pow(Math.max(1,Number(seed.level||1)),1.15);
    const hp=Math.round(Math.max(Math.max(1000,Number(sourceMonster.hp||1000))*2.25,curveHp*questHpFactor));
    const high=Math.round(Math.max(Math.max(20,Number(sourceMonster.attackMax||20))*1.65,curveMaxDamage*questDamageFactor));
    const low=Math.max(1,Math.round(Math.max(Number(sourceMonster.attackMin||10)*1.55,high*.58)));
    const monster={
      ...sourceMonster,
      id:`${zoneId}-enemy`,
      name:`${sourceMonster.name} · Guardião ${guardIndex+1}`,
      hp,sourceHp:hp,attackMin:low,attackMax:high,
      xp:Math.round(Math.max(Number(sourceMonster.xp||100),hp*.62)),
      isBoss:true,questOnly:true,bossUsesKiSpells:true,
      attacks:[
        {name:'melee',chance:100,intervalMs:1000,range:1,type:'physical',min:-low,max:-high},
        {name:'Quest Ki Blast',chance:24+guardIndex*3,intervalMs:2600,range:7,type:'ki',min:-Math.round(low*1.05),max:-Math.round(high*1.22),effectId:222,missileId:31}
      ],
      loot:[
        {serverId:2152,chance:100000,countMax:Math.max(2,Math.round(seed.level/20))},
        {serverId:12779,chance:Math.max(1200,6000-questIndex*350),countMax:2}
      ]
    };
    zones.push({
      id:zoneId,name:`${seed.name} · Guardião ${guardIndex+1}`,
      description:'Encontro de uma Quest de expedição. Derrote o guardião para continuar caminhando.',
      level:seed.level,recommendedLevel:seed.level,lureOptions:[1],defaultLure:1,
      arenaTheme:'quest',background:'linear-gradient(180deg,#352615,#0c1117)',
      vipOnly:Boolean(seed.vipOnly),contentType:'boss',questType:'progression',
      progressionQuestId:seed.id,progressionGuardIndex:guardIndex,sourceZoneId:sourceZone?.id||null,
      hiddenFromHuntList:true,monsters:[monster]
    });
    guards.push({index:guardIndex,x:pos.x,y:pos.y,zoneId,name:monster.name});
  }
  const rewardItemId=seed.rewardServerId ? v212ServerItemId(seed.rewardServerId) : null;
  const reward=rewardItemId ? (itemCatalog[rewardItemId] || Object.values(itemCatalog).find(item=>Number(item?.serverId)===Number(seed.rewardServerId))) : null;
  if(reward){
    reward.questOnly=true;
    reward.idleBalance={...(reward.idleBalance||{}),progressionQuestId:seed.id,dropPolicy:'quest-only'};
    // Janemba Sword is intentionally an early quest weapon; unlike the other
    // rewards, its requirement is lowered from the old Lv350 gate to Lv200.
    reward.requiredLevel=seed.id==='janemba-rift'
      ? 200
      : Math.max(Number(reward.requiredLevel||1),seed.level);
    reward.requirements={...(reward.requirements||{}),level:reward.requiredLevel};
  }
  const rewardName=seed.rewardName || reward?.name || (seed.unlockVocationId ? `Vocação ${characters[seed.unlockVocationId]?.name||seed.unlockVocationId}` : 'Recompensa da Quest');
  progressionQuestsV212.push(Object.freeze({
    ...seed,map:[...map],guards:Object.freeze(guards.map(g=>Object.freeze(g))),
    rewardItemId,rewardName,
    description:seed.vocationQuest
      ? `Quest individual de vocação para level 1500+. Atravesse a expedição, derrote ${guards.length} guardiões e conclua a prova para desbloquear ${characters[seed.unlockVocationId]?.name||seed.unlockVocationId}.`
      : `Atravesse a expedição, derrote ${guards.length} guardiões e alcance o baú final. Recompensa: ${rewardName}.`,
    partyRequired:false,partyOptional:true,oneTime:true
  }));
}
export const progressionQuestReportV212=Object.freeze({quests:progressionQuestsV212.length,guardianEncounters:progressionQuestsV212.reduce((sum,q)=>sum+q.guards.length,0)});


// V21.16.0 — Whiss Staff and Whiss distance identity.
// The staff is a level-1100 quest distance weapon, so it must contribute real
// attack instead of being only a range carrier. Its attack remains close to
// the boss ladder rather than eclipsing the next boss tier.
if (itemCatalog.server_2437) {
  itemCatalog.server_2437 = {
    ...itemCatalog.server_2437,
    type:'weapon',combatStyle:'ki',requiredLevel:1100,
    stats:{...(itemCatalog.server_2437.stats||{}),attack:50,range:10,skillBonuses:{...(itemCatalog.server_2437.stats?.skillBonuses||{}),kiBlasting:6}},
    range:10,
    description:'Whiss Staff · Distance · Attack 50 · Range 10 · Ki Blasting +6.'
  };
}
if (characters['quest-whiss']) {
  const whiss=characters['quest-whiss'];
  whiss.aptitudes={...(whiss.aptitudes||{}),strength:0.90,kiBlasting:1.35,kiLevel:1.10};
  whiss.serverFormula={...(whiss.serverFormula||{}),distDamage:45,distanceDamage:45};
  for(const [index,form] of (whiss.forms||[]).entries()) if(form.formula){const dist=[35,40,45,50,55,60,70,80,90,100][index]||45;form.formula={...form.formula,distDamage:dist,distanceDamage:dist};}
}


// V21.21.0 — expanded VIP Hunt ladder. Every generated VIP Hunt uses the
// closest real Free Hunt as its baseline. Its projected Free XP is increased
// by exactly 20%, while loot chance/quantity and the VIP roll are stronger.
const v2121VipTargets=[1,25,50,75,100,125,150,175,200,1600,1750,2000,2250,2500,2750,3000,3250,3500,3750,4000,4250,4500,4750,5000];
function v2121FreeBaseline(level){
  const candidates=zones.filter(zone=>!zone.vipOnly&&!zone.guildBoss&&zone.contentType!=='boss'&&!zone.questType&&!zone.hiddenFromHuntList&&!zone.disabledForHunt&&Array.isArray(zone.monsters)&&zone.monsters.length);
  return candidates.sort((a,b)=>Math.abs(Number(a.level||1)-level)-Math.abs(Number(b.level||1)-level)||Number(b.level||1)-Number(a.level||1))[0]||null;
}
function v2121TicketFor(level){const row=bossTicketDropRangesV2122.find(entry=>level>=entry.minLevel&&(entry.maxLevel===Infinity||level<entry.maxLevel));return row?.itemId||null;}
export const vipHuntsV2121=[];
for(const level of v2121VipTargets){
  if(zones.some(z=>z.vipOnly&&z.contentType==='hunt'&&Number(z.level)===level))continue;
  const base=v2121FreeBaseline(level);if(!base?.monsters?.[0])continue;
  const source=base.monsters[0],monster=structuredClone(source),baseLevel=Math.max(1,Number(base.level||source.requiredLevel||level)),ratio=Math.max(.5,level/baseLevel);
  monster.id=`vip-v2121-${level}-${String(source.id||source.name||'monster').replace(/[^a-z0-9_-]+/gi,'-')}`;monster.name=`${source.name} VIP`;monster.requiredLevel=level;
  monster.hp=Math.max(1,Math.round(Number(source.hp||1)*Math.pow(ratio,1.30)*1.05));monster.sourceHp=monster.hp;
  monster.attackMin=Math.max(1,Math.round(Number(source.attackMin||1)*Math.pow(ratio,1.08)*1.05));monster.attackMax=Math.max(monster.attackMin+1,Math.round(Number(source.attackMax||2)*Math.pow(ratio,1.08)*1.05));
  const projectedFreeXp=Math.max(1,Math.round(Number(source.xp||1)*Math.pow(ratio,1.15)));monster.xp=Math.round(projectedFreeXp*1.20);monster.vipComparableFreeXp=projectedFreeXp;
  monster.loot=(source.loot||[]).map(drop=>({...structuredClone(drop),chance:Math.min(100000,Math.round(Number(drop.chance||0)*1.35)),countMin:Math.max(1,Number(drop.countMin||1)),countMax:Math.max(1,Math.ceil(Number(drop.countMax||1)*1.25)),balanceSource:'v21.21-vip-enhanced-loot'}));
  const ticket=v2121TicketFor(level);if(ticket){monster.loot=monster.loot.filter(d=>!String(d.itemId||'').startsWith('boss_ticket_'));monster.loot.push({itemId:ticket,chance:1000,countMax:1,balanceSource:'v21.21-vip-ticket'});}
  const zone={...structuredClone(base),id:`vip-progression-${level}`,name:`${base.name.replace(/ · .*/, '')} VIP · Lv ${level}`,description:`Hunt VIP Lv ${level}: +20% XP sobre a Hunt Free comparável e loot melhorado.`,level,recommendedLevel:level,recommended:`VIP · Nível ${level}+`,vipOnly:true,contentType:'hunt',hiddenFromHuntList:false,disabledForHunt:false,singleMonsterHunt:true,vipLootMultiplier:1.35,vipRarityBonus:1.50,sourceZoneId:base.id,monsters:[monster]};
  zones.push(zone);vipHuntsV2121.push(zone);
}
// Enforce the same +20% XP promise on the older curated VIP Hunts too.
// We compare each VIP Hunt against the nearest real Free Hunt and project the
// Free value to the VIP level before applying the 1.20 multiplier. This keeps
// legacy VIP zones from lagging behind the new ladder after global rebalance.
for(const zone of zones){
  if(!zone.vipOnly||zone.contentType!=='hunt'||!Array.isArray(zone.monsters)||!zone.monsters.length)continue;
  zone.vipLootMultiplier=Math.max(1.35,Number(zone.vipLootMultiplier||1));
  zone.vipRarityBonus=Math.max(1.50,Number(zone.vipRarityBonus||1));
  const base=v2121FreeBaseline(Number(zone.level||1));
  const source=base?.monsters?.[0];
  if(!source)continue;
  const baseLevel=Math.max(1,Number(base.level||source.requiredLevel||zone.level||1));
  const ratio=Math.max(.5,Number(zone.level||1)/baseLevel);
  const projectedFreeXp=Math.max(1,Math.round(Number(source.xp||1)*Math.pow(ratio,1.15)));
  for(const monster of zone.monsters){
    monster.vipComparableFreeXp=projectedFreeXp;
    monster.xp=Math.round(projectedFreeXp*1.20);
  }
}
Object.freeze(vipHuntsV2121);

// V21.16.0 — Senzu progression ladder for Hunts and Bosses.
// Boundaries use the next bracket at the shared edge: Lv3000 = Oblivion,
// while Lv4000 still = Mystic and only levels above 4000 use Coca-Cola Bean.
export const senzuDropBracketsV2116=Object.freeze([
  {min:500,max:750,itemId:'server_7636',name:'Rola Bean'},
  {min:750,max:1000,itemId:'server_12780',name:'Magic Senzu Bean'},
  {min:1000,max:1500,itemId:'server_7634',name:'Super Senzu Red'},
  {min:1500,max:2000,itemId:'server_2151',name:'Rose Senzu'},
  {min:2000,max:2500,itemId:'server_7635',name:'Black Senzu'},
  {min:2500,max:3000,itemId:'server_2537',name:'Majora Senzu'},
  {min:3000,max:3500,itemId:'server_2156',name:'Oblivion Senzu'},
  {min:3500,max:4001,itemId:'server_2157',name:'Mystic Senzu'},
  {min:4001,max:Infinity,itemId:'server_2536',name:'Coca-Cola Bean'}
]);
const V2116_SENZU_SERVER_IDS=new Set(senzuItems.map(row=>Number(row.serverId)));
function v2116SenzuBracket(level){
  const lv=Math.max(1,Number(level||1));
  return senzuDropBracketsV2116.find(row=>lv>=row.min&&(row.max===Infinity||lv<row.max))||null;
}
for(const zone of zones){
  const level=Math.max(1,Number(zone.level||zone.recommendedLevel||1));
  const isGuildBoss=zone.guildBoss===true;
  const isBoss=zone.contentType==='boss'||isGuildBoss;
  const isQuest=Boolean(zone.questType);
  const isHunt=!isQuest&&!isBoss&&!zone.hiddenFromHuntList&&!zone.disabledForHunt;
  if((isHunt&&level<750)||(!isHunt&&!isBoss))continue;
  const bracket=v2116SenzuBracket(level);if(!bracket)continue;
  const serverId=Number(itemCatalog[bracket.itemId]?.serverId||0);if(!serverId)continue;
  for(const monster of (zone.monsters||[])){
    monster.loot ||= [];
    monster.loot=monster.loot.filter(drop=>!V2116_SENZU_SERVER_IDS.has(Number(drop.serverId)));
    if(isGuildBoss&&zone.guildBossType==='champa'){
      monster.loot.push({serverId,chance:100000,countMin:5,countMax:50,balanceSource:'v21.16-guild-champa-senzu'});
    }else if(isGuildBoss&&zone.guildBossType==='daishinkan'){
      monster.loot.push({serverId,chance:100000,countMin:10,countMax:100,balanceSource:'v21.16-guild-daishinkan-senzu'});
    }else if(isBoss){
      monster.loot.push({serverId,chance:25000,countMin:1,countMax:3,balanceSource:'v21.16-boss-senzu-bracket'});
    }else{
      monster.loot.push({serverId,chance:12000,countMin:1,countMax:1,balanceSource:'v21.16-hunt-senzu-bracket'});
    }
  }
}
