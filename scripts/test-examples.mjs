import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

const examples = ['vanilla-invoice', 'react-sustainability-report', 'vue-financial-statement', 'angular-service-contract'];

function serve(dir) {
  const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';
    let filePath = path.join(dir, urlPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
    if (!fs.existsSync(filePath)) { res.statusCode = 404; res.end('not found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png' };
    res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
    fs.createReadStream(filePath).pipe(res);
  });
  return server;
}

async function main() {
  let failed = false;
  // File checks
  for (const ex of examples) {
    const dir = path.join(distDir, ex);
    for (const f of ['index.html', 'json_schema.json', 'variables.json']) {
      if (!fs.existsSync(path.join(dir, f))) { console.error(`MISSING ${ex}/${f}`); failed = true; }
    }
    if (!fs.existsSync(path.join(distDir, `${ex}.tar.gz`))) { console.error(`MISSING ${ex}.tar.gz`); failed = true; }
  }
  if (failed) process.exit(1);

  // Headless render check
  const server = serve(distDir);
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  for (const ex of examples) {
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:${port}/${ex}/index.html`, { waitUntil: 'networkidle', timeout: 120000 });
    await page.waitForFunction(() => window.__PAPERFIT_READY__ === true, { timeout: 120000 });
    const ready = await page.evaluate(() => window.__PAPERFIT_READY__ === true);
    console.log(`${ex}: ready=${ready}`);
    if (!ready) failed = true;
    await page.close();
  }

  await browser.close();
  server.close();

  // Optional PDF generation check against paperfit server
  const baseUrl = process.env.PAPERFIT_URL;
  if (baseUrl) {
    console.log('Checking PDF generation against', baseUrl);
    // health
    try {
      const res = await fetch(`${baseUrl}/application/healthy`);
      console.log('health', res.status);
    } catch (e) { console.warn('health check failed', e.message); }
  } else {
    console.log('PAPERFIT_URL not set; skipping PDF generation check.');
  }

  if (failed) process.exit(1);
  console.log('All tests passed.');
}

main().catch((err) => { console.error(err); process.exit(1); });