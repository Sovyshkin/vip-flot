#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_FILES = [
  {
    file: path.join(PROJECT_ROOT, 'src/data/boats.js'),
    exportName: 'boats',
    targetDir: 'boats',
  },
  {
    file: path.join(PROJECT_ROOT, 'src/data/yachts.js'),
    exportName: 'yachts',
    targetDir: 'yachts',
  },
  {
    file: path.join(PROJECT_ROOT, 'src/data/sailing.js'),
    exportName: 'sailingYachts',
    targetDir: 'sailing',
  },
];

const args = new Set(process.argv.slice(2));
const isDryRun = args.has('--dry-run');
const onlySlugArg = process.argv.find((arg) => arg.startsWith('--slug='));
const onlySlug = onlySlugArg ? onlySlugArg.slice('--slug='.length).trim() : '';

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function extractExportArray(source, exportName) {
  const marker = `export const ${exportName}`;
  const start = source.indexOf(marker);
  if (start === -1) {
    throw new Error(`Не найден экспорт ${exportName}`);
  }

  const arrayStart = source.indexOf('[', start);
  let depth = 0;
  let inString = false;
  let quote = '';
  let escaped = false;

  for (let i = arrayStart; i < source.length; i += 1) {
    const char = source[i];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === '\\') {
        escaped = true;
        continue;
      }
      if (char === quote) {
        inString = false;
        quote = '';
      }
      continue;
    }

    if (char === '"' || char === '\'' || char === '`') {
      inString = true;
      quote = char;
      continue;
    }

    if (char === '[') depth += 1;
    if (char === ']') {
      depth -= 1;
      if (depth === 0) {
        const literal = source.slice(arrayStart, i + 1);
        return Function(`return (${literal})`)();
      }
    }
  }

  throw new Error(`Не удалось распарсить экспорт ${exportName}`);
}

function slugifyName(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '');
}

function fileNameFromUrl(rawUrl, index) {
  const parsed = new URL(rawUrl);
  const baseName = path.basename(parsed.pathname) || `image-${index + 1}`;
  const safeBaseName = decodeURIComponent(baseName)
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._-а-яА-ЯёЁ]/g, '-');
  return safeBaseName || `image-${index + 1}`;
}

function uniqueFileName(fileName, used) {
  const parsed = path.parse(fileName);
  let candidate = fileName;
  let suffix = 1;
  while (used.has(candidate)) {
    candidate = `${parsed.name}-${suffix}${parsed.ext}`;
    suffix += 1;
  }
  used.add(candidate);
  return candidate;
}

function downloadFile(url, targetPath) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const client = parsed.protocol === 'http:' ? http : https;

    const request = client.get(parsed, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        response.resume();
        const nextUrl = new URL(response.headers.location, parsed).toString();
        downloadFile(nextUrl, targetPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`Ошибка загрузки ${url}: HTTP ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(targetPath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(resolve);
      });
      fileStream.on('error', reject);
    });

    request.on('error', reject);
    request.setTimeout(20000, () => {
      request.destroy(new Error(`Таймаут загрузки ${url}`));
    });
  });
}

async function processDataFile(config) {
  const sourceText = fs.readFileSync(config.file, 'utf8');
  const items = extractExportArray(sourceText, config.exportName);
  let updatedSourceText = sourceText;
  let replacementsCount = 0;
  const failures = [];

  for (const item of items) {
    if (!Array.isArray(item.images) || !item.images.length) continue;
    if (onlySlug && item.slug !== onlySlug) continue;

    const tildaImages = item.images.filter((image) => typeof image === 'string' && /tildacdn/i.test(image));
    if (!tildaImages.length) continue;

    const slug = item.slug || slugifyName(item.name);
    const publicDir = path.join(PROJECT_ROOT, 'public/images/imported', config.targetDir, slug);
    ensureDir(publicDir);
    const usedNames = new Set(fs.readdirSync(publicDir, { withFileTypes: true }).filter((entry) => entry.isFile()).map((entry) => entry.name));

    console.log(`\n${config.exportName}: ${item.name} (${slug})`);

    for (const [index, imageUrl] of item.images.entries()) {
      if (typeof imageUrl !== 'string' || !/tildacdn/i.test(imageUrl)) continue;

      const rawName = fileNameFromUrl(imageUrl, index);
      const localName = uniqueFileName(rawName, usedNames);
      const diskPath = path.join(publicDir, localName);
      const publicPath = `/images/imported/${config.targetDir}/${slug}/${localName}`;

      console.log(`  ${isDryRun ? 'PLAN' : 'LOAD'} ${imageUrl}`);
      console.log(`       -> ${publicPath}`);

      if (!isDryRun) {
        try {
          await downloadFile(imageUrl, diskPath);
          updatedSourceText = updatedSourceText.split(imageUrl).join(publicPath);
          fs.writeFileSync(config.file, updatedSourceText, 'utf8');
          replacementsCount += 1;
        } catch (error) {
          failures.push({ imageUrl, error: error.message || String(error) });
          console.warn(`  SKIP ${imageUrl}`);
          console.warn(`       ${error.message || error}`);
        }
      } else {
        replacementsCount += 1;
      }
    }
  }

  if (failures.length) {
    console.log(`\n${config.exportName}: ошибок загрузки ${failures.length}`);
    for (const failure of failures) {
      console.log(`  - ${failure.imageUrl}`);
    }
  }

  return replacementsCount;
}

async function main() {
  let total = 0;

  for (const config of DATA_FILES) {
    total += await processDataFile(config);
  }

  console.log(`\nГотово. ${isDryRun ? 'Будет заменено' : 'Заменено'} ссылок: ${total}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
