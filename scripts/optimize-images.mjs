// Builds responsive WebP variants from the originals in assets-source/ into apps/web/public/images,
// and writes apps/web/src/lib/images.generated.ts (name -> intrinsic size + available widths).
// Run: npm run images
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'assets-source/wp-media');
const outDir = path.join(root, 'apps/web/public/images');

/** name -> original file in assets-source/wp-media. Alt texts live in the i18n files (`images.<name>`). */
const IMAGES = {
  'hero-portrait': 'home-1.webp',
  'portrait-headshot': 'DSC00634-edit-scaled-1-e1769352168338.webp',
  'portrait-leaning': 'IMG_2459.webp',
  'portrait-armchair': 'IMG_3349-1.webp',
  'desk-notebook': 'IMG_2138-1.webp',
  'working-laptop': 'photo-2.webp',
  'mentoring-session': 'photo-4.webp',
  'marble-table': 'photo-blog.webp',
  'certificate-emcc': 'PHOTO-2024-02-14-17-55-18-1.webp',
  'forbes-cover': 'forbes-cover-clean.jpg',
  'forbes-life-cover': 'forbes-life-cover.jpg',
  'studio-stool': 'forbes-studio-fullbody.jpg',
  'pro-medium': 'pro-medium.jpg',
  'pro-closeup': 'pro-closeup.jpg',
  'pro-dark': 'pro-cowboy.jpg',
  'event-fullbody': 'fbn-fullbody.jpeg',
  'event-audience': 'forbes-audience.jpeg',
  'event-mic': 'forbes-closeup.jpeg',
  'event-stage': 'forbes-stage.jpeg',
  'library-chairs': 'knowledge-library.jpeg',
};

const WIDTHS = [480, 800, 1200, 1600];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const manifest = {};
for (const [name, file] of Object.entries(IMAGES)) {
  const input = path.join(srcDir, file);
  const { width, height } = await sharp(input).metadata();
  // Never upscale: use the widths below the original, plus the original width itself.
  const widths = [
    ...new Set([...WIDTHS.filter((w) => w < width), width > 1600 ? 1600 : width]),
  ].sort((a, b) => a - b);
  for (const w of widths) {
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(outDir, `${name}-${w}.webp`));
  }
  const largest = widths[widths.length - 1];
  manifest[name] = { width: largest, height: Math.round((height * largest) / width), widths };
  console.log(name.padEnd(20), `${width}x${height}`, '->', widths.join(', '));
}

// ---- Partner / accreditation logos (assets-source/logos) -> apps/web/public/logos ----
const LOGO_DIR = path.join(root, 'assets-source/logos');
const LOGO_OUT = path.join(root, 'apps/web/public/logos');
/** name -> source file. PNGs are trimmed and stored as lossless WebP; SVGs are copied as-is (checked: no scripts). */
const LOGOS = {
  forbes: 'forbes-ro-black.svg',
  zf: 'zf-ziarul-financiar.png',
  emcc: 'emcc-global.png',
  ffi: 'ffi-wikimedia.png',
  elian: 'elian.svg',
};

await rm(LOGO_OUT, { recursive: true, force: true });
await mkdir(LOGO_OUT, { recursive: true });
const logoManifest = {};
for (const [name, file] of Object.entries(LOGOS)) {
  const input = path.join(LOGO_DIR, file);
  if (file.endsWith('.svg')) {
    const svg = await readFile(input, 'utf8');
    if (/<script|\son\w+=|javascript:/i.test(svg))
      throw new Error(`${file} contains active content`);
    const { width, height } = await sharp(input).metadata();
    await copyFile(input, path.join(LOGO_OUT, `${name}.svg`));
    logoManifest[name] = { src: `/logos/${name}.svg`, width, height };
  } else {
    // Trim transparent margins and cap the width at 640px (logos are shown at <= 64px tall).
    const trimmed = await sharp(await sharp(input).trim().toBuffer())
      .resize({ width: 640, withoutEnlargement: true })
      .toBuffer();
    const { width, height } = await sharp(trimmed).metadata();
    await sharp(trimmed)
      .webp({ lossless: true })
      .toFile(path.join(LOGO_OUT, `${name}.webp`));
    logoManifest[name] = { src: `/logos/${name}.webp`, width, height };
  }
  console.log(name.padEnd(20), logoManifest[name].width + 'x' + logoManifest[name].height);
}

// ---- Blog images (assets-source/blog, from scripts/import-blog.mjs) -> apps/web/public/blog ----
const BLOG_DIR = path.join(root, 'assets-source/blog');
const BLOG_OUT = path.join(root, 'apps/web/public/blog');
await rm(BLOG_OUT, { recursive: true, force: true });
await mkdir(BLOG_OUT, { recursive: true });
const blogManifest = {};
for (const file of (await readdir(BLOG_DIR).catch(() => [])).sort()) {
  if (!/\.(webp|jpe?g|png)$/i.test(file)) continue;
  const id = file.replace(/\.[^.]+$/, '');
  const input = path.join(BLOG_DIR, file);
  const { width, height } = await sharp(input).metadata();
  const widths = [
    ...new Set([...[480, 800, 1200].filter((w) => w < width), Math.min(width, 1200)]),
  ].sort((a, b) => a - b);
  for (const w of widths) {
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(BLOG_OUT, `${id}-${w}.webp`));
  }
  const largest = widths[widths.length - 1];
  blogManifest[id] = { width: largest, height: Math.round((height * largest) / width), widths };
}
console.log('blog images'.padEnd(20), Object.keys(blogManifest).length);

const ts = `// Generated by scripts/optimize-images.mjs. Do not edit.
export const IMAGE_MANIFEST = ${JSON.stringify(manifest, null, 2)} as const;

export type ImageName = keyof typeof IMAGE_MANIFEST;

export const LOGO_MANIFEST = ${JSON.stringify(logoManifest, null, 2)} as const;

export type LogoName = keyof typeof LOGO_MANIFEST;

export const BLOG_IMAGES: Record<string, { width: number; height: number; widths: readonly number[] }> = ${JSON.stringify(blogManifest, null, 2)};
`;
await writeFile(path.join(root, 'apps/web/src/lib/images.generated.ts'), ts);
