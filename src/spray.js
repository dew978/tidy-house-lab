import * as THREE from 'three';

// A trigger sprayer throws pulsed cones of fine droplets with a soft mist at the
// nozzle; droplets that reach the surface cling as beads and fade. Flying droplets
// also draw a short motion-blur streak. The pool is fixed, so spraying never
// allocates per frame.
const COUNT=480,DROP=0,MIST=1,BEAD=2,PULSE=.42,BURST=120,STREAK=.022;
const vertexShader=`attribute float aSize;attribute float aAlpha;attribute float aSoft;uniform float uScale;varying float vAlpha;varying float vSoft;
void main(){vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/-mv.z,1.,128.);vAlpha=aAlpha;vSoft=aSoft;}`;
const fragmentShader=`uniform vec3 uColor;varying float vAlpha;varying float vSoft;
void main(){vec2 c=gl_PointCoord-.5;float d=length(c);if(d>.5||vAlpha<.004)discard;
// Mist is a soft haze; droplets get a darker refracting edge and a glint so clear
// water stays readable against pale tiles.
float haze=exp(-d*d*14.),body=smoothstep(.5,.36,d),glint=smoothstep(.14,0.,length(c+vec2(.13,.13)));
vec3 drop=mix(vec3(.28,.42,.52),uColor,smoothstep(.48,.18,d))+glint*.6;
gl_FragColor=vec4(mix(drop,uColor,vSoft),vAlpha*mix(body+glint*.3,haze,vSoft));
#include <colorspace_fragment>
}`;

