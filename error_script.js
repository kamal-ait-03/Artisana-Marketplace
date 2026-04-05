import fs from 'fs';
const content = fs.readFileSync('build_error.txt', 'utf16le');
const lines = content.split('\n');
const start = lines.findIndex(l => l.includes('Module not found'));
if (start !== -1) {
  console.log(lines.slice(Math.max(0, start - 20), start + 20).join('\n'));
} else {
  const err = lines.findIndex(l => l.includes('Error:'));
  console.log(lines.slice(Math.max(0, err - 5), err + 50).join('\n'));
}
