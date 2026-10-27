import{fileURLToPath,pathToFileURL}from'node:url';import fs from'node:fs/promises';import path from'node:path';import assert from'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');const dir=path.join(root,'.runtime','中文 目录');await fs.mkdir(dir,{recursive:true});
const target=path.join(dir,'index.html');await fs.writeFile(target,'fixture');const url=pathToFileURL(target);
assert.equal(fileURLToPath(url),target);assert.equal(await fs.readFile(fileURLToPath(url),'utf8'),'fixture');
const regex=/\{\r?\n\s+id: '([^']+)',[\s\S]*?\r?\n\s+\}/g;
const source="{\n  id: 'fixture',\n  value: 1,\n  }";
assert.equal([...source.matchAll(regex)].length,1);assert.equal([...source.replaceAll('\n','\r\n').matchAll(regex)].length,1);
console.log(JSON.stringify({url_path_decoded:true,lf:true,crlf:true,os:process.platform}));
