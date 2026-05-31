const fs = require('fs');
const files = [
  'src/data/blogPosts.ts',
  'src/data/faqs.ts',
  'src/data/guides.ts',
  'src/pages/BlogPage.tsx',
  'src/pages/BlogPostPage.tsx',
  'src/pages/FAQPage.tsx',
  'src/pages/GuidesPage.tsx',
  'src/hooks/useSEO.ts'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    let cnt = fs.readFileSync(f, 'utf8');
    cnt = cnt.replace(/\\\`/g, '\`');
    cnt = cnt.replace(/\\\$/g, '\$');
    fs.writeFileSync(f, cnt);
  }
});
console.log('Fixed backticks');
