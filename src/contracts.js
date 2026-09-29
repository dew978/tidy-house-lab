export const CONTRACTS=[
 {id:'weekend',name:'주말의 우리 집',description:'책과 옷을 정리하고, 생활 먼지와 물때를 없애요.',accent:'#799985'},
 {id:'cooking',name:'함께 요리한 날',description:'주방의 음식물과 기름때를 살피고 집을 정돈해요.',accent:'#c4a364'},
 {id:'rain',name:'비 오는 날의 정리',description:'젖은 발자국을 불려 닦고, 욕실의 습기를 관리해요.',accent:'#7ba5b5'}
];
export function seededRandom(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
export const ROOM_PADS={bedroom:[[-2.61,.82],[-.41,-1.13],[-2.8,-.85],[-1.98,-.68],[-2.54,-2.17],[-1.4,1.2]],kitchen:[[2.44,.75],[3.17,.7],[2.5,-1.3],[3.0,1.25]],bathroom:[[3.66,4.5],[4.0,3.5],[3.8,5.4]]};
export function contractLayout(contract){
 const result={items:{},decals:{}};
 if(!contract||contract.seed===1&&contract.id==='weekend')return result;
 const random=seededRandom(contract.seed||2);
 const shuffle=points=>points.map(p=>[...p]).sort(()=>0).map((p,i)=>({p,key:random(),i})).sort((a,b)=>a.key-b.key||a.i-b.i).map(x=>x.p);
 const assign=(room,ids)=>{const pads=shuffle(ROOM_PADS[room]);ids.forEach((id,i)=>{result.items[id]={x:pads[i][0],z:pads[i][1],angle:(random()-.5)*1.8};});};
 assign('bedroom',['book1','book2','shirt','pet1','tissue']);assign('kitchen',['can1','peel']);assign('bathroom',['plastic']);
 result.decals['bed-dust']={x:-1.9+(random()-.5)*.35,z:.35+(random()-.5)*.3};
 result.decals['kitchen-dust']={x:2.6,z:contract.id==='cooking'?.65:-1.1};
 result.decals['kitchen-floor']={x:contract.id==='cooking'?5.4:4.23,z:1.15};
 result.decals['bath-floor']={x:3.95,z:5.1+(random()-.5)*.25};
 if(contract.id==='rain'){result.decals['bed-mud']={x:-.65,z:.75,w:1.2,h:1.75};result.decals['kitchen-floor'].kind='mud';result.decals['kitchen-floor'].name='주방 바닥의 젖은 발자국';}
 return result;
}
export function applyContract(world,contract){const layout=contractLayout(contract);for(const item of world.items){const p=layout.items[item.id];if(p){item.object.position.x=p.x;item.object.position.z=p.z;item.object.rotation.y=p.angle;}}for(const d of world.decals){Object.assign(d,layout.decals[d.id]||{});d.seed=contract?.seed||1;}return layout;}