export function makeSprayEffect(scene){
 const position=new Float32Array(COUNT*3).fill(1000),size=new Float32Array(COUNT),alpha=new Float32Array(COUNT),soft=new Float32Array(COUNT);
 const velocity=new Float32Array(COUNT*3),life=new Float32Array(COUNT),age=new Float32Array(COUNT),travelled=new Float32Array(COUNT),reach=new Float32Array(COUNT),start=new Float32Array(COUNT),kind=new Uint8Array(COUNT);
 const geo=new THREE.BufferGeometry();
 geo.setAttribute('position',new THREE.BufferAttribute(position,3).setUsage(THREE.DynamicDrawUsage));
 geo.setAttribute('aSize',new THREE.BufferAttribute(size,1).setUsage(THREE.DynamicDrawUsage));
 geo.setAttribute('aAlpha',new THREE.BufferAttribute(alpha,1).setUsage(THREE.DynamicDrawUsage));
 geo.setAttribute('aSoft',new THREE.BufferAttribute(soft,1).setUsage(THREE.DynamicDrawUsage));
 const material=new THREE.ShaderMaterial({uniforms:{uScale:{value:400},uColor:{value:new THREE.Color('#e4f5fb')}},vertexShader,fragmentShader,transparent:true,depthWrite:false});
 const points=new THREE.Points(geo,material);points.frustumCulled=false;points.renderOrder=2;points.userData.mapHide=true;scene.add(points);
 const linePosition=new Float32Array(COUNT*6).fill(1000),lineColor=new Float32Array(COUNT*8),lineGeo=new THREE.BufferGeometry();
 lineGeo.setAttribute('position',new THREE.BufferAttribute(linePosition,3).setUsage(THREE.DynamicDrawUsage));
 lineGeo.setAttribute('color',new THREE.BufferAttribute(lineColor,4).setUsage(THREE.DynamicDrawUsage));
 const streaks=new THREE.LineSegments(lineGeo,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,depthWrite:false}));
 streaks.frustumCulled=false;streaks.renderOrder=2;streaks.userData.mapHide=true;scene.add(streaks);
 for(let i=0;i<COUNT*2;i++)lineColor.set([.82,.92,.96,0],i*4);
 const origin=new THREE.Vector3(),dir=new THREE.Vector3(),side=new THREE.Vector3(),up=new THREE.Vector3(),ray=new THREE.Vector3();
 let next=0,pulse=0,pending=0,distance=1,active=0,clock=0,lastEmit=-1;
 function spawn(type){
  const i=next++%COUNT,j=i*3;kind[i]=type;age[i]=0;travelled[i]=0;soft[i]=type===MIST?1:0;
  // Most droplets stay in a tight cone; a few stray wider like a real mist nozzle.
  const spread=(type===MIST?.22:Math.random()<.85?.075:.16)*Math.sqrt(Math.random()),turn=Math.random()*Math.PI*2;
  ray.copy(dir).addScaledVector(side,Math.cos(turn)*spread).addScaledVector(up,Math.sin(turn)*spread).normalize();
  const speed=type===MIST?.7+Math.random()*1.3:3.6+Math.random()*1.6;
  position[j]=origin.x+ray.x*.012;position[j+1]=origin.y+ray.y*.012;position[j+2]=origin.z+ray.z*.012;
  velocity[j]=ray.x*speed;velocity[j+1]=ray.y*speed;velocity[j+2]=ray.z*speed;
  if(type===MIST){life[i]=.6+Math.random()*.4;start[i]=.025+Math.random()*.02;}
  else{life[i]=1.4;start[i]=.005+Math.random()*.005;reach[i]=distance*(.985+Math.random()*.01);}
  size[i]=start[i];alpha[i]=0;
 }
 return {
  // Called every frame the trigger is held; each pull releases one burst.
  emit(from,hit,dt){
   origin.copy(from);dir.copy(hit).sub(from);distance=Math.max(.05,dir.length());dir.divideScalar(distance);
   side.set(0,1,0).cross(dir);if(side.lengthSq()<1e-4)side.set(1,0,0);side.normalize();up.crossVectors(dir,side);
   // A fresh press fires at once; holding repeats the pull rhythm.
   if(clock-lastEmit>.2)pulse=0;lastEmit=clock;pulse-=dt;if(pulse<=0){pulse=PULSE;pending+=BURST;for(let n=0;n<16;n++)spawn(MIST);}
  },
  resize(heightPx,fov){material.uniforms.uScale.value=heightPx*.5/Math.tan(THREE.MathUtils.degToRad(fov)*.5);},
  update(dt){
   clock+=dt;if(pending>0){const n=Math.min(pending,Math.ceil(dt*640));for(let k=0;k<n;k++)spawn(DROP);pending-=n;}
   active=0;
   for(let i=0;i<COUNT;i++){
    const j=i*3,l=i*6,c=i*8;
    if(age[i]>=life[i]){if(alpha[i]){alpha[i]=0;position[j+1]=1000;lineColor[c+3]=0;}continue;}
    active++;age[i]+=dt;const t=age[i]/life[i];
    if(kind[i]===BEAD){size[i]=start[i]*(1+.35*Math.min(1,t*4));alpha[i]=.7*(1-t*t);lineColor[c+3]=0;continue;}
    if(kind[i]===MIST){const drag=Math.exp(-2.2*dt);velocity[j]*=drag;velocity[j+1]=velocity[j+1]*drag-.12*dt;velocity[j+2]*=drag;size[i]=start[i]*(1+t*3.5);alpha[i]=.16*Math.min(1,t*6)*(1-t);}
    else{const drag=Math.exp(-1.2*dt);velocity[j]*=drag;velocity[j+1]=velocity[j+1]*drag-1.2*dt;velocity[j+2]*=drag;alpha[i]=.8*Math.min(1,age[i]*28)*(1-t*.5);}
    const vx=velocity[j]*dt,vy=velocity[j+1]*dt,vz=velocity[j+2]*dt;position[j]+=vx;position[j+1]+=vy;position[j+2]+=vz;
    if(kind[i]!==DROP)continue;
    linePosition[l]=position[j];linePosition[l+1]=position[j+1];linePosition[l+2]=position[j+2];
    linePosition[l+3]=position[j]-velocity[j]*STREAK;linePosition[l+4]=position[j+1]-velocity[j+1]*STREAK;linePosition[l+5]=position[j+2]-velocity[j+2]*STREAK;
    lineColor[c+3]=alpha[i]*.7;
    travelled[i]+=Math.hypot(vx,vy,vz);if(travelled[i]>=reach[i]){kind[i]=BEAD;age[i]=0;life[i]=.55+Math.random()*.5;start[i]=.006+Math.random()*.008;lineColor[c+3]=0;}
   }
   if(active||pending){for(const a of Object.values(geo.attributes))a.needsUpdate=true;lineGeo.attributes.position.needsUpdate=true;lineGeo.attributes.color.needsUpdate=true;}
   return active>0;
  }
 };
}
