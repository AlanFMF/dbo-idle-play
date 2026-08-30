export const zones = [
 {id:'earth-plains',name:'Planícies da Terra',level:1,description:'Área inicial para treinar.',monsters:[
  {id:'bardock-training',name:'Guerreiro Saiyajin',sprite:'./assets/sprites/monsters/bardock.gif',hp:34,attack:5,defense:1,xp:18,zeni:7,drops:[{itemId:'training-gloves',chance:.07}]},
  {id:'android17',name:'Androide 17',sprite:'./assets/sprites/monsters/android17.gif',hp:46,attack:7,defense:2,xp:25,zeni:11,drops:[{itemId:'senzu',chance:.04}]}
 ]},
 {id:'red-ribbon',name:'Base Red Ribbon',level:8,description:'Androides e bio-guerreiros mais resistentes.',monsters:[
  {id:'cell-jr',name:'Cell Jr.',sprite:'./assets/sprites/monsters/cell.gif',hp:110,attack:14,defense:5,xp:72,zeni:28,drops:[{itemId:'saiyan-armor',chance:.025}]},
  {id:'cell',name:'Cell',sprite:'./assets/sprites/monsters/cell.gif',hp:170,attack:20,defense:8,xp:120,zeni:45,drops:[{itemId:'power-ring',chance:.006}]}
 ]},
 {id:'namek',name:'Namekusei',level:20,description:'Inimigos de elite e recompensas maiores.',monsters:[
  {id:'freeza',name:'Freeza',sprite:'./assets/sprites/monsters/freeza.gif',hp:390,attack:36,defense:14,xp:290,zeni:95,drops:[{itemId:'senzu',chance:.09},{itemId:'power-ring',chance:.012}]},
  {id:'buu',name:'Majin Buu',sprite:'./assets/sprites/monsters/buu.gif',hp:520,attack:42,defense:18,xp:380,zeni:130,drops:[{itemId:'power-ring',chance:.018}]}
 ]}
];
