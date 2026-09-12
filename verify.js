const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'index.html',
  'about.html',
  'programs.html',
  'mentors.html',
  'leadership.html',
  'alumni.html',
  'contact.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  '_headers',
  '.gitignore',
  'README.md',
  'package.json',
  'css/main.css',
  'js/main.js',
  'assets/images/logo.svg',
  'assets/images/og-image.svg',
  'assets/icons/favicon.svg',
  'docs/DEPLOYMENT-CHECKLIST.md',
  '.github/workflows/pages.yml'
];

let missing = [];
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    missing.push(file);
  }
}

if (missing.length > 0) {
  console.error('MISSING FILES:', missing);
  process.exit(1);
} else {
  console.log(`PASS: All ${requiredFiles.length} required files exist.`);
}

// Verify internal links across HTML files
const htmlFiles = ['index.html','about.html','programs.html','mentors.html','leadership.html','alumni.html','contact.html','404.html'];
let brokenLinks = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hrefRegex = /href="([^"]+)"/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('#')) continue;
    const baseTarget = href.split('#')[0].split('?')[0];
    if (baseTarget && !fs.existsSync(baseTarget)) {
      brokenLinks.push({ file, href, baseTarget });
    }
  }
});

if (brokenLinks.length > 0) {
  console.error('BROKEN LINKS FOUND:', brokenLinks);
  process.exit(1);
} else {
  console.log('PASS: Zero broken internal links found across all 8 HTML files.');
}

// Verify image sources
let brokenImgs = [];
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const srcRegex = /src="([^"]+)"/g;
  let match;
  while ((match = srcRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.startsWith('http') || src.startsWith('data:')) continue;
    const baseTarget = src.split('?')[0];
    if (baseTarget && !fs.existsSync(baseTarget)) {
      brokenImgs.push({ file, src, baseTarget });
    }
  }
});

if (brokenImgs.length > 0) {
  console.error('BROKEN IMAGE SOURCES FOUND:', brokenImgs);
  process.exit(1);
} else {
  console.log('PASS: Zero broken image sources found across all 8 HTML files.');
}

// Check JavaScript syntax
try {
  const jsContent = fs.readFileSync('js/main.js', 'utf8');
  new Function(jsContent);
  console.log('PASS: js/main.js syntax valid.');
} catch (e) {
  console.error('FAIL: js/main.js syntax error:', e.message);
  process.exit(1);
}

console.log('ALL INTEGRITY CHECKS PASSED PERFECTLY!');
