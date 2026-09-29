import * as THREE from 'three';

export const RINSE_DURATION=4.8;
// Where the container hangs, where the stream lands, the tap mouth and the camera focus.
export const RINSE_SPOTS={kitchen:{vessel:[4.0,1.25,-4.25],impact:[4.2,.953,-4.35],tap:[4.21,1.4,-4.45],look:[4.15,1.18,-4.35]},bathroom:{vessel:[2.88,1.15,2.68],impact:[3.08,.962,2.58],tap:[3.08,1.29,2.5],look:[3.03,1.19,2.58]}};
const smooth=(a,b,t)=>THREE.MathUtils.smoothstep(t,a,b);
export function rinsePhase(time){
 const pour=smooth(.35,.65,time)*(1-smooth(2.25,2.6,time));
 const rinse=smooth(2.65,2.9,time)*(1-smooth(4.1,4.4,time));
 return {pour,rinse,tilt:smooth(0,.6,time)*(1-smooth(2.4,2.8,time))+smooth(3.65,4.15,time)*(1-smooth(4.4,4.8,time)),remaining:1-smooth(.55,2.5,time),done:time>=RINSE_DURATION};
}

// Two small continuous meshes and pooled round droplets; no physics simulation
// or per-frame geometry allocation is needed on a tablet.
function makeFlow(parent,color){
 const rings=20,sides=8,positions=new Float32Array((rings+1)*sides*3),normals=new Float32Array(positions.length),indices=[];
 for(let r=0;r<rings;r++)for(let s=0;s<sides;s++){const a=r*sides+s,b=r*sides+(s+1)%sides;indices.push(a,b,a+sides,b,b+sides,a+sides);}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3).setUsage(THREE.DynamicDrawUsage));geo.setAttribute('normal',new THREE.BufferAttribute(normals,3).setUsage(THREE.DynamicDrawUsage));geo.setIndex(indices);
 const material=new THREE.MeshStandardMaterial({color,roughness:.16,metalness:.12,transparent:true,opacity:.88,depthWrite:false,side:THREE.DoubleSide});
 const mesh=new THREE.Mesh(geo,material);mesh.frustumCulled=false;parent.add(mesh);
 const droplets=new THREE.InstancedMesh(new THREE.SphereGeometry(1,8,6),material,14);droplets.frustumCulled=false;parent.add(droplets);
 const matrix=new THREE.Matrix4(),point=new THREE.Vector3(),scale=new THREE.Vector3(),rotation=new THREE.Quaternion();
 const rippleMaterial=new THREE.MeshBasicMaterial({color,transparent:true,opacity:.6,depthWrite:false});
 const ripples=Array.from({length:3},()=>{const ring=new THREE.Mesh(new THREE.TorusGeometry(1,.045,4,32),rippleMaterial);ring.rotation.x=-Math.PI/2;parent.add(ring);return ring;});
 return {material,update(start,end,amount,time){
  mesh.visible=droplets.visible=amount>.015;for(const ring of ripples)ring.visible=mesh.visible;if(!mesh.visible)return;
  for(let r=0;r<=rings;r++){
   const t=r/rings,neck=(.014+.003*Math.sin(t*23-time*19))*Math.sqrt(amount)*(1-.36*t);
   const x=THREE.MathUtils.lerp(start.x,end.x,t)+Math.sin(t*Math.PI)*.035;
   const y=THREE.MathUtils.lerp(start.y,end.y,t*t),z=THREE.MathUtils.lerp(start.z,end.z,t);
   for(let s=0;s<sides;s++){const angle=s/sides*Math.PI*2,i=(r*sides+s)*3;positions[i]=x+Math.cos(angle)*neck;positions[i+1]=y;positions[i+2]=z+Math.sin(angle)*neck;normals[i]=Math.cos(angle);normals[i+1]=.12;normals[i+2]=Math.sin(angle);}
  }
  geo.attributes.position.needsUpdate=true;geo.attributes.normal.needsUpdate=true;
  for(let i=0;i<14;i++){const phase=(time*2.5+i/14)%1,angle=i*2.399;point.set(end.x+Math.cos(angle)*phase*.12,end.y+Math.sin(phase*Math.PI)*.075,end.z+Math.sin(angle)*phase*.1);scale.set(.009,.018*(1-phase)+.005,.009).multiplyScalar(amount*(1-phase));matrix.compose(point,rotation,scale);droplets.setMatrixAt(i,matrix);}droplets.instanceMatrix.needsUpdate=true;
  ripples.forEach((ring,i)=>{const p=(time*1.7+i/3)%1;ring.position.copy(end);ring.position.y+=.007+i*.001;ring.scale.setScalar((.015+p*.11)*amount);});
 },hide(){mesh.visible=droplets.visible=false;for(const ring of ripples)ring.visible=false;}};
}

