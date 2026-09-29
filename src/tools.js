import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
export const TOOLS=[
 {id:'hand',name:'손',full:'손 · 집고 정리하기',hint:'E 집기 / 놓기',icon:'M14 25V13a2 2 0 0 1 4 0v5-10a2 2 0 0 1 4 0v10-8a2 2 0 0 1 4 0v9-5a2 2 0 0 1 4 0v10c0 7-4 10-9 10-4 0-7-2-9-6l-5-7a2 2 0 0 1 3-3z'},
 {id:'vacuum',name:'청소기',full:'청소기 · 마른 먼지',hint:'클릭 누르기 / Space',icon:'M9 30h23v5H9zM21 30V16l10-9M26 7l5-2 3 4M16 19v-4a5 5 0 0 0-10 0v14'},
 {id:'spray',name:'분무기',full:'분무기 · 물로 얼룩 불리기',hint:'얼룩에 대고 클릭 누르기',icon:'M15 17h12l3 16H12zM18 17v-6h7v6M17 11V7h15v4h-9M26 11l5 7M34 8h2M34 12l2 1'},
 {id:'mop',name:'밀대',full:'밀대 · 불린 바닥 얼룩',hint:'얼룩을 먼저 물로 불려요',icon:'M23 6l-4 23M8 29h24l2 7H6zM12 32l-1 4M18 32v4M24 32l1 4M30 32l1 4'},
 {id:'brush',name:'솔·수세미',full:'솔·수세미 · 표면 닦기',hint:'주방용과 욕실용은 자동 분리',icon:'M8 23h24v7H8zM14 23v-8c0-5 12-5 12 0v8M11 30v5M16 30v5M21 30v5M26 30v5M31 30v5'},
 {id:'duster',name:'먼지떨이',full:'먼지떨이 · 높은 곳부터',hint:'책상 등 높은 곳의 마른 먼지',icon:'M20 21v15M11 23V12c0-8 18-8 18 0v11M15 22V10M20 22V8M25 22V10M9 23h22'}
];

