import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const migrateDir = path.join(__dirname, 'content-to-migrate');

// Copy script to root assets
const rootAssets = path.join(rootDir, 'assets');
if (!fs.existsSync(rootAssets)) fs.mkdirSync(rootAssets, { recursive: true });

const jsContent = fs.readFileSync(path.join(migrateDir, 'assets', 'site-interactive.js'), 'utf8');
fs.writeFileSync(path.join(rootAssets, 'site-interactive.js'), jsContent);

// Copy All the website.html to root and content-to-migrate if missing
const sourceHtml = path.join(rootDir, 'le-gst.html');
const allWebPath = path.join(migrateDir, 'All the website.html');
const rootAllWebPath = path.join(rootDir, 'All the website.html');

if (!fs.existsSync(allWebPath)) {
  fs.copyFileSync(sourceHtml, allWebPath);
}
if (!fs.existsSync(rootAllWebPath)) {
  fs.copyFileSync(sourceHtml, rootAllWebPath);
}

// Function to recursively inject site-interactive.js script tag in HTML files
function injectScriptInDir(dir, depth = 0) {
  const items = fs.readdirSync(dir);
  const prefix = depth === 0 ? '' : '../';

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && item !== 'assets') {
      injectScriptInDir(fullPath, depth + 1);
    } else if (item.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      if (!content.includes('site-interactive.js')) {
        content = content.replace('</body>', `<script src="${prefix}assets/site-interactive.js"></script>\n</body>`);
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

injectScriptInDir(migrateDir, 0);
console.log('✓ Successfully injected site-interactive.js across all content-to-migrate HTML pages');
