const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'public', 'assets', 'site-interactive.js');
let content = fs.readFileSync(jsPath, 'utf8');

content = content.replace(/'index\.html(#.*?)?'/g, "'/$1'");
content = content.replace(/'le-gst\.html(#.*?)?'/g, "'/le-gst$1'");
content = content.replace(/'patients-proches\.html(#.*?)?'/g, "'/patients-proches$1'");
content = content.replace(/'offre-de-soins\.html(#.*?)?'/g, "'/offre-de-soins$1'");
content = content.replace(/'sante-publique\.html(#.*?)?'/g, "'/sante-publique$1'");
content = content.replace(/'espace-professionnel\.html(#.*?)?'/g, "'/espace-professionnel$1'");
content = content.replace(/'actualites\.html(#.*?)?'/g, "'/actualites$1'");
content = content.replace(/'centre-decoute\.html(#.*?)?'/g, "'/centre-decoute$1'");
content = content.replace(/'urgences\.html(#.*?)?'/g, "'/urgences$1'");
content = content.replace(/'rendez-vous\.html(#.*?)?'/g, "'/rendez-vous$1'");
content = content.replace(/'actualite-.*?\.html'/g, "'/actualites'");
content = content.replace(/'evenement-.*?\.html'/g, "'/actualites'");

fs.writeFileSync(jsPath, content, 'utf8');
console.log('Fixed all .html routes in site-interactive.js!');
