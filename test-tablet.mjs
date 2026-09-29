import assert from 'node:assert/strict';
import { contractLayout,CONTRACTS } from './src/contracts.js';
import { remainingDirt,cleanProgress } from './src/cleaning-math.js';
import { renderBudget } from './src/performance.js';
const same={id:'cooking',seed:48312};
assert.deepEqual(contractLayout(same),contractLayout(same),'Reloads must preserve the same contract layout');
assert.notDeepEqual(contractLayout(same),contractLayout({...same,seed:48313}),'Another round must change the arrangement');
assert.deepEqual(contractLayout({id:'weekend',seed:1}),{items:{},decals:{}},'Existing first-house progress keeps its original placement');
for(const definition of CONTRACTS){const layout=contractLayout({id:definition.id,seed:822});const positions=Object.values(layout.items).map(p=>`${p.x},${p.z}`);assert.equal(new Set(positions).size,positions.length,'Movable items must occupy distinct pads');}
assert.equal(contractLayout({id:'rain',seed:2}).decals['kitchen-floor'].kind,'mud');
const budget=renderBudget('auto',2560,1600,2);assert.ok(2560*budget.ratio<=1280.01);assert.ok(2560*1600*budget.ratio**2<=1000000);assert.equal(budget.fps,30);assert.equal(budget.detailed,false);
assert.ok(renderBudget('low',1280,800,2).ratio<renderBudget('auto',1280,800,2).ratio);
const pixels=new Uint8ClampedArray(16*16*4);pixels[(2*16+3)*4+3]=180;pixels[(13*16+14)*4+3]=50;
let scan=remainingDirt(pixels,16,16);assert.equal(scan.mass,230);assert.ok(scan.point.u<.3&&scan.point.v>.8,'The guide must identify real residual dirt');
pixels[(2*16+3)*4+3]=0;scan=remainingDirt(pixels,16,16);assert.ok(scan.point.u>.8&&scan.point.v<.2,'The guide moves after the previous spot is cleaned');assert.equal(cleanProgress(20,100),.8);
console.log('Contract persistence, new layouts, tablet render limits and remaining-dirt guidance passed.');
