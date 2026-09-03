const fs = require('fs');
const path = require('path');
const menus = require('./src/data/menus.json');

const dir = path.join(__dirname, 'content-to-migrate');

// Clear directory first
if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
}
fs.mkdirSync(dir);

let counter = 1;

for (const key in menus) {
    const menu = menus[key];
    if (menu.columns) {
        for (const col of menu.columns) {
            for (const link of col.links) {
                // Sanitize filename
                const safeName = link.label.replace(/[\\/:*?"<>|]/g, '-');
                const num = String(counter).padStart(2, '0');
                const filename = `${num} - ${safeName}.html`;
                
                fs.writeFileSync(path.join(dir, filename), '');
                counter++;
            }
        }
    } else if (menu.previewGroups) {
        for (const group of menu.previewGroups) {
            const safeName = group.title.replace(/[\\/:*?"<>|]/g, '-');
            const num = String(counter).padStart(2, '0');
            const filename = `${num} - ${safeName}.html`;
            
            fs.writeFileSync(path.join(dir, filename), '');
            counter++;
        }
    }
}

console.log(`Created ${counter - 1} empty files sequentially.`);
