// Builds assets-source/logos/elian.svg: Elian Partners' diamond mark (their logo.svg) + the
// "Elian Partners" wordmark outlined in Cormorant Garamond (the font on elianpartners.com), as one SVG.
// Run: node scripts/build-elian-logo.mjs   (then `npm run images`)
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fontFile = path.join(
  root,
  'node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff',
);
const buf = await readFile(fontFile);
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

const size = 34;
const textPath = font.getPath('Elian Partners', 0, 0, size, {
  letterSpacing: 0.02,
  kerning: false,
  features: { liga: false },
});
const box = textPath.getBoundingBox();
const markSize = 40;
const gap = 12;
const textX = markSize + gap - box.x1;
const baseline = markSize / 2 - (box.y1 + box.y2) / 2; // vertically center the glyph box on the mark
const width = Math.ceil(textX + box.x2 + 2);
const d = font
  .getPath('Elian Partners', textX, baseline, size, {
    letterSpacing: 0.02,
    kerning: false,
    features: { liga: false },
  })
  .toPathData(2);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${markSize}" viewBox="0 0 ${width} ${markSize}">
<g transform="scale(${markSize / 60})"><polygon points="25,10 45,30 25,50 5,30" fill="none" stroke="#1a2f47" stroke-width="1.8"/><polygon points="35,10 55,30 35,50 15,30" fill="none" stroke="#8b7355" stroke-width="1.8"/></g>
<path d="${d}" fill="#1a2f47"/>
</svg>
`;
await writeFile(path.join(root, 'assets-source/logos/elian.svg'), svg);
console.log('elian.svg', width + 'x' + markSize);
