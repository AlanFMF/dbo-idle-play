export const characters = [
  { id:'goku', name:'Goku', role:'Lutador equilibrado', sprite:'./assets/sprites/characters/goku.gif', base:{hp:120,attack:16,defense:7,speed:1.0}, transformations:[
    {id:'goku-base',name:'Base',level:1,multiplier:1}, {id:'goku-ssj',name:'Super Saiyajin',level:10,multiplier:1.8}, {id:'goku-ssj2',name:'Super Saiyajin 2',level:25,multiplier:3.0}, {id:'goku-ssj3',name:'Super Saiyajin 3',level:50,multiplier:5.0}
  ]},
  { id:'vegeta', name:'Vegeta', role:'Alto dano', sprite:'./assets/sprites/characters/vegeta.gif', base:{hp:105,attack:19,defense:6,speed:1.05}, transformations:[
    {id:'vegeta-base',name:'Base',level:1,multiplier:1}, {id:'vegeta-ssj',name:'Super Saiyajin',level:10,multiplier:1.9}, {id:'vegeta-ssj2',name:'Super Saiyajin 2',level:25,multiplier:3.2}, {id:'vegeta-blue',name:'Super Saiyajin Blue',level:55,multiplier:5.4}
  ]},
  { id:'gohan', name:'Gohan', role:'Crítico e evolução', sprite:'./assets/sprites/characters/gohan.gif', base:{hp:112,attack:17,defense:8,speed:.95}, transformations:[
    {id:'gohan-base',name:'Base',level:1,multiplier:1}, {id:'gohan-ssj',name:'Super Saiyajin',level:10,multiplier:1.75}, {id:'gohan-ssj2',name:'Super Saiyajin 2',level:22,multiplier:3.1}, {id:'gohan-mystic',name:'Místico',level:48,multiplier:5.2}
  ]}
];
