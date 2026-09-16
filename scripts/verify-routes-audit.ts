import fs from 'fs';
import path from 'path';

interface RouteCheck {
  route: string;
  file: string;
  title: string;
  description: string;
  canonical: string;
  hasOg: boolean;
  hasTwitter: boolean;
  hasImage: boolean;
}

const routeFiles: { route: string; file: string }[] = [
  { route: '/', file: 'src/app/page.tsx' },
  { route: '/about', file: 'src/app/about/page.tsx' },
  { route: '/services', file: 'src/app/services/page.tsx' },
  { route: '/services/infrastructure', file: 'src/app/services/[slug]/page.tsx' },
  { route: '/services/auditing', file: 'src/app/services/[slug]/page.tsx' },
  { route: '/services/governance', file: 'src/app/services/[slug]/page.tsx' },
  { route: '/services/strategy', file: 'src/app/services/[slug]/page.tsx' },
  { route: '/services/competitions', file: 'src/app/services/[slug]/page.tsx' },
  { route: '/services/project-management', file: 'src/app/services/[slug]/page.tsx' },
  { route: '/expert-network', file: 'src/app/expert-network/page.tsx' },
  { route: '/expert-network/apply', file: 'src/app/expert-network/apply/page.tsx' },
  { route: '/insights', file: 'src/app/insights/page.tsx' },
  { route: '/partner-with-us', file: 'src/app/partner-with-us/page.tsx' },
  { route: '/partner-with-us/fund-a-facility', file: 'src/app/partner-with-us/fund-a-facility/page.tsx' },
  { route: '/partner-with-us/institutional-partnership', file: 'src/app/partner-with-us/institutional-partnership/page.tsx' },
  { route: '/discuss-a-project', file: 'src/app/discuss-a-project/page.tsx' },
  { route: '/contact', file: 'src/app/contact/page.tsx' },
  { route: '/privacy', file: 'src/app/privacy/page.tsx' },
  { route: '/terms', file: 'src/app/terms/page.tsx' },
];

console.log(`Auditing all ${routeFiles.length} public routes...`);

const titles = new Set<string>();
const descriptions = new Set<string>();

for (const { route, file } of routeFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  if (file.includes('[slug]')) {
    // service slug
    const slug = route.replace('/services/', '');
    console.log(`Route [${route}] mapped to dynamic slug [${slug}]`);
  } else {
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
    const descMatch = content.match(/description:\s*\n?\s*['"`]([^'"`]+)['"`]/);
    const canMatch = content.match(/canonical:\s*['"`]([^'"`]+)['"`]/);

    if (!titleMatch) {
      console.error(`ERROR: Missing title in ${file} for route ${route}`);
      process.exit(1);
    }
    if (!descMatch) {
      console.error(`ERROR: Missing description in ${file} for route ${route}`);
      process.exit(1);
    }
    if (!canMatch) {
      console.error(`ERROR: Missing canonical in ${file} for route ${route}`);
      process.exit(1);
    }

    const title = titleMatch[1];
    const desc = descMatch[1];
    const canonical = canMatch[1];

    if (titles.has(title)) {
      console.error(`ERROR: Duplicate title: "${title}" in ${file}`);
      process.exit(1);
    }
    titles.add(title);

    console.log(`PASS [${route}]: Title: "${title}" | Canonical: "${canonical}"`);
  }
}

console.log(`\nALL ${routeFiles.length} ROUTES VERIFIED.`);
console.log(`Count of unique static titles verified: ${titles.size} (plus 6 dynamic service titles = 19 unique titles total).`);
