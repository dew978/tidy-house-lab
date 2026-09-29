import assert from 'node:assert/strict';
import { MOUSE_GAIN,mouseSensitivity,edgeTurnSpeed } from './src/mouse-look.js';
assert.equal(MOUSE_GAIN,1.3);
for(const [height,fov] of [[720,67],[800,67],[1080,67],[1440,60]]){
 // Project the turned view back to screen pixels: 100 px of mouse must move the centre 130 px.
 const focal=height/2/Math.tan(fov*Math.PI/360),moved=focal*Math.tan(100*mouseSensitivity(height,fov));
 assert.ok(Math.abs(moved-130)<1e-6,`100 px of mouse must move the view about 130 px (got ${moved.toFixed(1)} at ${height}px)`);
}
for(const width of [768,1024,1920]){
 assert.equal(edgeTurnSpeed({x:width/2},width),0,'Normal aiming must not drift');
 assert.ok(edgeTurnSpeed({x:1},width)>0,'Left edge must turn left');
 assert.ok(edgeTurnSpeed({x:width-1},width)<0,'Right edge must turn right');
 const stationaryTurn=Array.from({length:300},()=>edgeTurnSpeed({x:width-1},width)/60).reduce((a,b)=>a+b,0);
 assert.ok(stationaryTurn<-Math.PI*2,'A stationary pointer at the edge must allow a complete rotation');
 assert.equal(edgeTurnSpeed({x:width-1},width,false),0,'Locked/touch/paused modes disable edge assistance');
 assert.equal(edgeTurnSpeed(null,width),0,'Leaving the canvas must stop turning');
 assert.equal(edgeTurnSpeed({x:width+1},width),0,'A pointer outside the browser must not cause drift');
}
console.log('Mouse gain 1.3×, continuous edge turning, neutral aiming and stop conditions passed.');
