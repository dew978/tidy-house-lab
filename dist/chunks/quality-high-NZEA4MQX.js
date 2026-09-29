import{A as J,Ba as ft,C as $,Da as G,E as ee,Ea as Ee,Fa as dt,G as Pe,I as ue,N as Y,O as B,T as Te,aa as nt,d as F,e as et,f as fe,g as de,h as Ye,i as Qe,k as tt,l as K,m as Xe,n as $e,o as it,oa as lt,p as _e,q as V,r as st,s as at,sa as ct,t as ot,v as rt,y as X,ya as ht}from"./chunk-BUIVYQYF.js";var te={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var we=class extends G{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof B?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Y.clone(e.uniforms),this.material=new B({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ee(this.material)}render(e,t,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var pe=class extends G{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,o){let i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,r;this.inverse?(a=0,r=1):(a=1,r=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(r),s.buffers.stencil.setLocked(!0),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}},De=class extends G{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Re=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let o=e.getSize(new X);this._width=o.width,this._height=o.height,t=new $(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:V}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new we(te),this.copyPass.material.blending=F,this.clock=new ht}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),o=!1;for(let i=0,s=this.passes.length;i<s;i++){let a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,o),a.needsSwap){if(o){let r=this.renderer.getContext(),S=this.renderer.state.buffers.stencil;S.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),S.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}pe!==void 0&&(a instanceof pe?o=!0:a instanceof De&&(o=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new X);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let o=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(o,i),this.renderTarget2.setSize(o,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(o,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var ye=class extends G{constructor(e,t,o=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=o,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Pe}render(e,t,o){let i=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:o),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}};var me={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new X},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new ee},cameraProjectionMatrixInverse:{value:new ee},cameraWorldMatrix:{value:new ee},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new J(-1,-1,-1)},sceneBoxMax:{value:new J(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},ve={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Ce={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function ut(p=5){let e=Math.floor(p)%2===0?Math.floor(p)+1:Math.floor(p),t=St(e),o=t.length,i=new Uint8Array(o*4);for(let a=0;a<o;++a){let r=t[a],S=2*Math.PI*r/o,u=new J(Math.cos(S),Math.sin(S),0).normalize();i[a*4]=(u.x*.5+.5)*255,i[a*4+1]=(u.y*.5+.5)*255,i[a*4+2]=127,i[a*4+3]=255}let s=new Te(i,e,e);return s.wrapS=K,s.wrapT=K,s.needsUpdate=!0,s}function St(p){let e=Math.floor(p)%2===0?Math.floor(p)+1:Math.floor(p),t=e*e,o=Array(t).fill(0),i=Math.floor(e/2),s=e-1;for(let a=1;a<=t;){if(i===-1&&s===e?(s=e-2,i=0):(s===e&&(s=0),i<0&&(i=e-1)),o[i*e+s]!==0){s-=2,i++;continue}else o[i*e+s]=a++;s++,i--}return o}var ge={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Ke(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new X},cameraProjectionMatrixInverse:{value:new ee},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function Ke(p,e,t){let o=Mt(p,e,t),i="vec3[SAMPLES](";for(let s=0;s<p;s++){let a=o[s];i+=`vec3(${a.x}, ${a.y}, ${a.z})${s<p-1?",":")"}`}return i}function Mt(p,e,t){let o=[];for(let i=0;i<p;i++){let s=2*Math.PI*e*i/p,a=Math.pow(i/(p-1),t);o.push(new J(Math.cos(s),Math.sin(s),a))}return o}var be=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let o,i,s,a=.5*(Math.sqrt(3)-1),r=(e+t)*a,S=Math.floor(e+r),u=Math.floor(t+r),U=(3-Math.sqrt(3))/6,I=(S+u)*U,O=S-I,E=u-I,C=e-O,A=t-E,N,b;C>A?(N=1,b=0):(N=0,b=1);let P=C-N+U,T=A-b+U,x=C-1+2*U,w=A-1+2*U,D=S&255,_=u&255,n=this.perm[D+this.perm[_]]%12,l=this.perm[D+N+this.perm[_+b]]%12,c=this.perm[D+1+this.perm[_+1]]%12,h=.5-C*C-A*A;h<0?o=0:(h*=h,o=h*h*this._dot(this.grad3[n],C,A));let f=.5-P*P-T*T;f<0?i=0:(f*=f,i=f*f*this._dot(this.grad3[l],P,T));let m=.5-x*x-w*w;return m<0?s=0:(m*=m,s=m*m*this._dot(this.grad3[c],x,w)),70*(o+i+s)}noise3d(e,t,o){let i,s,a,r,u=(e+t+o)*.3333333333333333,U=Math.floor(e+u),I=Math.floor(t+u),O=Math.floor(o+u),E=1/6,C=(U+I+O)*E,A=U-C,N=I-C,b=O-C,P=e-A,T=t-N,x=o-b,w,D,_,n,l,c;P>=T?T>=x?(w=1,D=0,_=0,n=1,l=1,c=0):P>=x?(w=1,D=0,_=0,n=1,l=0,c=1):(w=0,D=0,_=1,n=1,l=0,c=1):T<x?(w=0,D=0,_=1,n=0,l=1,c=1):P<x?(w=0,D=1,_=0,n=0,l=1,c=1):(w=0,D=1,_=0,n=1,l=1,c=0);let h=P-w+E,f=T-D+E,m=x-_+E,d=P-n+2*E,g=T-l+2*E,v=x-c+2*E,z=P-1+3*E,H=T-1+3*E,M=x-1+3*E,R=U&255,k=I&255,y=O&255,L=this.perm[R+this.perm[k+this.perm[y]]]%12,Q=this.perm[R+w+this.perm[k+D+this.perm[y+_]]]%12,Se=this.perm[R+n+this.perm[k+l+this.perm[y+c]]]%12,Me=this.perm[R+1+this.perm[k+1+this.perm[y+1]]]%12,j=.6-P*P-T*T-x*x;j<0?i=0:(j*=j,i=j*j*this._dot3(this.grad3[L],P,T,x));let W=.6-h*h-f*f-m*m;W<0?s=0:(W*=W,s=W*W*this._dot3(this.grad3[Q],h,f,m));let Z=.6-d*d-g*g-v*v;Z<0?a=0:(Z*=Z,a=Z*Z*this._dot3(this.grad3[Se],d,g,v));let q=.6-z*z-H*H-M*M;return q<0?r=0:(q*=q,r=q*q*this._dot3(this.grad3[Me],z,H,M)),32*(i+s+a+r)}noise4d(e,t,o,i){let s=this.grad4,a=this.simplex,r=this.perm,S=(Math.sqrt(5)-1)/4,u=(5-Math.sqrt(5))/20,U,I,O,E,C,A=(e+t+o+i)*S,N=Math.floor(e+A),b=Math.floor(t+A),P=Math.floor(o+A),T=Math.floor(i+A),x=(N+b+P+T)*u,w=N-x,D=b-x,_=P-x,n=T-x,l=e-w,c=t-D,h=o-_,f=i-n,m=l>c?32:0,d=l>h?16:0,g=c>h?8:0,v=l>f?4:0,z=c>f?2:0,H=h>f?1:0,M=m+d+g+v+z+H,R=a[M][0]>=3?1:0,k=a[M][1]>=3?1:0,y=a[M][2]>=3?1:0,L=a[M][3]>=3?1:0,Q=a[M][0]>=2?1:0,Se=a[M][1]>=2?1:0,Me=a[M][2]>=2?1:0,j=a[M][3]>=2?1:0,W=a[M][0]>=1?1:0,Z=a[M][1]>=1?1:0,q=a[M][2]>=1?1:0,Je=a[M][3]>=1?1:0,Ne=l-R+u,Ue=c-k+u,Le=h-y+u,Ie=f-L+u,ze=l-Q+2*u,Ve=c-Se+2*u,Oe=h-Me+2*u,Fe=f-j+2*u,ke=l-W+3*u,Be=c-Z+3*u,Ge=h-q+3*u,He=f-Je+3*u,je=l-1+4*u,We=c-1+4*u,Ze=h-1+4*u,qe=f-1+4*u,ie=N&255,se=b&255,ae=P&255,oe=T&255,pt=r[ie+r[se+r[ae+r[oe]]]]%32,mt=r[ie+R+r[se+k+r[ae+y+r[oe+L]]]]%32,vt=r[ie+Q+r[se+Se+r[ae+Me+r[oe+j]]]]%32,gt=r[ie+W+r[se+Z+r[ae+q+r[oe+Je]]]]%32,xt=r[ie+1+r[se+1+r[ae+1+r[oe+1]]]]%32,re=.6-l*l-c*c-h*h-f*f;re<0?U=0:(re*=re,U=re*re*this._dot4(s[pt],l,c,h,f));let ne=.6-Ne*Ne-Ue*Ue-Le*Le-Ie*Ie;ne<0?I=0:(ne*=ne,I=ne*ne*this._dot4(s[mt],Ne,Ue,Le,Ie));let le=.6-ze*ze-Ve*Ve-Oe*Oe-Fe*Fe;le<0?O=0:(le*=le,O=le*le*this._dot4(s[vt],ze,Ve,Oe,Fe));let ce=.6-ke*ke-Be*Be-Ge*Ge-He*He;ce<0?E=0:(ce*=ce,E=ce*ce*this._dot4(s[gt],ke,Be,Ge,He));let he=.6-je*je-We*We-Ze*Ze-qe*qe;return he<0?C=0:(he*=he,C=he*he*this._dot4(s[xt],je,We,Ze,qe)),27*(U+I+O+E+C)}_dot(e,t,o){return e[0]*t+e[1]*o}_dot3(e,t,o,i){return e[0]*t+e[1]*o+e[2]*i}_dot4(e,t,o,i,s){return e[0]*t+e[1]*o+e[2]*i+e[3]*s}};var xe=class p extends G{constructor(e,t,o=512,i=512,s,a,r){super(),this.width=o,this.height=i,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=ut(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new $(this.width,this.height,{type:V}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new B({defines:Object.assign({},me.defines),uniforms:Y.clone(me.uniforms),vertexShader:me.vertexShader,fragmentShader:me.fragmentShader,blending:F,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new lt,this.normalMaterial.blending=F,this.pdMaterial=new B({defines:Object.assign({},ge.defines),uniforms:Y.clone(ge.uniforms),vertexShader:ge.vertexShader,fragmentShader:ge.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new B({defines:Object.assign({},ve.defines),uniforms:Y.clone(ve.uniforms),vertexShader:ve.vertexShader,fragmentShader:ve.fragmentShader,blending:F}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new B({uniforms:Y.clone(te.uniforms),vertexShader:te.vertexShader,fragmentShader:te.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Qe,blendDst:de,blendEquation:fe,blendSrcAlpha:Ye,blendDstAlpha:de,blendEquationAlpha:fe}),this.blendMaterial=new B({uniforms:Y.clone(Ce.uniforms),vertexShader:Ce.vertexShader,fragmentShader:Ce.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:et,blendSrc:Qe,blendDst:de,blendEquation:fe,blendSrcAlpha:Ye,blendDstAlpha:de,blendEquationAlpha:fe}),this._fsQuad=new Ee(null),this._originalClearColor=new Pe,this.setGBuffer(s?s.depthTexture:void 0,s?s.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),r!==void 0&&this.updatePdMaterial(r)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new nt,this.depthTexture.format=ot,this.depthTexture.type=st,this.normalRenderTarget=new $(this.width,this.height,{minFilter:Xe,magFilter:Xe,type:V,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let o=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=o,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=o,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Ke(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,o){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case p.OUTPUT.Off:break;case p.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=o.texture,this.copyMaterial.blending=F,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case p.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=F,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case p.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=F,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case p.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case p.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=F,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case p.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=o.texture,this.copyMaterial.blending=F,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}_renderPass(e,t,o,i,s){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),r=e.autoClear;e.setRenderTarget(o),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(s||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=r,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,o,i,s){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),r=e.autoClear;e.setRenderTarget(o),e.autoClear=!1,i=t.clearColor||i,s=t.clearAlpha||s,i!=null&&(e.setClearColor(i),e.setClearAlpha(s||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=r,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(o){(o.isPoints||o.isLine||o.isLine2)&&o.visible&&(o.visible=!1,t.push(o))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new be,o=e*e*4,i=new Uint8Array(o);for(let a=0;a<e;a++)for(let r=0;r<e;r++){let S=a,u=r;i[(a*e+r)*4]=(t.noise(S,u)*.5+.5)*255,i[(a*e+r)*4+1]=(t.noise(S+e,u)*.5+.5)*255,i[(a*e+r)*4+2]=(t.noise(S,u+e)*.5+.5)*255,i[(a*e+r)*4+3]=(t.noise(S+e,u+e)*.5+.5)*255}let s=new Te(i,e,e,at,it);return s.wrapS=K,s.wrapT=K,s.needsUpdate=!0,s}};xe.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var Ae=class extends ct{constructor(e){super(e),this.type=V}parse(e){let a=function(n,l){switch(n){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(l||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(l||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(l||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(l||""))}},I=function(n,l,c){l=l||1024;let f=n.pos,m=-1,d=0,g="",v=String.fromCharCode.apply(null,new Uint16Array(n.subarray(f,f+128)));for(;0>(m=v.indexOf(`
`))&&d<l&&f<n.byteLength;)g+=v,d+=v.length,f+=128,v+=String.fromCharCode.apply(null,new Uint16Array(n.subarray(f,f+128)));return-1<m?(c!==!1&&(n.pos+=d+m+1),g+v.slice(0,m)):!1},O=function(n){let l=/^#\?(\S+)/,c=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,h=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,f=/^\s*FORMAT=(\S+)\s*$/,m=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,d={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},g,v;for((n.pos>=n.byteLength||!(g=I(n)))&&a(1,"no header found"),(v=g.match(l))||a(3,"bad initial token"),d.valid|=1,d.programtype=v[1],d.string+=g+`
`;g=I(n),g!==!1;){if(d.string+=g+`
`,g.charAt(0)==="#"){d.comments+=g+`
`;continue}if((v=g.match(c))&&(d.gamma=parseFloat(v[1])),(v=g.match(h))&&(d.exposure=parseFloat(v[1])),(v=g.match(f))&&(d.valid|=2,d.format=v[1]),(v=g.match(m))&&(d.valid|=4,d.height=parseInt(v[1],10),d.width=parseInt(v[2],10)),d.valid&2&&d.valid&4)break}return d.valid&2||a(3,"missing format specifier"),d.valid&4||a(3,"missing image size specifier"),d},E=function(n,l,c){let h=l;if(h<8||h>32767||n[0]!==2||n[1]!==2||n[2]&128)return new Uint8Array(n);h!==(n[2]<<8|n[3])&&a(3,"wrong scanline width");let f=new Uint8Array(4*l*c);f.length||a(4,"unable to allocate buffer space");let m=0,d=0,g=4*h,v=new Uint8Array(4),z=new Uint8Array(g),H=c;for(;H>0&&d<n.byteLength;){d+4>n.byteLength&&a(1),v[0]=n[d++],v[1]=n[d++],v[2]=n[d++],v[3]=n[d++],(v[0]!=2||v[1]!=2||(v[2]<<8|v[3])!=h)&&a(3,"bad rgbe scanline format");let M=0,R;for(;M<g&&d<n.byteLength;){R=n[d++];let y=R>128;if(y&&(R-=128),(R===0||M+R>g)&&a(3,"bad scanline data"),y){let L=n[d++];for(let Q=0;Q<R;Q++)z[M++]=L}else z.set(n.subarray(d,d+R),M),M+=R,d+=R}let k=h;for(let y=0;y<k;y++){let L=0;f[m]=z[y+L],L+=h,f[m+1]=z[y+L],L+=h,f[m+2]=z[y+L],L+=h,f[m+3]=z[y+L],m+=4}H--}return f},C=function(n,l,c,h){let f=n[l+3],m=Math.pow(2,f-128)/255;c[h+0]=n[l+0]*m,c[h+1]=n[l+1]*m,c[h+2]=n[l+2]*m,c[h+3]=1},A=function(n,l,c,h){let f=n[l+3],m=Math.pow(2,f-128)/255;c[h+0]=ue.toHalfFloat(Math.min(n[l+0]*m,65504)),c[h+1]=ue.toHalfFloat(Math.min(n[l+1]*m,65504)),c[h+2]=ue.toHalfFloat(Math.min(n[l+2]*m,65504)),c[h+3]=ue.toHalfFloat(1)},N=new Uint8Array(e);N.pos=0;let b=O(N),P=b.width,T=b.height,x=E(N.subarray(N.pos),P,T),w,D,_;switch(this.type){case _e:_=x.length/4;let n=new Float32Array(_*4);for(let c=0;c<_;c++)C(x,c*4,n,c*4);w=n,D=_e;break;case V:_=x.length/4;let l=new Uint16Array(_*4);for(let c=0;c<_;c++)A(x,c*4,l,c*4);w=l,D=V;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:P,height:T,data:w,header:b.string,gamma:b.gamma,exposure:b.exposure,type:D}}setDataType(e){return this.type=e,this}load(e,t,o,i){function s(a,r){switch(a.type){case _e:case V:a.colorSpace=rt,a.minFilter=$e,a.magFilter=$e,a.generateMipmaps=!1,a.flipY=!0;break}t&&t(a,r)}return super.load(e,s,o,i)}};function ti(p,e,t){let o=new $(1,1,{type:V}),i=new Re(p,o);i.setPixelRatio(1);let s=new ye(e,t),a=new xe(e,t,1,1,void 0,{radius:.5,thickness:.7,scale:1.5}),r=new dt;return a.blendIntensity=.7,i.addPass(s),i.addPass(a),i.addPass(r),{render:S=>i.render(S),resize:(S,u)=>i.setSize(S,u),dispose(){a.dispose(),r.dispose(),i.dispose()}}}async function ii(p){let e=await new Ae().loadAsync("./assets/textures/environment.hdr");e.mapping=tt;let t=new ft(p),o=t.fromEquirectangular(e).texture;return t.dispose(),{background:e,environment:o}}export{ti as createDetailedRenderer,ii as detailedEnvironment};
