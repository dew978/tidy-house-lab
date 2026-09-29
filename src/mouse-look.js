export const MOUSE_GAIN=1.3;
export const LOCKED_MOUSE_SENSITIVITY=.0022*MOUSE_GAIN;
export const FREE_MOUSE_SENSITIVITY=.003*MOUSE_GAIN;

// Pointer lock is unavailable in some embedded browsers. A narrow strip inside
// either edge lets the player keep turning without pressing or dragging.
// Leaving the canvas, pausing, touch input and pointer lock disable this aid.
export function edgeTurnSpeed(pointer,width,enabled=true){
 if(!enabled||!pointer||!Number.isFinite(pointer.x)||width<=0||pointer.x<0||pointer.x>width)return 0;
 const band=Math.min(32,width*.05);
 const left=Math.max(0,1-pointer.x/band),right=Math.max(0,1-(width-pointer.x)/band);
 return (left-right)*1.1*MOUSE_GAIN;
}
