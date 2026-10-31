import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const previewsDir = path.join(root, 'docs', 'previews');

const examples = [
  { name: 'vanilla-invoice', out: 'vanilla-invoice.png' },
  { name: 'react-sustainability-report', out: 'react-sustainability-report.png' },
  { name: 'vue-financial-statement', out: 'vue-financial-statement.png' },
  { name: 'angular-service-contract', out: 'angular-service-contract.png' },
];

function serve(dir) {
  const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath === '/') urlPath = '/index.html';
    let filePath = path.join(dir, urlPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath)) {
      res.statusCode = 404;
      res.end('not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.woff2':'font/woff2' };
    res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
    fs.createReadStream(filePath).pipe(res);
  });
  return server;
}

async function main() {
  fs.mkdirSync(previewsDir, { recursive: true });
  const server = serve(distDir);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  console.log('Serving dist on port', port);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });

  for (const ex of examples) {
    const page = await context.newPage();
    const url = `http://127.0.0.1:${port}/${ex.name}/index.html`;
    console.log('Opening', url);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
    await page.waitForFunction(() => window.__PAPERFIT_READY__ === true, { timeout: 120000 });
    // give layout a moment
    await page.waitForTimeout(1000);
    await page.addStyleTag({ content: `
      html, body { background: #e2e8f0 !important; }
      .pagedjs_pages { padding: 24px 0 !important; }
      .pagedjs_page { box-shadow: 0 8px 24px rgba(15,23,42,0.18) !important; margin: 24px auto !important; border-radius: 2px; }
    `});
    await page.waitForTimeout(500);
    const outPath = path.join(previewsDir, ex.out);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log('Saved', outPath);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('Previews done.');
}

main().catch((err) => { console.error(err); process.exit(1); });