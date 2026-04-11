const fs = require('fs');

let appContent = fs.readFileSync('src/App.jsx', 'utf8');

// Add import
if (!appContent.includes('CurrencyProvider')) {
  appContent = appContent.replace(
    "import { LanguageProvider } from './context/LanguageContext';",
    "import { LanguageProvider } from './context/LanguageContext';\nimport { CurrencyProvider } from './context/CurrencyContext';"
  );
}

// Add provider wrapper
if (!appContent.includes('<CurrencyProvider>')) {
  appContent = appContent.replace(
    '<LanguageProvider>',
    '<LanguageProvider>\n      <CurrencyProvider>'
  );
  appContent = appContent.replace(
    '</LanguageProvider>',
    '      </CurrencyProvider>\n    </LanguageProvider>'
  );
}

fs.writeFileSync('src/App.jsx', appContent, 'utf8');
