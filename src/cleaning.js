import * as THREE from 'three';
import { seededRandom } from './contracts.js';
import { remainingDirt,cleanProgress } from './cleaning-math.js';
export class DirtPatch{
 constructor(spec,scene,saved){
  Object.assign(this,spec);this.wet=saved?.wet||0;this.progress=0;this.done=false;this.strokes=[];this.sinceMeasure=0;
  this.canvas=document.createElement('canvas');this.canvas.width=this.canvas.height=256;
  this.ctx=this.canvas.getContext('2d');const ctx=this.ctx;
  this.mask=document.createElement('canvas');this.mask.width=this.mask.height=96;this.maskCtx=this.mask.getContext('2d',{willReadFrequently:true});
  let seed=[...this.id].reduce((n,c)=>n+c.charCodeAt(0),0)+(this.seed>1?this.seed:0),r=seededRandom(seed);
  if(this.kind==='dust'){
   for(let i=0;i<500;i++){const a=r()*Math.PI*2,rad=Math.sqrt(r()),x=128+Math.cos(a)*rad*111,y=128+Math.sin(a)*rad*107;ctx.fillStyle=`rgba(${76+Math.floor(r()*33)},${66+Math.floor(r()*30)},${51+Math.floor(r()*26)},${.18+r()*.32})`;ctx.beginPath();ctx.ellipse(x,y,1+r()*5,1+r()*2,r()*6,0,Math.PI*2);ctx.fill();}
   for(let i=0;i<20;i++){ctx.strokeStyle='rgba(44,44,33,.7)';ctx.lineWidth=1;ctx.beginPath();let x=25+r()*200,y=25+r()*200;ctx.moveTo(x,y);ctx.quadraticCurveTo(x+15,y-8,x+20,y+13);ctx.stroke();}
  }else if(this.kind==='mud'){
   for(let j=0;j<5;j++){let x=75+(j%2)*86,y=27+j*44;ctx.save();ctx.translate(x,y);ctx.rotate(j%2?.2:-.25);ctx.fillStyle='rgba(83,65,43,.72)';ctx.beginPath();ctx.ellipse(0,0,18,27,0,0,7);ctx.fill();ctx.fillRect(-13,32,26,13);ctx.globalCompositeOperation='destination-out';for(let k=0;k<6;k++)ctx.fillRect(-18,-20+k*8,36,3);ctx.restore();}
  }else if(this.kind==='mould'){
   // Mould grows in dark speckled colonies, densest in the middle of each patch.
   for(let c=0;c<9;c++){const cx=35+r()*186,cy=35+r()*186,spread=14+r()*26;for(let i=0;i<70;i++){const a=r()*Math.PI*2,d=Math.pow(r(),1.6)*spread;ctx.fillStyle=`rgba(${28+Math.floor(r()*22)},${38+Math.floor(r()*20)},${30+Math.floor(r()*16)},${.28+r()*.45})`;ctx.beginPath();ctx.arc(cx+Math.cos(a)*d,cy+Math.sin(a)*d,.8+r()*2.6,0,7);ctx.fill();}}
   for(let i=0;i<30;i++){const x=40+r()*176,y=40+r()*176,rad=10+r()*28,g=ctx.createRadialGradient(x,y,0,x,y,rad);g.addColorStop(0,'rgba(58,70,52,.18)');g.addColorStop(1,'rgba(58,70,52,0)');ctx.fillStyle=g;ctx.fillRect(x-rad,y-rad,rad*2,rad*2);}
  }else{
   for(let i=0;i<80;i++){const x=40+r()*176,y=40+r()*176,rad=12+r()*47;const g=ctx.createRadialGradient(x,y,0,x,y,rad),rgb=this.kind==='soap'?'86,109,89':'115,80,36';g.addColorStop(0,`rgba(${rgb},.2)`);g.addColorStop(.6,`rgba(${rgb},.12)`);g.addColorStop(1,`rgba(${rgb},0)`);ctx.fillStyle=g;ctx.fillRect(x-rad,y-rad,rad*2,rad*2);}
   for(let i=0;i<40;i++){ctx.fillStyle=this.kind==='soap'?'rgba(53,81,58,.3)':'rgba(111,77,31,.34)';ctx.beginPath();ctx.arc(30+r()*196,30+r()*196,1+r()*3,0,7);ctx.fill();}
  }
  this.maskCtx.drawImage(this.canvas,0,0,96,96);this.initial=remainingDirt(this.maskCtx.getImageData(0,0,96,96).data,96,96).mass;
  this.texture=new THREE.CanvasTexture(this.canvas);this.texture.colorSpace=THREE.SRGBColorSpace;this.texture.generateMipmaps=false;this.texture.minFilter=THREE.LinearFilter;
  this.mesh=new THREE.Mesh(new THREE.PlaneGeometry(spec.w,spec.h),new THREE.MeshStandardMaterial({map:this.texture,transparent:true,depthWrite:false,roughness:.94,polygonOffset:true,polygonOffsetFactor:-1,side:THREE.DoubleSide}));
  this.mesh.position.set(spec.x,spec.y,spec.z);this.mesh.rotation.x=spec.rotation;this.mesh.receiveShadow=true;this.mesh.userData.patch=this;scene.add(this.mesh);
  this.guideCanvas=document.createElement('canvas');this.guideCanvas.width=this.guideCanvas.height=96;this.guideCtx=this.guideCanvas.getContext('2d');
  this.guideTexture=new THREE.CanvasTexture(this.guideCanvas);this.guideTexture.colorSpace=THREE.SRGBColorSpace;this.guideTexture.generateMipmaps=false;this.guideTexture.minFilter=THREE.LinearFilter;
  this.guide=new THREE.Mesh(this.mesh.geometry,new THREE.MeshBasicMaterial({map:this.guideTexture,transparent:true,opacity:.7,depthWrite:false,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2}));this.guide.position.z=.004;this.mesh.add(this.guide);
  const edge=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-this.w/2,-this.h/2,.006),new THREE.Vector3(this.w/2,-this.h/2,.006),new THREE.Vector3(this.w/2,this.h/2,.006),new THREE.Vector3(-this.w/2,this.h/2,.006)]);
  this.border=new THREE.LineLoop(edge,new THREE.LineBasicMaterial({color:'#ffce60',transparent:true,opacity:.7,depthWrite:false}));this.mesh.add(this.border);
  this.marker=new THREE.Mesh(new THREE.RingGeometry(.045,.065,20),new THREE.MeshBasicMaterial({color:'#fff3b1',transparent:true,opacity:.95,side:THREE.DoubleSide,depthWrite:false}));this.marker.position.z=.009;this.mesh.add(this.marker);
  if(saved?.done){this.done=true;this.progress=1;this.mesh.visible=false;}else{for(const s of saved?.strokes||[])this.erase(...s,false);this.strokes=(saved?.strokes||[]).map(s=>[...s]);this.measure();}
 }
 measure(){
  const pixels=this.maskCtx.getImageData(0,0,96,96),scan=remainingDirt(pixels.data,96,96);this.remaining=scan.point;this.progress=cleanProgress(scan.mass,this.initial);
  if(this.progress>=.92){this.done=true;this.progress=1;this.mesh.visible=false;return 1;}
  const visual=this.guideCtx.createImageData(96,96);for(let i=0;i<pixels.data.length;i+=4){visual.data[i]=255;visual.data[i+1]=192;visual.data[i+2]=64;visual.data[i+3]=Math.min(210,pixels.data[i+3]*6);}
  this.guideCtx.putImageData(visual,0,0);this.guideTexture.needsUpdate=true;
  if(this.remaining)this.marker.position.set((this.remaining.u-.5)*this.w,(this.remaining.v-.5)*this.h,.009);
  return this.progress;
 }
 erase(u,v,radius,opacity,record=true){
  for(const [ctx,size]of[[this.ctx,256],[this.maskCtx,96]]){ctx.save();ctx.globalCompositeOperation='destination-out';ctx.translate(u*size,(1-v)*size);ctx.scale(radius/this.w*size,radius/this.h*size);const g=ctx.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,`rgba(0,0,0,${opacity})`);g.addColorStop(.72,`rgba(0,0,0,${opacity})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(-1,-1,2,2);ctx.restore();}
  this.texture.needsUpdate=true;
  if(record){const stroke=[+u.toFixed(3),+v.toFixed(3),+radius.toFixed(3),+opacity.toFixed(3)],last=this.strokes.at(-1);if(last&&Math.abs(last[0]-u)<.008&&Math.abs(last[1]-v)<.008&&last[2]===stroke[2]&&last[3]<.98)last[3]=Math.min(.999,1-(1-last[3])*(1-opacity));else this.strokes.push(stroke);}
 }
 clean(u,v,radius,dt){
  const assist=this.progress>=.8;this.erase(u,v,radius*(assist?1.35:1),Math.min(.7,dt*8));
  // At the end of a surface, guide the last sweep onto the strongest remaining
  // residue. Holding the tool no longer stalls on a nearly invisible fragment.
  if(assist&&this.remaining)this.erase(this.remaining.u,this.remaining.v,Math.max(radius,.19),Math.min(.7,dt*8));
  this.sinceMeasure+=dt;if(this.sinceMeasure>=.12){this.sinceMeasure=0;this.measure();}
 }
 showGuide(show,focused,time){this.guide.visible=show;this.border.visible=show;this.marker.visible=show&&!!this.remaining;this.guide.material.opacity=focused?.75:.5;this.border.material.opacity=focused?1:.75;this.marker.scale.setScalar(1+Math.sin(time*4)*.12);}
 spray(dt){this.wet=Math.min(1,this.wet+dt*.7);this.mesh.material.roughness=.94-this.wet*.56;}
 save(){return {done:this.done,wet:this.wet,strokes:this.done?[]:this.strokes};}
}
