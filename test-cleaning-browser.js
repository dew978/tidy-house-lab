import * as THREE from 'three';
import { DirtPatch } from './src/cleaning.js';

const result=document.querySelector('output');
try{
 const lines=[];
 for(const kind of ['dust','mud','soap','grease']){
  const scene=new THREE.Scene(),spec={id:'qa-'+kind,kind,tool:'brush',w:1.2,h:1.6,x:0,y:0,z:0,rotation:0,seed:228};
  const patch=new DirtPatch(spec,scene),radius=.18;
  let ticks=0;
  while(patch.progress<.8&&ticks++<1000){const point=patch.remaining;patch.clean(point.u,point.v,radius,.05);}
  if(patch.progress<.8)throw Error(kind+': guided strokes failed to reach 80%');
  const before=patch.progress,saved=patch.save(),restored=new DirtPatch(spec,new THREE.Scene(),saved);
  if(Math.abs(before-restored.progress)>.04)throw Error(kind+': save and reload changed visible progress');
  let heldTicks=0;
  // Hold on a previously cleaned corner. The last-residue assistance must finish.
  while(!patch.done&&heldTicks++<240)patch.clean(.03,.03,radius,.05);
  if(!patch.done)throw Error(kind+': holding after 80% stalled');
  if(!new DirtPatch(spec,new THREE.Scene(),patch.save()).done)throw Error(kind+': completed state was not restored');
  lines.push(`${kind}: ${(before*100).toFixed(1)}% → 100%, same-point hold ${(heldTicks*.05).toFixed(1)}s, save/reload OK`);
 }
 result.textContent='PASS\n'+lines.join('\n');result.dataset.result='pass';
}catch(error){result.textContent='FAIL: '+error.message;result.dataset.result='fail';}
