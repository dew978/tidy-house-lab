import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
export function createDetailedRenderer(renderer,scene,camera){
 const rt=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType});
 const composer=new EffectComposer(renderer,rt);composer.setPixelRatio(1);
 const render=new RenderPass(scene,camera),ao=new GTAOPass(scene,camera,1,1,undefined,{radius:.5,thickness:.7,scale:1.5}),output=new OutputPass();
 ao.blendIntensity=.7;composer.addPass(render);composer.addPass(ao);composer.addPass(output);
 return {render:dt=>composer.render(dt),resize:(w,h)=>composer.setSize(w,h),dispose(){ao.dispose();output.dispose();composer.dispose();}};
}
export async function detailedEnvironment(renderer){const texture=await new HDRLoader().loadAsync('./assets/textures/environment.hdr');texture.mapping=THREE.EquirectangularReflectionMapping;const gen=new THREE.PMREMGenerator(renderer);const environment=gen.fromEquirectangular(texture).texture;gen.dispose();return {background:texture,environment};}
