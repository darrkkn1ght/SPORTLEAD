import fs from 'fs';
import path from 'path';

// ANSI color helpers
const red = (str: string) => `\x1b[31m${str}\x1b[0m`;
const green = (str: string) => `\x1b[32m${str}\x1b[0m`;
const yellow = (str: string) => `\x1b[33m${str}\x1b[0m`;
const bold = (str: string) => `\x1b[1m${str}\x1b[0m`;

interface VerbatimItem {
  line: number;
  source: string;
  text: string;
}

interface FileContent {
  path: string;
  raw: string;
  clean: string;
}

interface Failure {
  category: string;
  message: string;
  expected?: string;
  actual?: string;
  location?: string;
}

const failures: Failure[] = [];

// Recursive directory file gatherer
function getFiles(dir: string, extensions: string[] = ['.ts', '.tsx']): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath, extensions));
    } else if (extensions.some(ext => file.endsWith(ext))) {
      results.push(filePath);
    }
  }
  return results;
}

// Normalize HTML entities, strip JSX tags, collapse whitespace
function decodeAndClean(text: string): string {
  return text
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

console.log(bold('\n=== SportLead Africa Content Integrity Verification ===\n'));

// ============================================================================
// 1. Assert SITE_EMAIL in src/lib/constants.ts
// ============================================================================
console.log('1. Checking SITE_EMAIL in src/lib/constants.ts...');
const constantsPath = path.resolve('src/lib/constants.ts');
if (!fs.existsSync(constantsPath)) {
  failures.push({
    category: 'Constants Configuration',
    message: 'src/lib/constants.ts not found',
    location: constantsPath
  });
} else {
  const constantsContent = fs.readFileSync(constantsPath, 'utf8');
  const emailMatch = constantsContent.match(/export\s+const\s+SITE_EMAIL\s*=\s*['"]([^'"]+)['"]/);
  if (!emailMatch) {
    failures.push({
      category: 'Constants Configuration',
      message: 'SITE_EMAIL export not found in src/lib/constants.ts',
      expected: "SITE_EMAIL = 'info@sportleadafrica.com'",
      location: constantsPath
    });
  } else if (emailMatch[1] !== 'info@sportleadafrica.com') {
    failures.push({
      category: 'Constants Configuration',
      message: `SITE_EMAIL has invalid value: '${emailMatch[1]}'`,
      expected: 'info@sportleadafrica.com',
      actual: emailMatch[1],
      location: constantsPath
    });
  } else {
    console.log(green('  ✓ SITE_EMAIL is correctly set to info@sportleadafrica.com'));
  }
}

// ============================================================================
// 2. Parse docs/CONTENT_SOURCE_OF_TRUTH.md and extract every [V] string
// ============================================================================
console.log('\n2. Extracting and validating all [V] verbatim strings from SOT...');
const sotPath = path.resolve('docs/CONTENT_SOURCE_OF_TRUTH.md');
if (!fs.existsSync(sotPath)) {
  failures.push({
    category: 'Source of Truth',
    message: 'docs/CONTENT_SOURCE_OF_TRUTH.md not found',
    location: sotPath
  });
} else {
  const sotContent = fs.readFileSync(sotPath, 'utf8').replace(/\r\n/g, '\n');
  const sotLines = sotContent.split('\n');
  const verbatimItems: VerbatimItem[] = [];

  for (let i = 0; i < sotLines.length; i++) {
    const line = sotLines[i].trim();
    // Stop at Section 14 (Founder Notes)
    if (line.startsWith('## 14.')) break;
    // Skip file header table
    if (i < 20) continue;

    if (line.includes('[V]')) {
      let text = '';
      if (line.includes('| **[V]**')) {
        text = line.split('| **[V]**')[1].replace(/\|.*$/, '').trim();
      } else if (line.includes('>')) {
        text = line.substring(line.indexOf('>') + 1).trim();
      } else if (sotLines[i + 1] && sotLines[i + 1].trim().startsWith('>')) {
        text = sotLines[i + 1].trim().replace(/^>\s*/, '').trim();
      } else if (line.includes('`')) {
        const m = line.match(/`([^`]+)`/);
        if (m) text = m[1].trim();
      }

      text = text.replace(/^[`>]\s*|[`\s]+$/g, '').trim();
      if (text) {
        verbatimItems.push({
          line: i + 1,
          source: line,
          text: text
        });
      }
    }
  }

  console.log(`  Found ${verbatimItems.length} verbatim [V] strings in SOT.`);

  // Gather target code files
  const searchDirs = ['src/lib', 'src/app', 'src/components'];
  const codeFiles: FileContent[] = [];
  for (const dir of searchDirs) {
    const files = getFiles(path.resolve(dir), ['.ts', '.tsx']);
    for (const f of files) {
      const raw = fs.readFileSync(f, 'utf8');
      codeFiles.push({
        path: path.relative(process.cwd(), f).replace(/\\/g, '/'),
        raw,
        clean: decodeAndClean(raw)
      });
    }
  }

  let matchedCount = 0;
  for (const item of verbatimItems) {
    const normText = decodeAndClean(item.text);
    const match = codeFiles.find(
      cf => cf.raw.includes(item.text) || cf.clean.includes(normText)
    );

    if (match) {
      matchedCount++;
    } else {
      failures.push({
        category: 'Verbatim String Missing / Drifted',
        message: `Verbatim string from SOT line ${item.line} not found in codebase`,
        expected: item.text,
        location: `docs/CONTENT_SOURCE_OF_TRUTH.md:${item.line}`
      });
    }
  }

  if (failures.filter(f => f.category === 'Verbatim String Missing / Drifted').length === 0) {
    console.log(green(`  ✓ All ${matchedCount} [V] verbatim strings match character-for-character across codebase.`));
  }
}

// ============================================================================
// 3. Assert no American English spellings in src/lib/ or src/app/
// ============================================================================
console.log('\n3. Checking British English spelling compliance in src/lib/ and src/app/...');

const spellingFiles = [
  ...getFiles(path.resolve('src/lib'), ['.ts', '.tsx']),
  ...getFiles(path.resolve('src/app'), ['.ts', '.tsx'])
];

interface SpellingRule {
  name: string;
  check: (word: string, line: string) => boolean;
}

const spellingRules: SpellingRule[] = [
  {
    name: 'ize/izing/ization (use -ise/-ising/-isation)',
    check: (word: string) => {
      const lower = word.toLowerCase();
      // Allowed exceptions containing "size", "resize", "initialize"
      if (lower.endsWith('size') || lower.endsWith('sizes') || lower.endsWith('sizing')) return false;
      if (lower.startsWith('resize') || lower === 'resizable') return false;
      if (lower.startsWith('initialize') || lower.startsWith('initializ')) return false;
      return /(?:ize|izing|ization)/i.test(lower);
    }
  },
  {
    name: 'yze (use -yse)',
    check: (word: string) => /yze[sd]?|yzing/i.test(word)
  },
  {
    name: 'organiz (use organis)',
    check: (word: string) => /organiz/i.test(word)
  },
  {
    name: 'prioritiz (use prioritis)',
    check: (word: string) => /prioritiz/i.test(word)
  },
  {
    name: 'recogniz (use recognis)',
    check: (word: string) => /recogniz/i.test(word)
  },
  {
    name: 'optimiz (use optimis)',
    check: (word: string) => /optimiz/i.test(word)
  },
  {
    name: 'analyz (use analyse)',
    check: (word: string) => /analyz/i.test(word)
  },
  {
    name: 'center (use centre for nouns/adjectives)',
    check: (word: string, line: string) => {
      // Ignore Tailwind/CSS alignment classes (items-center, text-center, justify-center, etc.)
      if (/(?:items|justify|text|self|content)-center/i.test(line)) {
        // Only trigger if 'center' appears outside alignment utility
        const stripped = line.replace(/(?:items|justify|text|self|content)-center/gi, ' ');
        return /\bcenter(s|ed|ing)?\b/i.test(stripped);
      }
      if (/text-align\s*:\s*center/i.test(line)) return false;
      return /\bcenter(s|ed|ing)?\b/i.test(word);
    }
  },
  {
    name: 'behavior (use behaviour)',
    check: (word: string) => /behavior/i.test(word)
  },
  {
    name: 'catalog (use catalogue)',
    check: (word: string) => /catalog/i.test(word)
  },
  {
    name: 'defense (use defence)',
    check: (word: string) => /defense/i.test(word)
  },
  {
    name: 'license as noun (use licence)',
    check: (word: string) => /^licenses?$/i.test(word)
  },
  {
    name: 'fulfill (use fulfil)',
    check: (word: string) => /fulfill/i.test(word)
  },
  {
    name: 'enroll (use enrol)',
    check: (word: string) => /enroll/i.test(word)
  },
  {
    name: 'program for non-software (use programme)',
    check: (word: string) => /^programs?$/i.test(word)
  }
];

let spellingViolationCount = 0;
for (const filePath of spellingFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

  lines.forEach((rawLine, idx) => {
    // Strip className props to avoid false positives on CSS utilities
    const strippedLine = rawLine.replace(/className\s*=\s*(?:\{`[^`]*`\}|"[^"]*"|'[^']*')/g, ' ');
    const words = strippedLine.match(/[a-zA-Z]+/g) || [];

    for (const word of words) {
      for (const rule of spellingRules) {
        if (rule.check(word, rawLine)) {
          spellingViolationCount++;
          failures.push({
            category: 'American English Spelling Violation',
            message: `Found American spelling "${word}" (${rule.name})`,
            location: `${relPath}:${idx + 1}`,
            actual: rawLine.trim()
          });
        }
      }
    }
  });
}

