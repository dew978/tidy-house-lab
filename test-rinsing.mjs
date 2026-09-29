import assert from 'node:assert/strict';
import * as THREE from 'three';
import {makeRinseAnimation,rinsePhase,RINSE_DURATION} from './src/rinsing.js';
assert.equal(rinsePhase(0).remaining,1);
assert.ok(rinsePhase(1).pour>.9);
assert.equal(rinsePhase(1).rinse,0);
assert.equal(rinsePhase(3).remaining,0);
assert.ok(rinsePhase(3).rinse>.9);
for(const bin of ['pet','carton','can','plastic']){
 const scene=new THREE.Scene(),object=new THREE.Group();
 const body=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.25,8),new THREE.MeshStandardMaterial());object.add(body);
 const effect=makeRinseAnimation(scene),item={object,bin,prepared:false};body.userData.action=item;effect.start(item);assert.equal(effect.active,true);
 effect.update(1);const progress=effect.progress;effect.update(0);assert.equal(effect.progress,progress,'Pausing must not advance preparation');
 for(let i=0;i<35;i++)assert.equal(effect.update(.1),null,'An item must not complete early');
 const finished=effect.update(RINSE_DURATION);assert.equal(finished,item);assert.equal(effect.active,false);assert.equal(item.prepared,false,'Only the game may commit completion');
 scene.traverse(mesh=>{if(mesh.geometry?.attributes.position)assert.ok([...mesh.geometry.attributes.position.array].every(Number.isFinite),'Animated geometry must stay finite');});
 assert.equal(effect.update(1),null,'Completion must fire once');effect.start(item);effect.cancel();assert.equal(effect.active,false);
}
console.log('Pour → rinse sequence, pause, finite geometry and one-shot completion passed for all four containers.');
