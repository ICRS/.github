import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { spawn } from 'node:child_process';

const FPS = 30, SHOTS = 12, SEC = 5;
const TOTAL = FPS * SEC * SHOTS;                 // 1800
const LIMIT = process.env.LIMIT ? +process.env.LIMIT : TOTAL;
const FF = '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2';
const OUT = process.env.OUT || 'mitf-60s.mp4';

const ff = spawn(FF, [
  '-y', '-f','image2pipe', '-framerate', String(FPS), '-i','-',
  '-c:v','libx264', '-preset','slow', '-crf','17',
  '-pix_fmt','yuv420p', '-profile:v','high', '-level','4.2',
  '-r', String(FPS), '-movflags','+faststart',
  '-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709',
  OUT
], { stdio: ['pipe','ignore','pipe'] });
let ffErr = '';
ff.stderr.on('data', d => { ffErr += d; if (ffErr.length > 6000) ffErr = ffErr.slice(-6000); });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto('file:///home/user/.github/labs/gen45-interface/index.html');
await page.waitForTimeout(900);
await page.addStyleTag({ content: `
  html,body{margin:0!important;overflow:hidden!important;background:#020B14!important}
  .rail,.topbar,.shots,.dock{display:none!important}
  .app,.shell,.workarea,.stage{display:block!important;height:auto!important;overflow:visible!important;padding:0!important;margin:0!important}
  .stage{background:#020B14!important}
  .gate{width:1080px!important;height:1920px!important;max-height:none!important;max-width:none!important;
        aspect-ratio:auto!important;border-radius:0!important;box-shadow:none!important;margin:0!important}
`});
await page.evaluate(() => window.__reel.pause());
await page.waitForTimeout(250);

const twoFrames = () => page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
const t0 = Date.now();
let shot = -1;

for (let f = 0; f < LIMIT; f++) {
  const s = Math.floor(f / (FPS * SEC));
  const t = (f % (FPS * SEC)) / (FPS * SEC);
  if (s !== shot) { shot = s; await page.evaluate(i => { window.__reel.mount(i); window.__reel.pause(); }, s); await twoFrames(); }
  await page.evaluate(v => window.__reel.seek(v), t);
  const buf = await page.screenshot({ type: 'jpeg', quality: 96 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (f % 90 === 0) {
    const el = (Date.now() - t0) / 1000;
    console.log(`frame ${f}/${LIMIT}  ${el.toFixed(0)}s elapsed  ${(el / (f + 1) * 1000).toFixed(0)}ms/frame  eta ${((LIMIT - f) * el / (f + 1) / 60).toFixed(1)}min`);
  }
}
ff.stdin.end();
await browser.close();
const code = await new Promise(r => ff.on('close', r));
console.log('ffmpeg exit', code);
if (code !== 0) console.log(ffErr.slice(-2500));
console.log(`done in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
