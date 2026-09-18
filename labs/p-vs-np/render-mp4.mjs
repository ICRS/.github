/**
 * Renders the film to MP4 by stepping the deterministic timeline.
 * Not a screen recording: frame f is renderAt(f / FPS), so timing is exact
 * and the same frame is produced on every run.
 *
 *   node render-mp4.mjs                    # full 30.00s
 *   LIMIT=90 OUT=test.mp4 node render-mp4.mjs
 */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const FPS = 30, SECONDS = 30;
const TOTAL = FPS * SECONDS;                    // 900
const LIMIT = process.env.LIMIT ? +process.env.LIMIT : TOTAL;
const OUT = process.env.OUT || join(HERE, 'p-vs-np-30s.mp4');
const FF = process.env.FFMPEG ||
  '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2';

const ff = spawn(FF, [
  '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '17',
  '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.2',
  '-r', String(FPS), '-movflags', '+faststart',
  '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
  OUT
], { stdio: ['pipe', 'ignore', 'pipe'] });
let ffErr = '';
ff.stderr.on('data', d => { ffErr += d; if (ffErr.length > 8000) ffErr = ffErr.slice(-8000); });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1160, height: 2010 }, deviceScaleFactor: 1 });
page.on('pageerror', e => { console.error('PAGE ERROR:', e.message); });
await page.goto('file://' + join(HERE, 'index.html'));
await page.waitForTimeout(800);
await page.evaluate(() => window.__pvsnp.pause());
await page.addStyleTag({ content: `
  html,body{margin:0!important;overflow:hidden!important;background:#000!important}
  .shell{width:1080px!important;padding:0!important;gap:0!important}
  header,.tabs,.controls,.panel,#footnote{display:none!important}
  .stagewrap{border:0!important;border-radius:0!important;width:1080px!important;height:1920px!important;aspect-ratio:auto!important}
`});
await page.waitForTimeout(200);

const canvas = page.locator('#stage');
const t0 = Date.now();
for (let f = 0; f < LIMIT; f++) {
  await page.evaluate(t => window.__pvsnp.renderAt(t), f / FPS);
  const buf = await canvas.screenshot({ type: 'jpeg', quality: 96 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (f % 90 === 0) {
    const el = (Date.now() - t0) / 1000;
    console.log(`frame ${f}/${LIMIT}  ${el.toFixed(0)}s  ${(el/(f+1)*1000).toFixed(0)}ms/frame  eta ${((LIMIT-f)*el/(f+1)/60).toFixed(1)}min`);
  }
}
ff.stdin.end();
await browser.close();
const code = await new Promise(r => ff.on('close', r));
console.log('ffmpeg exit', code);
if (code !== 0) console.log(ffErr.slice(-2500));
console.log(`done in ${((Date.now()-t0)/1000).toFixed(0)}s -> ${OUT}`);