export function makeRinseAnimation(scene){
 const root=new THREE.Group();root.visible=false;root.userData.mapHide=true;scene.add(root);
 const vessel=new THREE.Group();root.add(vessel);
 const contents=makeFlow(root,'#c99a42'),water=makeFlow(root,'#c9efff');
 const pivot=new THREE.Vector3(),mouth=new THREE.Vector3(),impact=new THREE.Vector3(),tap=new THREE.Vector3(),base=new THREE.Vector3(),outlet=new THREE.Vector3();
 function cloneVessel(source){const copy=source.isMesh?new THREE.Mesh(source.geometry,source.material):new THREE.Group();copy.position.copy(source.position);copy.quaternion.copy(source.quaternion);copy.scale.copy(source.scale);copy.visible=source.visible;copy.userData={part:source.userData.part,noBatch:true};for(const child of source.children)copy.add(cloneVessel(child));return copy;}
 let elapsed=0,item=null,visual=null,liquidParts=[],caps=[];
 function clear(){root.visible=false;vessel.clear();contents.hide();water.hide();item=null;visual=null;liquidParts=[];caps=[];}
 return {get active(){return !!item;},get progress(){return Math.min(1,elapsed/RINSE_DURATION);},get phase(){return elapsed<2.65?'내용물 비우기':'물로 헹구기';},start(next,spot='kitchen'){
  clear();item=next;elapsed=0;const at=RINSE_SPOTS[spot]||RINSE_SPOTS.kitchen;base.set(...at.vessel);impact.set(...at.impact);tap.set(...at.tap);visual=cloneVessel(next.object);visual.position.set(0,0,0);visual.rotation.set(0,0,0);visual.visible=true;
  visual.traverse(o=>{o.userData={...o.userData,noBatch:true};if(o.userData.part==='contents')liquidParts.push({mesh:o,y:o.position.y,scale:o.scale.y});if(o.userData.part==='cap'||o.userData.part==='pump'){caps.push(o);o.visible=false;}if(o.material?.polygonOffset)o.visible=false;});
  // Rotate around the middle of the container, keeping the mouth attached.
  const height=next.bin==='pet'?.35:next.bin==='carton'?.32:next.bin==='can'?.21:.27;
  pivot.set(0,height*.45,0);visual.position.copy(pivot).negate();vessel.add(visual);
  mouth.set(next.bin==='carton'?-.05:0,height,next.bin==='carton'?.04:0).sub(pivot);
  contents.material.color.set(next.bin==='carton'?'#fff8de':next.bin==='pet'?'#c78c2e':next.bin==='can'?'#b27736':'#b7d9bf');root.visible=true;
 },update(dt){
  if(!item)return null;elapsed+=dt;const phase=rinsePhase(elapsed);
  vessel.position.copy(base);vessel.rotation.set(0,.15,-phase.tilt*2.05);vessel.updateMatrixWorld(true);outlet.copy(mouth).applyMatrix4(vessel.matrixWorld);
  for(const p of liquidParts){p.mesh.scale.y=p.scale*phase.remaining;p.mesh.visible=phase.remaining>.01;p.mesh.position.y=p.y-(1-phase.remaining)*.025;}
  contents.update(outlet,impact,phase.pour,elapsed);water.update(tap,phase.rinse>.01?outlet:impact,phase.rinse,elapsed);
  // Rinsing water drains from the tilted opening in the final rinse phase.
  if(elapsed>3.8){contents.material.color.set('#c9efff');contents.update(outlet,impact,smooth(3.8,4.05,elapsed)*(1-smooth(4.4,4.7,elapsed)),elapsed);}
  if(phase.done){const finished=item;clear();return finished;}return null;
 },cancel:clear};
}
