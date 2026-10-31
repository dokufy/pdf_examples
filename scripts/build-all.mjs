import { build } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { paperfitVitePlugin } from '@dokufy/paperfitjs/vite';
import { compilePaperfitBuild } from '@dokufy/paperfitjs/compiler';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const examplesDir = path.join(root, 'examples');
const distRoot = path.join(root, 'dist');

const examples = [
  { name: 'vanilla-invoice', framework: 'vanilla' },
  { name: 'react-sustainability-report', framework: 'react' },
  { name: 'vue-financial-statement', framework: 'vue' },
  { name: 'angular-service-contract', framework: 'angular' },
];

async function main() {
  fs.rmSync(distRoot, { recursive: true, force: true });
  fs.mkdirSync(distRoot, { recursive: true });

  for (const ex of examples) {
    const exampleDir = path.join(examplesDir, ex.name);
    const outDir = path.join(distRoot, ex.name);
    fs.mkdirSync(outDir, { recursive: true });

    const plugins = [];
    if (ex.framework === 'react') {
      const { default: react } = await import('@vitejs/plugin-react');
      plugins.push(react());
    } else if (ex.framework === 'vue') {
      const { default: vue } = await import('@vitejs/plugin-vue');
      plugins.push(vue());
    }
    plugins.push(paperfitVitePlugin({ outDir }));

    console.log(`Building ${ex.name}...`);
    await build({
      root: exampleDir,
      plugins,
      build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
          input: path.join(exampleDir, 'index.html'),
        },
      },
    });

    // Ensure variables.json and json_schema.json are present
    for (const f of ['variables.json', 'json_schema.json']) {
      const src = path.join(exampleDir, f);
      const dst = path.join(outDir, f);
      if (fs.existsSync(src)) fs.copyFileSync(src, dst);
    }

    // Flatten into paperfit archive layout
    const result = compilePaperfitBuild({ inputDir: outDir, outputDir: outDir });
    console.log(`${ex.name} build files:`, result.files);
    if (result.warnings.length) console.warn(result.warnings);

    // Create tar.gz archive
    const archive = path.join(distRoot, `${ex.name}.tar.gz`);
    execSync(`tar -czf ${JSON.stringify(archive)} -C ${JSON.stringify(outDir)} .`, { stdio: 'inherit' });
    console.log(`Archived ${archive}`);
  }
  console.log('All builds complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});