if (spellingViolationCount === 0) {
  console.log(green('  ✓ No prohibited American English spellings detected in src/lib/ or src/app/.'));
}

// ============================================================================
// 4. Assert no unapproved numeric claims or SLAs in src/lib/
// ============================================================================
console.log('\n4. Checking for unapproved numeric claim patterns and SLAs in src/lib/...');

const libFiles = getFiles(path.resolve('src/lib'), ['.ts', '.tsx']);
const claimPatterns = [
  { name: 'Standalone percentage claim', regex: /\b\d{1,3}%\b/ },
  { name: 'Fabricated count claim (e.g., 50+ projects)', regex: /\b\d+\+\s*(?:experts|projects|countries|years|clients|specialists)\b/i },
  { name: 'Service level agreement (SLA)', regex: /\b\d+\s*(?:business\s*)?hours?\b|\b\d+\s*days?\s*SLA\b|\b48\s*hours\b/i }
];

let claimsViolationCount = 0;
for (const filePath of libFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

  lines.forEach((rawLine, idx) => {
    for (const pattern of claimPatterns) {
      if (pattern.regex.test(rawLine)) {
        claimsViolationCount++;
        failures.push({
          category: 'Unapproved Claim / SLA in src/lib/',
          message: `Forbidden pattern detected: ${pattern.name}`,
          location: `${relPath}:${idx + 1}`,
          actual: rawLine.trim()
        });
      }
    }
  });
}

if (claimsViolationCount === 0) {
  console.log(green('  ✓ No unapproved numeric claim patterns or SLAs found in src/lib/.'));
}

// ============================================================================
// Summary & Exit Status
// ============================================================================
console.log('\n------------------------------------------------------------');
if (failures.length > 0) {
  console.error(red(bold(`FAILED: ${failures.length} content integrity issue(s) detected:`)));
  console.error('');

  failures.forEach((f, idx) => {
    console.error(bold(`${idx + 1}. [${f.category}]`) + (f.location ? ` at ${yellow(f.location)}` : ''));
    console.error(`   Message:  ${f.message}`);
    if (f.expected) {
      console.error(`   Expected: ${green(f.expected)}`);
    }
    if (f.actual) {
      console.error(`   Actual:   ${red(f.actual)}`);
    }
    console.error('');
  });

  process.exit(1);
} else {
  console.log(green(bold('PASSED: All content integrity, verbatim string, and spelling checks passed successfully.')));
  console.log('------------------------------------------------------------\n');
  process.exit(0);
}
