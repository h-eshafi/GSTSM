const fs = require('fs');
const path = require('path');

const files = [
    'actualite-formation-continue.html',
    'actualite-offre-coordonnee.html',
    'actualite-ouverture-hospitaliere.html',
    'actualite-rencontres-sante.html',
    'actualite-renforcement-accueil.html',
    'actualite-vaccination-prevention.html',
    'evenement-forum-prevention.html',
    'evenement-journee-sensibilisation.html',
    'evenement-rencontre-professionnels.html'
];

const posts = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    
    // Extract metadata from <section class="page-hero">
    const heroMatch = content.match(/<section class="page-hero">([\s\S]*?)<\/section>/);
    let kicker = '', title = '', excerpt = '', image = '';
    
    if (heroMatch) {
        const heroContent = heroMatch[1];
        const spanMatch = heroContent.match(/<span>(.*?)<\/span>/);
        const h1Match = heroContent.match(/<h1>(.*?)<\/h1>/);
        const pMatch = heroContent.match(/<p>(.*?)<\/p>/);
        const imgMatch = heroContent.match(/background-image:url\((.*?)\)/);
        
        if (spanMatch) kicker = spanMatch[1];
        if (h1Match) title = h1Match[1];
        if (pMatch) excerpt = pMatch[1];
        if (imgMatch) image = imgMatch[1];
    }
    
    // Extract content from <div class="rich-content">
    const richMatch = content.match(/<div class="rich-content">([\s\S]*?)<div style="margin-top:30px;">/);
    let richContent = '';
    if (richMatch) {
        richContent = richMatch[1].trim();
    }
    
    // Generate ID from filename
    const id = file.replace('.html', '').replace('actualite-', '').replace('evenement-', '');
    const type = file.startsWith('evenement') ? 'evenement' : 'actualite';
    
    posts.push({
        id,
        type,
        kicker,
        title,
        excerpt,
        image,
        content: richContent,
        createdAt: new Date().toISOString()
    });
});

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'posts.json'), JSON.stringify(posts, null, 2));
console.log('Successfully extracted ' + posts.length + ' posts.');
