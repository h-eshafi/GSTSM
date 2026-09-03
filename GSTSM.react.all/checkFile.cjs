const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'content-to-migrate', 'All the website.html');
const content = fs.readFileSync(filePath, 'utf8');

const mains = content.match(/<main>/gi);
console.log('Number of <main> tags found:', mains ? mains.length : 0);

const heroes = content.match(/who-hero/gi);
console.log('Number of who-hero sections found:', heroes ? heroes.length : 0);

console.log('Length of file:', content.length);
