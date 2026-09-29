export function remainingDirt(pixels,width,height){
 const cells=8,bins=Array.from({length:cells*cells},()=>({mass:0,x:0,y:0}));let mass=0;
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){const a=pixels[(y*width+x)*4+3];if(!a)continue;mass+=a;const b=bins[Math.min(cells-1,Math.floor(y/height*cells))*cells+Math.min(cells-1,Math.floor(x/width*cells))];b.mass+=a;b.x+=(x+.5)*a;b.y+=(y+.5)*a;}
 const best=bins.reduce((a,b)=>b.mass>a.mass?b:a,bins[0]);
 return {mass,point:best.mass?{u:best.x/best.mass/width,v:1-best.y/best.mass/height}:null};
}
export function cleanProgress(mass,initial){return initial>0?Math.max(0,Math.min(1,1-mass/initial)):1;}
