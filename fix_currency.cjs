const fs = require('fs');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = dir + '/' + file;
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      // Global replacements
      content = content.replace(/\bMAD\b/g, 'USD');
      content = content.replace(/Moroccan Dirham \(USD\)/g, 'US Dollar (USD)');
      content = content.replace(/Dirham Marocain \(USD\)/g, 'US Dollar (USD)');
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated currency in: ' + fullPath);
      }
    }
  }
}

processDir('./src');
