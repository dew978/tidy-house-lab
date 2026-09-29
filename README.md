# 우리집 새로고침 · First Person 3D

2022 개정 실과 [6실02-10]을 연결한 1인칭 생활 공간 관리 게임. Three.js, WebGL 2, 정적 웹 배포.

제작: 삼대710

## GitHub Pages

Play: https://dew978.github.io/tidy-house-lab/

The `main` branch builds and publishes `dist/` through `.github/workflows/pages.yml`. Repository Settings → Pages → Source must be **GitHub Actions**. All game asset paths are relative, including the optional high-quality renderer, so the repository subpath is supported. Only static output is published; source files and test fixtures are not part of the web deployment.

The new address has separate browser storage from the previous preview address. Previous progress is not automatically transferred. Players do not need GitHub accounts.

## Kitchen interaction update

Broken glass has brighter edged shards, an orange floor ring, a larger interaction area, and a distance-labelled locator. In the kitchen, tap the locator to look toward the glass; within 2.8 metres, tap it to request adult help. E/use while aiming at the shards also works. The guide disappears once the hazard is resolved, including after reload.

The task panel and right-side tools have larger text and icons. Six tools remain visible on tablet landscape screens; shorter screens use compact controls and overflow scrolling.

At the sink, the carried container tilts, its contents flow in a continuous stream with round splash droplets and ripples, then it is rinsed with water. Preparation commits only after the 4.8-second animation, which pauses with gameplay. `node test-rinsing.mjs` checks phase order, pause, safe cloning of interactive objects and completion for four container types.

## Run and build

Serve `dist/` on a static web server. Opening `index.html` with the file protocol is not supported.

Install Node.js and pnpm. Run `pnpm install --frozen-lockfile`, then `pnpm build`. Keep `dist/assets/` in place: the build bundles scripts and copies HTML/CSS without replacing the included assets.

Run `node test-rules.mjs` for sorting and collision assertions and `node test-tablet.mjs` for deterministic contract layouts, render budgets and remaining-dirt detection. `test-cleaning-browser.js`, when bundled with esbuild into a test page containing an `output` element, checks the real Canvas2D cleaning masks, save/reload and same-point completion after 80% for all four dirt kinds. Keep test pages out of the published assets.

## Controls and storage

WASD move · mouse movement or arrows look · E interact · R separate label/pump · Q put down · wheel/1–6 select tools · hold click/Space clean · M map · H dirt guides · Esc pause. Mouse look works without holding a button, including the unlocked fallback when pointer lock is unavailable.

Mouse sensitivity is 1.3× the previous value in both locked and unlocked modes; touch sensitivity is unchanged. Start/resume and canvas clicks request pointer lock. If an embedded browser refuses it, the inner 32-pixel left/right edge strips allow continuous turning. Returning to the center, hovering a menu, leaving the canvas or pausing stops that assistance. `node test-mouse.mjs` covers gain, edge direction, full rotations and stop conditions. Pointer-lock behavior reference: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API).

Tablets use the left joystick, touch-drag look, right vertical tool list and separate use/clean buttons. Input is automatically detected and can be explicitly selected in the pause menu. Selecting a cleaning tool or pressing clean while carrying puts the item down and resumes cleaning.

Gold overlays mark remaining dirt. Above 80%, holding the appropriate tool also cleans the strongest residue; surfaces finish at 92% measured alpha removal. Ventilation, safety, dry-before-wet and tool rules still apply. The house map is a one-shot overhead render of the actual furniture, with enlarged text and a player marker.

Three repeatable contracts reuse the same house: weekend, cooking and rain. A new round changes item/dirt placement; deterministic seeds preserve that arrangement on reload. Completion counts are stored locally under `home-care-3d-v1-profile`.

## Tablet rendering

Auto (default) targets 30 fps, caps the render buffer at 1 million pixels and a 1280-pixel long edge, and steps resolution down on sustained slow frames. Low uses 1024 pixels / 650k pixels. Both omit dynamic shadows, SSAO, HDR and mirror rendering. High is an optional 60-fps target for PCs, loaded separately. Paused/background rendering is reduced or stopped.

The lite texture set is about 320 KB (512-pixel material maps and garden background). Static scenery is batched into shared draws, brush bristles use instancing, and progress masks are 96×96. These are workload reductions, not a measured Helio G99 frame-rate guarantee. This release was inspected in a desktop browser at 1280×800 and 1024×600 viewport settings; no physical G99 tablet was available.

Progress stays in localStorage (`home-care-3d-v1`). No backend, student account, ranking or telemetry. A system-font fallback is used if the optional Google Fonts stylesheet is unavailable.

## Assets

Three.js MIT license: `dist/assets/THREE-LICENSE.txt`. CC0 texture/HDR provenance: `dist/assets/textures/credits.json`. All gameplay textures are bundled. The home and tools are original procedural geometry; no House Flipper game assets are used.
