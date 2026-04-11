const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const requiresUseCurrency = content.match(/\$\{[A-Za-z0-9_.]+\}\s*USD/) || content.match(/\{[A-Za-z0-9_.]+\}\s*USD/) || content.match(/\$\{[A-Za-z0-9_.\d\s*/+-]+\}\s*USD/);
      
      if (requiresUseCurrency && !content.includes('useCurrency')) {
         // Insert import
         const importPos = content.indexOf('import ');
         content = content.slice(0, importPos) + "import { useCurrency } from '../context/CurrencyContext';\n" + content.slice(importPos);
         
         // Insert hook call inside the component before return
         // This is tricky via regex, so we'll do manual edits via tools.
         console.log(fullPath + " needs useCurrency");
      }
    }
  }
}
processDir('src/components');
processDir('src/pages');
