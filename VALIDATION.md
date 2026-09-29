# Tablet and controls update — 2026-09-29

## Kitchen clarity, larger UI, liquid animation and GitHub deployment

- At 1280×800, the glass is visible as bright edged shards inside an orange ring. The locator reports distance and clicking it nearby resolves the hazard: kitchen progress changed from 10% to 20% and the safety task became complete.
- At 1024×600, all six tool buttons fit: 98px wide, 67.5px high, 16px labels; the task panel uses 17px text. At 1280×800, buttons are 110×88px with 18px labels and 38px icons.
- Browser verified a tilted PET bottle with a continuous liquid stream, droplets and basin ripples; on completion the carried item changed to clean/prepared. The animation no longer emits square point sprites.
- A circular `userData.action.object` cloning error found during browser QA was fixed with a visual-only clone and added to `test-rinsing.mjs`. Subsequent run completed without new errors.
- All four container types passed pour/rinse ordering, zero-delta pause, finite geometry and one-shot completion tests. Rule, tablet and mouse checks also passed.
- Local QA served under `/tidy-house-lab/`, matching GitHub Pages' project subpath. Fixtures lived on a separate local port and are excluded from the repository and deployment.
- `.github/workflows/pages.yml` installs locked dependencies, checks game logic, builds and publishes only `dist/`.

## Mouse edge follow-up

- Mouse look gain is now 1.3× in both pointer-lock and unlocked modes. Walking and touch look speeds are unchanged.
- `node test-mouse.mjs` passed: gain, left/right direction, a full rotation with a stationary edge pointer, neutral aiming and disabled/outside-canvas conditions.
- In-app browser confirmed pointer lock unavailable. After releasing the mouse at either inner edge, the camera kept rotating; returning to the center stopped it. Pausing during edge rotation cleared the cue and held the camera steady.
- In touch mode, a 632-pixel swipe still rotated exactly 2.528 radians (0.004 rad/pixel) and did not activate edge assistance.
- The `game-status` DOM output now reports mouse gain, actual pointer-lock state and active edge direction for reproducible checks. Native locked input still needs verification in a browser that grants pointer lock; its gain uses the same tested multiplier.

## Automated checks

- `node test-rules.mjs`: 12 sorting, doorway and collision assertions passed.
- `node test-tablet.mjs`: seeded contract persistence, changed layouts, unique item pads, legacy placement, rain scenario, tablet pixel budgets and residual-dirt coordinates passed.
- Browser Canvas2D regression (`test-cleaning-browser.js`): all four real dirt masks reached 100% while holding the same previously cleaned spot after 80%. Dust 2.0 s, mud 1.2 s, soap 2.1 s, grease 2.3 s in deterministic simulated cleaning time. Save/reload checks passed. This is cleaning logic timing, not hardware performance.
- Production bundle built with esbuild; test-page bundles were removed before publication.

## Browser interaction checks

- Removed title copy and enlarged steps/rooms; game HUD hidden behind the title.
- Touch-drag changes view; joystick moved the player; separate use/clean controls fit the tested landscape viewport settings (1280×800 and 1024×600, with browser chrome reducing available content height).
- Picking up a notebook and pressing clean drops it at the player's feet and selects the previous cleaning tool. The notebook remains available to pick up later.
- Mouse wheel moves forward/backward through tools. The mousemove handler no longer requires a held button; physical tablet/pointer-lock behavior still needs device verification.
- Opened an actual furnished overhead map, verified title and doubled type scale, and returned to gameplay.
- Changed to the rain contract, verified changed object positions, reloaded and compared the same saved contract/positions.
- Walked to the bedroom window, ventilated, selected the duster, and cleaned desk dust from 0% to completion. The checklist advanced to 1/3 dry areas and the patch disappeared.
- No runtime errors in the inspected updated session.

## Performance limits

No physical Helio G99 device was connected. 30 fps is a target/cap for Auto and Low, not a measured guarantee. Auto uses at most a 1280-pixel long edge / 1 million pixels, lite textures (~320 KB), batched static scenery, instanced bristles and no dynamic shadow/AO/HDR/mirror pass. Low reduces the buffer further. A one-shot map render releases its targets after reading the image and falls back to byte textures when float render targets are unavailable.
