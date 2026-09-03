const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..');
const appDir = path.join(__dirname, 'src', 'app', '(public)');

const files = [
  { file: 'index.html', route: '' },
  { file: 'le-gst.html', route: 'le-gst' },
  { file: 'patients-proches.html', route: 'patients-proches' },
  { file: 'offre-de-soins.html', route: 'offre-de-soins' },
  { file: 'sante-publique.html', route: 'sante-publique' },
  { file: 'espace-professionnel.html', route: 'espace-professionnel' },
  { file: 'actualites.html', route: 'actualites' },
  { file: 'centre-decoute.html', route: 'centre-decoute' },
  { file: 'urgences.html', route: 'urgences' },
  { file: 'rendez-vous.html', route: 'rendez-vous' }
];

files.forEach(({ file, route }) => {
  const filePath = path.join(srcDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let html = fs.readFileSync(filePath, 'utf-8');
  
  // Extract <main> content
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!mainMatch) return;
  
  let mainContent = mainMatch[0];
  
  // Strip duplicate footer from inside main (handled by layout)
  mainContent = mainContent.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/gi, '');

  // Convert to JSX
  mainContent = mainContent.replace(/class="/g, 'className="');
  mainContent = mainContent.replace(/autoPlay=""/g, 'autoPlay');
  mainContent = mainContent.replace(/muted=""/g, 'muted');
  mainContent = mainContent.replace(/loop=""/g, 'loop');
  mainContent = mainContent.replace(/playsInline=""/g, 'playsInline');
  mainContent = mainContent.replace(/onclick="[^"]*"/g, ''); // Strip inline onclicks
  
  // Ensure absolute asset paths
  mainContent = mainContent.replace(/src="([^/h"][^"]*)"/g, 'src="/$1"');
  mainContent = mainContent.replace(/poster="([^/h"][^"]*)"/g, 'poster="/$1"');

  // Fix unclosed tags for JSX (img, input, hr, br, source)
  mainContent = mainContent.replace(/<(img|input|hr|br|source)([^>]*?)(?<!\/)>/g, '<$1$2 />');
  
  // Fix style attributes if any
  mainContent = mainContent.replace(/style="([^"]*)"/g, (match, styleString) => {
    const styleObj = {};
    styleString.split(';').forEach(rule => {
      const parts = rule.split(':');
      if(parts.length === 2) {
        const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObj[key] = parts[1].trim();
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });
  
  // Replace HTML comments
  mainContent = mainContent.replace(/<!--[\s\S]*?-->/g, '');

  const outDir = route === '' ? appDir : path.join(appDir, route);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  const componentContent = `import Link from 'next/link';\n\nexport default function Page() {\n  return (\n    ${mainContent}\n  );\n}\n`;
  fs.writeFileSync(path.join(outDir, 'page.tsx'), componentContent);
  console.log(`Cleaned & Converted ${file} -> ${route === '' ? 'page.tsx' : route + '/page.tsx'}`);
});
