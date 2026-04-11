const fs = require('fs');
let content = fs.readFileSync('src/pages/ArtisanDashboard.jsx', 'utf8');
content = content.replace('{currency === "USD" ? "{currency === "USD" ? "US Dollar (USD)" : "Moroccan Dirham (MAD)"}" : "Moroccan Dirham (MAD)"}', '{currency === "USD" ? "US Dollar (USD)" : "Moroccan Dirham (MAD)"}');
fs.writeFileSync('src/pages/ArtisanDashboard.jsx', content, 'utf8');
