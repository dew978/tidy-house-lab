export const MOUSE_GAIN=1.3;
// Radians per mouse pixel so the scene at the screen centre moves MOUSE_GAIN
// pixels for every pixel the mouse moves (100 → 130), whatever the resolution.
export function mouseSensitivity(viewHeight,fovDegrees){const focal=Math.max(1,viewHeight)/2/Math.tan(fovDegrees*Math.PI/360);return Math.atan(100*MOUSE_GAIN/focal)/100;}

// Pointer lock is unavailable in some embedded browsers. A narrow strip inside
// either edge lets the player keep turning without pressing or dragging.
// Leaving the canvas, pausing, touch input and pointer lock disable this aid.
export function edgeTurnSpeed(pointer,width,enabled=true){
 if(!enabled||!pointer||!Number.isFinite(pointer.x)||width<=0||pointer.x<0||pointer.x>width)return 0;
 const band=Math.min(32,width*.05);
 const left=Math.max(0,1-pointer.x/band),right=Math.max(0,1-(width-pointer.x)/band);
 return (left-right)*1.1*MOUSE_GAIN;
}
