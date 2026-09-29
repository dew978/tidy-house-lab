import { ITEM_POOL,ITEM_SPOTS,DIRT_SLOTS,HAZARDS,dirtTool,dirtName } from './variety.js';

export const CONTRACTS=[
 {id:'weekend',name:'주말의 우리 집',description:'책과 옷을 정리하고, 생활 먼지와 물때를 없애요.',accent:'#799985'},
 {id:'cooking',name:'함께 요리한 날',description:'주방의 음식물과 기름때를 살피고 집을 정돈해요.',accent:'#c4a364'},
 {id:'rain',name:'비 오는 날의 정리',description:'젖은 발자국을 불려 닦고, 욕실의 습기와 곰팡이를 관리해요.',accent:'#7ba5b5'}
];
export function seededRandom(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
export const ROOM_PADS={bedroom:[[-2.61,.82],[-.41,-1.13],[-2.8,-.85],[-1.98,-.68],[-2.54,-2.17],[-1.4,1.2]],kitchen:[[2.44,.75],[3.17,.7],[2.5,-1.3],[3.0,1.25]],bathroom:[[3.66,4.5],[4.0,3.5],[3.8,5.4]]};
export const isLegacy=contract=>!contract||contract.seed===1&&contract.id==='weekend';
const ROOMS=['bedroom','kitchen','bathroom'];

// The first house keeps its original items, dirt and hazard so saved progress
// still matches. Every other run draws its own items, dirt and hazards from the
// seed, so a reload shows the same house and a new request shows a new one.
export function contractLayout(contract){
 if(isLegacy(contract))return {legacy:true,items:{},dirt:null,hazards:['hazard-glass']};
 const random=seededRandom(contract.seed||2),theme=contract.id;
 const shuffle=list=>list.map((value,i)=>({value,key:random(),i})).sort((a,b)=>a.key-b.key||a.i-b.i).map(x=>x.value);
 const pick=list=>list[Math.floor(random()*list.length)];

 // Items: 8–10 per run, at least two tricky ones and something to put away.
 const counts={bedroom:3+(random()<.5?1:0),kitchen:theme==='cooking'?4:3+(random()<.5?1:0),bathroom:2};
 const chosen={bedroom:[],kitchen:[],bathroom:[]};
 for(const it of shuffle(ITEM_POOL.filter(x=>x.tricky)).slice(0,2))if(chosen[it.room].length<counts[it.room])chosen[it.room].push(it);
 for(const room of ROOMS)for(const it of shuffle(ITEM_POOL.filter(x=>x.room===room&&!chosen[room].includes(x))))if(chosen[room].length<counts[room])chosen[room].push(it);
 if(!ROOMS.some(room=>chosen[room].some(x=>x.storage))){const bedroom=chosen.bedroom,i=bedroom.findIndex(x=>!x.tricky);bedroom[i>=0?i:0]=pick(ITEM_POOL.filter(x=>x.room==='bedroom'&&x.storage));}
 const items={};
 for(const room of ROOMS){const spots=shuffle(ITEM_SPOTS[room]);chosen[room].forEach((it,i)=>{const [x,y,z]=spots[i];items[it.id]={x,y,z,angle:(random()-.5)*1.8};});}

 // Dirt: a mix of kinds on a subset of places, keeping dry and wet work in each room.
 const dirt=[];
 for(const room of ROOMS){
  const slots=DIRT_SLOTS.filter(s=>s.room===room);let use;
  if(room==='bedroom'){const high=shuffle(slots.filter(s=>s.high))[0];use=[high,...shuffle(slots.filter(s=>!s.high)).slice(0,2)];}
  else use=theme==='cooking'&&room==='kitchen'?slots:shuffle(slots).slice(0,3);
  const kinds=use.map(slot=>{const k=slot.kinds;if(theme==='rain'&&k.includes('mud'))return 'mud';if(theme==='rain'&&k.includes('mould')&&random()<.6)return 'mould';if(theme==='cooking'&&k.includes('grease')&&random()<.7)return 'grease';return pick(k);});
  if(!kinds.includes('dust')){const i=use.findIndex(s=>s.kinds.includes('dust')&&use.length>1);if(i>=0)kinds[i]='dust';}
  if(kinds.every(k=>k==='dust')){const i=use.findIndex(s=>s.kinds.some(k=>k!=='dust'));if(i>=0)kinds[i]=use[i].kinds.find(k=>k!=='dust');}
  if(room==='bathroom'&&theme==='rain'&&!kinds.includes('mould')){const i=use.findIndex(s=>s.kinds.includes('mould'));if(i>=0)kinds[i]='mould';}
  use.forEach((slot,i)=>{const kind=kinds[i];dirt.push({id:slot.id,room,name:dirtName(slot,kind),x:slot.x,y:slot.y,z:slot.z,w:slot.w,h:slot.h,kind,tool:dirtTool(kind,slot.y),rotation:slot.rotation??-Math.PI/2});});
 }

 // Hazards: two per run; the request's theme brings its typical one.
 const themed={cooking:'hazard-pot',rain:'hazard-strip'}[theme];
 const others=shuffle(HAZARDS.map(h=>h.id).filter(id=>id!==themed));
 const hazards=themed?[themed,others[0]]:others.slice(0,2);
 return {legacy:false,items,dirt,hazards};
}

function detach(world,data){
 const parts=new Set();data.object.traverse(o=>parts.add(o));
 for(const list of[world.targets,world.solid])for(let i=list.length-1;i>=0;i--)if(parts.has(list[i]))list.splice(i,1);
 for(const list of[world.items,world.interactives]){const i=list.indexOf(data);if(i>=0)list.splice(i,1);}
 data.object.visible=false;data.object.parent?.remove(data.object);
}
export function applyContract(world,contract){
 const layout=contractLayout(contract);
 const keep=new Set(layout.legacy?ITEM_POOL.filter(x=>x.legacy).map(x=>x.id):Object.keys(layout.items));
 for(const item of[...world.items]){if(!keep.has(item.id)){detach(world,item);continue;}const p=layout.items[item.id];if(p){item.object.position.set(p.x,p.y,p.z);item.object.rotation.y=p.angle;}}
 for(const hazard of world.interactives.filter(x=>x.type==='hazard'))if(!layout.hazards.includes(hazard.id))detach(world,hazard);
 if(layout.dirt){world.decals.length=0;world.decals.push(...layout.dirt);}
 for(const d of world.decals)d.seed=contract?.seed||1;
 return layout;
}
