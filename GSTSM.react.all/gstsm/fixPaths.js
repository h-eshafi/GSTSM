const fs = require('fs');
const path = require('path');

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach((file) => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

walk('e:/dev proj/Sante.agadir/gstsm/src/app', (err, results) => {
  if (err) throw err;
  const tsxFiles = results.filter(f => f.endsWith('.tsx'));
  
  tsxFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace src="filename.ext" with src="/filename.ext"
    // Regex matches src=" followed by anything that is not a /, h (http), or m (mailto)
    content = content.replace(/src="([^/h"][^"]*)"/g, 'src="/$1"');
    
    // Replace poster="filename.ext" with poster="/filename.ext"
    content = content.replace(/poster="([^/h"][^"]*)"/g, 'poster="/$1"');

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated paths in ${file}`);
    }
  });
});