export function makeToolView(renderer){
 const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(52,1,.01,10);
 scene.add(new THREE.HemisphereLight('#f7f6e6','#637265',3));const key=new THREE.DirectionalLight('#ffeed1',3);key.position.set(-2,4,2);scene.add(key);
 const root=new THREE.Group();root.scale.setScalar(.85);scene.add(root);const tools={};
 const mat=(c,r=.5,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
 const dark=mat('#253538',.5),chrome=mat('#b7c3c5',.18,.86),teal=mat('#537f74',.45),rubber=mat('#101f20',.9),glove=mat('#cab472',.8),cuff=mat('#536b63',1),white=mat('#e6e6d5',.9);
 function box(w,h,d,m,x,y,z,p,r=.02){const o=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,1,Math.min(r,w/4,h/4,d/4)),m);o.position.set(x,y,z);p.add(o);return o;}
 function cyl(a,b,h,m,x,y,z,p){const o=new THREE.Mesh(new THREE.CylinderGeometry(a,b,h,12),m);o.position.set(x,y,z);p.add(o);return o;}
 function tube(pts,r,m,p){const o=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(v=>new THREE.Vector3(...v))),24,r,9),m);p.add(o);return o;}
 function arm(p,x,y,z,angle=.3){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.z=angle;g.rotation.x=.4;p.add(g);cyl(.047,.06,.31,cuff,0,-.19,.03,g);const hand=box(.092,.13,.07,glove,0,.008,0,g,.027);for(let i=0;i<4;i++)cyl(.012,.013,.066,glove,-.033+i*.022,.067,-.011,g);let thumb=cyl(.016,.017,.072,glove,.05,.025,.008,g);thumb.rotation.z=-.5;return g;}
 for(const t of TOOLS){const g=new THREE.Group();g.visible=false;tools[t.id]=g;root.add(g);}
 let g=tools.hand;arm(g,.29,-.22,-.49,-.15);arm(g,-.29,-.27,-.51,.2);
 g=tools.vacuum;let shaft=cyl(.018,.018,.92,chrome,.22,-.21,-.92,g);shaft.rotation.x=-1.05;shaft.rotation.z=.19;box(.33,.074,.19,dark,.15,-.46,-1.32,g,.02);box(.29,.019,.08,teal,.15,-.412,-1.32,g,.01);box(.3,.012,.09,rubber,.15,-.5,-1.32,g,.004);box(.095,.16,.16,teal,.27,-.04,-.56,g,.035);tube([[.29,-.09,-.49],[.48,-.32,-.43],[.54,-.62,-.49]],.04,rubber,g);arm(g,.295,-.105,-.52,-.13);
 g=tools.spray;box(.19,.29,.12,new THREE.MeshPhysicalMaterial({color:'#719e96',roughness:.2,transparent:true,opacity:.91}),.25,-.18,-.6,g,.045);box(.155,.103,.006,white,.25,-.18,-.536,g,.014);cyl(.04,.045,.045,dark,.25,-.014,-.6,g);box(.105,.069,.25,teal,.25,.029,-.66,g,.017);box(.08,.048,.022,rubber,.25,.026,-.791,g,.008);let trigger=box(.025,.088,.014,white,.247,-.039,-.71,g,.007);trigger.rotation.x=-.2;arm(g,.299,-.16,-.56,-.09);
 g=tools.mop;shaft=cyl(.014,.014,1.07,chrome,.2,-.18,-1.02,g);shaft.rotation.x=-1.08;shaft.rotation.z=.18;box(.46,.045,.24,teal,.13,-.475,-1.48,g,.025);box(.5,.035,.275,white,.13,-.51,-1.48,g,.018);for(let i=0;i<11;i++)box(.022,.018,.3,white,-.1+i*.045,-.531,-1.48,g,.004);cyl(.024,.024,.16,rubber,.285,.003,-.57,g).rotation.x=-1.08;arm(g,.31,-.075,-.52,-.12);
 g=tools.brush;box(.19,.055,.26,teal,.22,-.26,-.82,g,.04);const bristles=new THREE.InstancedMesh(new THREE.CylinderGeometry(.006,.005,.059,6),white,42);const matrix=new THREE.Matrix4();for(let x=0;x<6;x++)for(let z=0;z<7;z++){matrix.makeTranslation(.146+x*.03,-.309,-.92+z*.035);bristles.setMatrixAt(x*7+z,matrix);}g.add(bristles);tube([[.16,-.23,-.89],[.16,-.15,-.86],[.26,-.14,-.79],[.28,-.23,-.74]],.02,dark,g);arm(g,.28,-.205,-.63,-.4);
 g=tools.duster;shaft=cyl(.016,.016,.61,dark,.22,-.14,-.87,g);shaft.rotation.x=-.55;shaft.rotation.z=.15;for(let i=0;i<24;i++){const a=i*2.4;let p=new THREE.Mesh(new THREE.SphereGeometry(1,8,8),i%2?white:mat('#d6ca9d',1));p.scale.set(.026,.1,.03);p.position.set(.17+Math.sin(a)*.07,.1+Math.cos(a*.5)*.042,-1.015+Math.cos(a)*.073);p.rotation.z=Math.sin(a)*.7;g.add(p);}arm(g,.29,-.215,-.59,-.08);
 function cloneVisual(source){const n=source.isMesh?new THREE.Mesh(source.geometry,source.material):new THREE.Group();n.position.copy(source.position);n.quaternion.copy(source.quaternion);n.scale.copy(source.scale);n.visible=source.visible;for(const child of source.children)n.add(cloneVisual(child));return n;}
 let active='hand',carried=null;const carry=new THREE.Group();carry.position.set(.26,-.38,-.8);carry.scale.setScalar(.75);scene.add(carry);
 tools.hand.visible=true;
 return{scene,camera,root,tools,set(id){tools[active].visible=false;active=id;tools[id].visible=true;},setCarried(obj){carry.clear();if(obj){carried=cloneVisual(obj);carried.position.set(0,0,0);carried.rotation.set(.1,-.2,0);carried.visible=true;carried.traverse(o=>o.userData={});carry.add(carried);}else carried=null;},update(dt,time,moving,working,room){root.position.x=.07+Math.sin(time*7)*.007*moving;root.position.y=-.1+Math.abs(Math.sin(time*7))*.009*moving;root.rotation.y=Math.sin(time*1.8)*.006;root.rotation.x=Math.sin(time*1.3)*.004;if(working){if(active==='mop'||active==='brush')root.position.z=Math.sin(time*15)*.075;if(active==='duster')root.rotation.z=Math.sin(time*21)*.1;if(active==='vacuum')root.position.y+=Math.sin(time*66)*.0008;if(active==='spray')root.rotation.x-=Math.max(0,Math.sin(time*14))*.024;}else root.position.z*=.8;carry.position.y=-.34+root.position.y;carry.rotation.z=root.position.x;tools.brush.children[0].material.color.set(room==='bathroom'?'#567f9c':'#6f9866');},resize(w,h){camera.aspect=w/h;camera.updateProjectionMatrix();},render(){renderer.clearDepth();renderer.render(scene,camera);}};
}
