const fs = require('fs');

let content = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

if (!content.includes('toggleCurrency')) {
  content = content.replace(
    'const { formatPrice, currency } = useCurrency();',
    'const { toggleCurrency, currency } = useCurrency();'
  );

  // We want to add a button. There is an FR/EN button, let's put it next to it or replace a part 
  // We can look for the Language toggle button.
  // Assuming there is none, let's just inject it into the nav
  
  const injectTarget = '<div className="flex items-center gap-4 ml-6">';
  const buttonHtml = `
            <button 
              onClick={toggleCurrency}
              className="text-sm font-medium text-gray-700 hover:text-[var(--color-primary)] transition-colors border px-2 py-1 rounded-md bg-gray-50 hover:bg-white cursor-pointer"
            >
              {currency === 'USD' ? 'í²² USD â†’ MAD' : 'í·²í·¦ MAD â†’ USD'}
            </button>
  `;
  
  if (content.includes(injectTarget)) {
    content = content.replace(injectTarget, injectTarget + '\n' + buttonHtml);
  } else {
    // try to find just className="flex items-center gap-4"
    const fallbackTarget = '<div className="flex items-center justify-end space-x-4">';
    if (content.includes(fallbackTarget)) {
        content = content.replace(fallbackTarget, fallbackTarget + '\n' + buttonHtml);
    } else {
       // Just put it next to the cart icon
       content = content.replace(
         '<Link to="/cart"',
         buttonHtml + '\n            <Link to="/cart"'
       );
    }
  }

}

fs.writeFileSync('src/components/Navbar.jsx', content, 'utf8');
