const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // import hook
  // if not imported, add it next to LanguageContext or at top
  if (!content.includes('useCurrency')) {
    if (content.includes("from '../context/LanguageContext'")) {
       content = content.replace(
         "import { useLanguage } from '../context/LanguageContext';",
         "import { useLanguage } from '../context/LanguageContext';\nimport { useCurrency } from '../context/CurrencyContext';"
       );
    } else if (content.includes("from '../../context/LanguageContext'")) {
       content = content.replace(
         "import { useLanguage } from '../../context/LanguageContext';",
         "import { useLanguage } from '../../context/LanguageContext';\nimport { useCurrency } from '../../context/CurrencyContext';"
       );
    } else {
       // Just insert it after react imports
       content = content.replace(
         /import React(, {[^}]+})? from 'react';/,
         "import React$1 from 'react';\nimport { useCurrency } from '../context/CurrencyContext';"
       );
       // If no react import, put at top
       if (content === original && !content.includes('useCurrency')) {
         content = "import { useCurrency } from '../context/CurrencyContext';\n" + content;
       }
    }
  }

  // Hook injection
  // Find main function component
  const componentRegex = /(function\s+[A-Z]\w*\s*\(.*\)|\bconst\s+[A-Z]\w*\s*=\s*\(.*?\)\s*=>)\s*\{/g;
  let matches = [...content.matchAll(componentRegex)];
  
  // We just inject right after the first functional component match we find
  if (matches.length > 0) {
    if (!content.includes('const { formatPrice, currency } = useCurrency();') && !content.includes('const { toggleCurrency, currency } = useCurrency();')) {
      const match = matches[0];
      const insertIdx = match.index + match[0].length;
      content = content.slice(0, insertIdx) + "\n  const { formatPrice, currency } = useCurrency();" + content.slice(insertIdx);
    }
  }

  // Replacements
  // we look for {product.price} USD or {price} USD etc
  // We need to carefully replace them with {formatPrice(val)}
  // E.g. {product.price} <span className="...text-[#00B4D8]">USD</span>
  // let's do manual updates via terminal for specific files as script might be unsafe due to complex JSX tags
  fs.writeFileSync(filePath, content, 'utf8');
}

['src/components/ProductCard.jsx', 'src/pages/ArtisanDashboard.jsx', 'src/pages/CartPage.jsx', 'src/pages/CatalogPage.jsx', 'src/pages/CheckoutPage.jsx', 'src/pages/ProductDetailPage.jsx', 'src/components/Navbar.jsx'].forEach(p => processFile(p));

console.log("Hooks injected.");
