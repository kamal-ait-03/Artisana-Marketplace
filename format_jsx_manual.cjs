const fs = require('fs');

function repl(file, searchStr, replacement) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(searchStr, replacement);
  fs.writeFileSync(file, content, 'utf8');
}

// ProductCard.jsx
repl('src/components/ProductCard.jsx', 
  /\{product\.price\} <span className="text-xs text-\[#00B4D8\]">USD<\/span>/g,
  '{formatPrice(product.price)}'
);

// CartPage.jsx
repl('src/pages/CartPage.jsx',
  /\{item\.product\.price\} USD/g,
  '{formatPrice(item.product.price)}'
);
repl('src/pages/CartPage.jsx',
  '<span className="font-medium text-gray-800">{total} USD</span>',
  '<span className="font-medium text-gray-800">{formatPrice(total)}</span>'
);
repl('src/pages/CartPage.jsx',
  /\{total\} <span className="text-base font-normal">USD<\/span>/g,
  '{formatPrice(total)}'
);

// CatalogPage.jsx
repl('src/pages/CatalogPage.jsx',
  '<span>0 USD</span>',
  '<span>{formatPrice(0)}</span>'
);
repl('src/pages/CatalogPage.jsx',
  '<span className="text-[var(--color-primary)] font-bold">{priceRange} USD</span>',
  '<span className="text-[var(--color-primary)] font-bold">{formatPrice(priceRange)}</span>'
);

// CheckoutPage.jsx
repl('src/pages/CheckoutPage.jsx',
  /\{item\.product\.price\} USD/g,
  '{formatPrice(item.product.price)}'
);
repl('src/pages/CheckoutPage.jsx',
  '<span className="text-white">{total} USD</span>',
  '<span className="text-white">{formatPrice(total)}</span>'
);
repl('src/pages/CheckoutPage.jsx',
  '<span className="text-white">{shippingCost} USD</span>',
  '<span className="text-white">{formatPrice(shippingCost)}</span>'
);
repl('src/pages/CheckoutPage.jsx',
  /\{finalTotal\} <span className="text-base font-normal text-gray-300">USD<\/span>/g,
  '{formatPrice(finalTotal)}'
);

// ProductDetailPage.jsx
repl('src/pages/ProductDetailPage.jsx',
  /\{product\.price\} <span className="text-2xl font-normal text-slate-400">USD<\/span>/g,
  '{formatPrice(product.price)}'
);

// ArtisanDashboard.jsx
repl('src/pages/ArtisanDashboard.jsx',
  '12 450 USD',
  '{formatPrice(12450)}'
);
repl('src/pages/ArtisanDashboard.jsx',
  /\{p\.price\} USD/g,
  '{formatPrice(p.price)}'
);
repl('src/pages/ArtisanDashboard.jsx',
  'Price (USD)', 
  'Price ({currency})'
);
repl('src/pages/ArtisanDashboard.jsx',
  /\{product\.price\} USD/g,
  '{formatPrice(product.price)}'
);
repl('src/pages/ArtisanDashboard.jsx',
  /\{order\.total\} USD/g,
  '{formatPrice(order.total)}'
);
repl('src/pages/ArtisanDashboard.jsx',
  'US Dollar (USD)',
  '{currency === "USD" ? "US Dollar (USD)" : "Moroccan Dirham (MAD)"}'
);
repl('src/pages/ArtisanDashboard.jsx',
  '+4 200 USD',
  '{formatPrice(4200)}'
);

