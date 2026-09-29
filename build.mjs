import { build } from 'esbuild';
import { copyFile, mkdir, readdir, unlink } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
const result=await build({entryPoints:['src/main.js'], bundle:true, minify:true, sourcemap:false, target:['es2020'], outdir:'dist',entryNames:'game3d',chunkNames:'chunks/[name]-[hash]',splitting:true,format:'esm',metafile:true});
for(const file of await readdir('dist/chunks'))if(file.endsWith('.js')&&!result.metafile.outputs['dist/chunks/'+file])await unlink('dist/chunks/'+file);
await copyFile('src/index.html','dist/index.html');
await copyFile('src/style.css','dist/style.css');
console.log('3D game built.');
