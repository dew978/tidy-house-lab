import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export function renderBudget(mode,width,height,deviceRatio=1,adaptive=1){
 const detailed=mode==='high';
 const longEdge=detailed?1920:mode==='low'?1024:1280;
 const pixels=detailed?2200000:mode==='low'?650000:1000000;
 const ratio=Math.min(deviceRatio,detailed?1.5:1,longEdge/Math.max(width,height),Math.sqrt(pixels/(width*height)))*adaptive;
 return {detailed,ratio:Math.max(.35,ratio),fps:detailed?60:30};
}

// Opaque static scenery shares draw calls. Original meshes retain their geometry
// for precise ray hits but use a non-rendering material. Interactive/moving nodes
// are deliberately kept separate.
export function batchScenery(scene){
 scene.updateMatrixWorld(true);
 const hidden=new THREE.MeshBasicMaterial({visible:false}),groups=new Map();let original=0;
 scene.traverse(o=>{
  if(!o.isMesh||Array.isArray(o.material)||o.material.transparent||!o.material.visible||o.userData.action||o.userData.patch||o.userData.mapHide||o.userData.noBatch)return;
  if(!o.geometry.attributes.position||!o.geometry.attributes.normal||!o.geometry.attributes.uv)return;
  const center=new THREE.Vector3();o.getWorldPosition(center);
  const cell=(center.x<1.5?'w':'e')+(center.z<2?'n':'s');
  const key=`${cell}:${o.material.uuid}:${o.castShadow}:${o.receiveShadow}`;
  if(!groups.has(key))groups.set(key,{material:o.material,cast:o.castShadow,receive:o.receiveShadow,meshes:[]});
  groups.get(key).meshes.push(o);
 });
 let merged=0;
 for(const group of groups.values()){
  if(group.meshes.length<2)continue;
  const geometries=group.meshes.map(o=>{const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();for(const name of Object.keys(g.attributes))if(!['position','normal','uv'].includes(name))g.deleteAttribute(name);g.applyMatrix4(o.matrixWorld);return g;});
  const geometry=mergeGeometries(geometries,false);geometries.forEach(g=>g.dispose());if(!geometry)continue;
  const mesh=new THREE.Mesh(geometry,group.material);mesh.castShadow=group.cast;mesh.receiveShadow=group.receive;mesh.matrixAutoUpdate=false;scene.add(mesh);
  for(const o of group.meshes){o.material=hidden;o.matrixAutoUpdate=false;original++;}merged++;
 }
 return {original,merged};
}
