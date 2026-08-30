export const GAME_PASS_XP_PER_LEVEL=250;
export const GAME_PASS_BASE_LEVELS=45;

export const GAME_PASS_MISSIONS = Object.freeze([
  // Temporada: XP suficiente para fechar o nível 45 com folga pequena.
  Object.freeze({id:'kills100',scope:'season',label:'Derrote 100 inimigos',key:'kills',target:100,xp:150}),
  Object.freeze({id:'kills500',scope:'season',label:'Derrote 500 inimigos',key:'kills',target:500,xp:300}),
  Object.freeze({id:'kills2000',scope:'season',label:'Derrote 2.000 inimigos',key:'kills',target:2_000,xp:700}),
  Object.freeze({id:'kills5000',scope:'season',label:'Derrote 5.000 inimigos',key:'kills',target:5_000,xp:1_700}),
  Object.freeze({id:'xp1m',scope:'season',label:'Ganhe 1.000.000 XP',key:'xp',target:1_000_000,xp:300}),
  Object.freeze({id:'xp10m',scope:'season',label:'Ganhe 10.000.000 XP',key:'xp',target:10_000_000,xp:750}),
  Object.freeze({id:'xp50m',scope:'season',label:'Ganhe 50.000.000 XP',key:'xp',target:50_000_000,xp:1_800}),
  Object.freeze({id:'drops250',scope:'season',label:'Obtenha 250 drops',key:'drops',target:250,xp:250}),
  Object.freeze({id:'drops1000',scope:'season',label:'Obtenha 1.000 drops',key:'drops',target:1_000,xp:650}),
  Object.freeze({id:'drops5000',scope:'season',label:'Obtenha 5.000 drops',key:'drops',target:5_000,xp:1_650}),
  Object.freeze({id:'boss10',scope:'season',label:'Derrote 10 Bosses',key:'bosses',target:10,xp:450}),
  Object.freeze({id:'boss50',scope:'season',label:'Derrote 50 Bosses',key:'bosses',target:50,xp:1_250}),
  Object.freeze({id:'supplies100',scope:'season',label:'Use 100 supplies',key:'supplies',target:100,xp:250}),
  Object.freeze({id:'supplies500',scope:'season',label:'Use 500 supplies',key:'supplies',target:500,xp:800}),

  // Diárias: reiniciam à meia-noite de Brasília.
  Object.freeze({id:'daily-kills',scope:'daily',label:'Derrote 150 inimigos hoje',key:'kills',target:150,xp:50}),
  Object.freeze({id:'daily-xp',scope:'daily',label:'Ganhe 750.000 XP hoje',key:'xp',target:750_000,xp:50}),
  Object.freeze({id:'daily-drops',scope:'daily',label:'Obtenha 60 drops hoje',key:'drops',target:60,xp:50}),
  Object.freeze({id:'daily-supplies',scope:'daily',label:'Use 10 supplies hoje',key:'supplies',target:10,xp:50}),

  // Semanais: ciclo começa domingo 00:00 de Brasília.
  Object.freeze({id:'weekly-kills',scope:'weekly',label:'Derrote 1.500 inimigos na semana',key:'kills',target:1_500,xp:300}),
  Object.freeze({id:'weekly-xp',scope:'weekly',label:'Ganhe 7.500.000 XP na semana',key:'xp',target:7_500_000,xp:250}),
  Object.freeze({id:'weekly-drops',scope:'weekly',label:'Obtenha 500 drops na semana',key:'drops',target:500,xp:200}),
  Object.freeze({id:'weekly-bosses',scope:'weekly',label:'Derrote 7 Bosses na semana',key:'bosses',target:7,xp:200}),
  Object.freeze({id:'weekly-supplies',scope:'weekly',label:'Use 75 supplies na semana',key:'supplies',target:75,xp:150})
]);

const item=(id,qty)=>Object.freeze({item:id,qty});
const zeni=value=>Object.freeze({zeni:value});
const boost=(kind,durationMs=3_600_000)=>Object.freeze({boost:true,kind,durationMs});
const bundle=(...rewards)=>Object.freeze({bundle:Object.freeze(rewards)});
const iconReward=Object.freeze({cosmeticIcon:'beta'});
const borderReward=Object.freeze({cosmeticBorder:'beta'});
const betaBackpack=Object.freeze({item:'pass_beta_backpack',qty:1});

