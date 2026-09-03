import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const htmlFile = path.join(__dirname, 'Full original website.html');

if (fs.existsSync(htmlFile)) {
  let content = fs.readFileSync(htmlFile, 'utf8');

  // Fix leading slash references so file:/// protocol loads locally
  content = content.replace(/href=["']\/assets\//g, 'href="assets/');
  content = content.replace(/src=["']\/assets\//g, 'src="assets/');
  content = content.replace(/src=["']\/gst-logo\.png["']/g, 'src="gst-logo.png"');
  content = content.replace(/src=["']\/gst-hero\.png["']/g, 'src="gst-hero.png"');
  content = content.replace(/src=["']\/hospital\.png["']/g, 'src="hospital.png"');
  content = content.replace(/src=["']\/prevention\.png["']/g, 'src="prevention.png"');
  content = content.replace(/src=["']\/event\.png["']/g, 'src="event.png"');
  content = content.replace(/src=["']\/gst-scene-2\.png["']/g, 'src="gst-scene-2.png"');
  content = content.replace(/src=["']\/gst-scene-3\.png["']/g, 'src="gst-scene-3.png"');
  content = content.replace(/src=["']\/favicon\.svg["']/g, 'src="favicon.svg"');
  content = content.replace(/href=["']\/favicon\.svg["']/g, 'href="favicon.svg"');
  content = content.replace(/poster=["']\/gst-hero\.png["']/g, 'poster="gst-hero.png"');
  content = content.replace(/src=["']\/gst-hero-film-v2\.mp4["']/g, 'src="gst-hero-film-v2.mp4"');
  content = content.replace(/href=["']\/gst-logo\.png["']/g, 'href="gst-logo.png"');
  content = content.replace(/href=["']\/hospital\.png["']/g, 'href="hospital.png"');
  content = content.replace(/href=["']\/prevention\.png["']/g, 'href="prevention.png"');
  content = content.replace(/href=["']\/event\.png["']/g, 'href="event.png"');
  content = content.replace(/href=["']\/gst-scene-2\.png["']/g, 'href="gst-scene-2.png"');
  content = content.replace(/href=["']\/gst-scene-3\.png["']/g, 'href="gst-scene-3.png"');
  content = content.replace(/href=["']\/gst-hero\.png["']/g, 'href="gst-hero.png"');

  fs.writeFileSync(htmlFile, content);
  console.log('✓ Successfully fixed relative paths in Full original website.html');
}

// Copy assets directory and images to GSTSM.react folder
const assetsSource = path.join(rootDir, 'assets');
const assetsTarget = path.join(__dirname, 'assets');
if (fs.existsSync(assetsSource) && !fs.existsSync(assetsTarget)) {
  fs.cpSync(assetsSource, assetsTarget, { recursive: true });
  console.log('✓ Copied assets directory to GSTSM.react/');
}

const images = ['gst-logo.png', 'gst-hero.png', 'gst-hero-film-v2.mp4', 'hospital.png', 'prevention.png', 'event.png', 'gst-scene-2.png', 'gst-scene-3.png', 'favicon.svg'];
for (const img of images) {
  const src = path.join(rootDir, img);
  const dest = path.join(__dirname, img);
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${img} to GSTSM.react/`);
  }
}
