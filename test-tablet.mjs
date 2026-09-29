import assert from 'node:assert/strict';
import { contractLayout,CONTRACTS } from './src/contracts.js';
import { ITEM_POOL,ITEM_SPOTS,DIRT_KINDS,DIRT_SLOTS,HAZARDS,dirtTool } from './src/variety.js';
import { remainingDirt,cleanProgress } from './src/cleaning-math.js';
import { renderBudget } from './src/performance.js';
const same={id:'cooking',seed:48312};
assert.deepEqual(contractLayout(same),contractLayout(same),'Reloads must preserve the same contract layout');
assert.notDeepEqual(contractLayout(same),contractLayout({...same,seed:48313}),'Another round must change the house');
const legacy=contractLayout({id:'weekend',seed:1});assert.equal(legacy.legacy,true);assert.equal(legacy.dirt,null,'The first house keeps its original dirt');assert.deepEqual(legacy.hazards,['hazard-glass'],'The first house keeps its original hazard');
assert.equal(ITEM_POOL.filter(x=>x.legacy).length,14,'All original items stay available for saved progress');
const seen={items:new Set(),kinds:new Set(),hazards:new Set()},poolItem=id=>ITEM_POOL.find(x=>x.id===id);
for(const definition of CONTRACTS)for(let seed=2;seed<60;seed++){
 const layout=contractLayout({id:definition.id,seed}),ids=Object.keys(layout.items);
 assert.ok(ids.length>=8&&ids.length<=10,'Each run draws 8–10 items');
 assert.ok(ids.filter(id=>poolItem(id).tricky).length>=2,'Each run has at least two tricky items');
 assert.ok(ids.some(id=>poolItem(id).storage),'Each run has something to put away');
 const positions=Object.values(layout.items).map(p=>`${p.x},${p.z}`);assert.equal(new Set(positions).size,positions.length,'Movable items must occupy distinct spots');
 for(const id of ids)assert.ok(ITEM_SPOTS[poolItem(id).room].some(([x,,z])=>x===layout.items[id].x&&z===layout.items[id].z),'Items stay in their own room');
 assert.equal(new Set(layout.hazards).size,2,'Each run has two different hazards');
 if(definition.id==='cooking')assert.ok(layout.hazards.includes('hazard-pot'),'Cooking brings the hot pot');
 if(definition.id==='rain'){assert.ok(layout.hazards.includes('hazard-strip'),'Rain brings the wet power strip');assert.ok(layout.dirt.some(d=>d.kind==='mud'),'Rain brings mud');}
 for(const room of['bedroom','kitchen','bathroom']){const dirt=layout.dirt.filter(d=>d.room===room);assert.ok(dirt.length>=3);assert.ok(dirt.some(d=>d.kind!=='dust'),'Every room has wet work');}
 assert.ok(layout.dirt.some(d=>DIRT_SLOTS.find(s=>s.id===d.id).high),'The bedroom starts from a high surface');
 for(const d of layout.dirt){assert.ok(DIRT_SLOTS.find(s=>s.id===d.id).kinds.includes(d.kind),'Dirt kinds fit their surface');assert.equal(d.tool,dirtTool(d.kind,d.y));assert.ok(DIRT_KINDS[d.kind]);}
 ids.forEach(id=>seen.items.add(id));layout.dirt.forEach(d=>seen.kinds.add(d.kind));layout.hazards.forEach(h=>seen.hazards.add(h));
}
assert.equal(seen.hazards.size,HAZARDS.length,'Every hazard appears across runs');
assert.deepEqual([...seen.kinds].sort(),Object.keys(DIRT_KINDS).sort(),'Dust, mud, grease, water stains and mould all appear across runs');
assert.ok(seen.items.size>=ITEM_POOL.length-2,'Nearly the whole item pool appears across runs');
assert.equal(dirtTool('mould',.02),'brush','Mould is scrubbed wet, never vacuumed or mopped dry');assert.equal(dirtTool('dust',.85),'duster');assert.equal(dirtTool('mud',.02),'mop');
for(const h of HAZARDS){assert.equal(h.options.filter(o=>o.ok).length,1,'One safe response per hazard');assert.ok(h.options.filter(o=>!o.ok).every(o=>o.why),'Every unsafe response explains why');assert.ok(h.resolved&&h.question);}
for(const k of Object.values(DIRT_KINDS))assert.ok(k.hint&&k.method,'Every dirt kind states its method');
for(const it of ITEM_POOL.filter(x=>x.tricky))assert.ok(it.tip,'Every tricky item states how to handle it');
for(const definition of CONTRACTS){const layout=contractLayout({id:definition.id,seed:822});const positions=Object.values(layout.items).map(p=>`${p.x},${p.z}`);assert.equal(new Set(positions).size,positions.length,'Movable items must occupy distinct pads');}
const budget=renderBudget('auto',2560,1600,2);assert.ok(2560*budget.ratio<=1280.01);assert.ok(2560*1600*budget.ratio**2<=1000000);assert.equal(budget.fps,30);assert.equal(budget.detailed,false);
assert.ok(renderBudget('low',1280,800,2).ratio<renderBudget('auto',1280,800,2).ratio);
const pixels=new Uint8ClampedArray(16*16*4);pixels[(2*16+3)*4+3]=180;pixels[(13*16+14)*4+3]=50;
let scan=remainingDirt(pixels,16,16);assert.equal(scan.mass,230);assert.ok(scan.point.u<.3&&scan.point.v>.8,'The guide must identify real residual dirt');
pixels[(2*16+3)*4+3]=0;scan=remainingDirt(pixels,16,16);assert.ok(scan.point.u>.8&&scan.point.v<.2,'The guide moves after the previous spot is cleaned');assert.equal(cleanProgress(20,100),.8);
console.log('Contract persistence, per-run items/dirt/hazards, tablet render limits and remaining-dirt guidance passed.');