function buildTrack(premium=false){
  const out={};
  for(let tier=1;tier<=GAME_PASS_BASE_LEVELS;tier+=1){
    // Recompensa base em todos os níveis, sem itens de Tibia.
    if(premium){
      out[tier]=tier%3===0?item('server_2157',Math.max(2,Math.floor(tier/3))):item('server_2151',10+tier*2);
    }else{
      out[tier]=tier%4===0?zeni(25_000+tier*5_000):item(tier%3===0?'server_12779':'server_2151',Math.max(5,Math.floor(tier*1.5)));
    }
  }

  // Níveis especiais substituem a recompensa base. Assim um marco de Boost
  // não entrega Senzu/Zeni junto sem intenção explícita.
  if(!premium){
    out[10]=boost('xp');
    out[20]=boost('loot');
    out[30]=boost('xp');
    out[40]=boost('loot');
  }

  if(premium){
    // Passe comprado: bônus alternados a cada 5 níveis até 35.
    // V21.24: os bônus que antes coincidiam com os exclusivos 40/45 foram
    // antecipados para 39/44 para que 40 entregue SOMENTE a borda e 45 SOMENTE a BP.
    for(let tier=5,index=0;tier<=35;tier+=5,index+=1){
      out[tier]=boost(index%2===0?'xp':'loot');
    }
    out[39]=boost('loot');
    out[44]=boost('xp');
    out[26]=iconReward;
    out[40]=borderReward;
    out[45]=betaBackpack;
  }
  return Object.freeze(out);
}

export const GAME_PASS_REWARDS = Object.freeze({
  free:buildTrack(false),
  premium:buildTrack(true)
});

export function gamePassLevelFromXp(xp=0){
  return 1+Math.floor(Math.max(0,Number(xp)||0)/GAME_PASS_XP_PER_LEVEL);
}

export function gamePassRewardFor(track='free',tier=1){
  tier=Math.max(1,Math.trunc(Number(tier)||1));
  if(tier>GAME_PASS_BASE_LEVELS){
    // Progressão infinita: apenas uma trilha pós-45 para não duplicar prêmio.
    // V21.16: cada nível extra entrega 10 Shenlong Senzu.
    return track==='free'?Object.freeze({item:'server_2158',qty:10,endless:true}):null;
  }
  return GAME_PASS_REWARDS[track]?.[tier]||null;
}

export function gamePassRewardLabel(reward,itemCatalog={}){
  if(!reward)return 'Sem recompensa';
  if(Array.isArray(reward.bundle))return reward.bundle.map(r=>gamePassRewardLabel(r,itemCatalog)).join(' + ');
  if(reward.zeni)return `${Number(reward.zeni).toLocaleString('pt-BR')} Zeni`;
  if(reward.boost)return `Bônus de ${reward.kind==='loot'?'Loot':'XP'} · ${Math.round(Number(reward.durationMs||3_600_000)/3_600_000)}h`;
  if(reward.cosmeticIcon)return 'Ícone Beta exclusivo';
  if(reward.cosmeticBorder)return 'Borda Beta exclusiva';
  const found=itemCatalog[reward.item];
  return `${Number(reward.qty||1).toLocaleString('pt-BR')}x ${found?.name||reward.item}`;
}

// V21.17.0 — calendário mensal. Reinicia no dia 1 de cada mês.
// A trilha normal usa somente Senzus; jogadores VIP recebem SOMENTE o Boost
// nos dias especiais (sem o Senzu-base daquele dia), evitando prêmio duplo.
export const DAILY_LOGIN_REWARDS=Object.freeze([
  item('server_7636',12), item('server_7636',18), item('server_12780',10), item('server_12780',16), item('server_12780',20),
  item('server_7634',10), item('server_7634',14), item('server_7634',18), item('server_2151',12), item('server_2151',16),
  item('server_2151',22), item('server_7635',12), item('server_7635',16), item('server_7635',20), item('server_2537',12),
  item('server_2537',16), item('server_2537',22), item('server_2156',14), item('server_2156',18), item('server_2156',24),
  item('server_2157',12), item('server_2157',16), item('server_2157',22), item('server_2536',12), item('server_2536',18),
  item('server_2536',24), item('server_2158',3), item('server_2158',5), item('server_2158',7), item('server_2158',9),
  item('server_2158',12)
]);
export const DAILY_VIP_BONUS_DAYS=Object.freeze({
  5:Object.freeze({kind:'xp',durationMs:3_600_000}),
  10:Object.freeze({kind:'loot',durationMs:3_600_000}),
  15:Object.freeze({kind:'xp',durationMs:3_600_000}),
  20:Object.freeze({kind:'loot',durationMs:3_600_000}),
  25:Object.freeze({kind:'xp',durationMs:3_600_000}),
  30:Object.freeze({kind:'loot',durationMs:3_600_000})
});
export function dailyLoginReward(day=1){
  day=Math.max(1,Math.min(31,Math.trunc(Number(day)||1)));
  return DAILY_LOGIN_REWARDS[day-1]||DAILY_LOGIN_REWARDS[0];
}
