import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const migrateDir = path.join(__dirname, 'content-to-migrate');

// Copy assets directory if exists in root
const assetsSource = path.join(rootDir, 'assets');
const assetsTarget = path.join(migrateDir, 'assets');

if (fs.existsSync(assetsSource)) {
  fs.cpSync(assetsSource, assetsTarget, { recursive: true });
  console.log('✓ Copied assets folder to content-to-migrate/assets');
}

// Copy image assets from root
const imageFiles = [
  'gst-logo.png',
  'gst-hero.png',
  'gst-hero-film-v2.mp4',
  'hospital.png',
  'prevention.png',
  'event.png',
  'gst-scene-2.png',
  'gst-scene-3.png',
  'favicon.svg'
];

for (const img of imageFiles) {
  const src = path.join(rootDir, img);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(migrateDir, img));
    console.log(`✓ Copied image ${img} to content-to-migrate/`);
  }
}

console.log('Assets copy complete!');
