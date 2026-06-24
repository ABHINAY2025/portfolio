import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const OUT = 'C:/Users/abhin/OneDrive/Desktop/retrodev/.verify';
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
page.on('console', (m) => console.log('  [console]', m.type(), m.text()));
page.on('pageerror', (e) => console.log('  [pageerror]', e.message));

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' }).catch(() => {});
await sleep(600);
await page.screenshot({ path: `${OUT}/01-home.png` });
console.log('STEP 1: home loaded');

// click About in the header nav
const aboutLink = page.getByRole('link', { name: 'About', exact: true }).first();
await aboutLink.click();
// capture mid-transition (barricade gate ~ during cover phase)
await sleep(420);
await page.screenshot({ path: `${OUT}/02-about-gate.png` });
console.log('STEP 2: clicked About, captured mid-transition');

// let the transition fully settle
await sleep(1800);
await page.screenshot({ path: `${OUT}/03-about-open.png` });
console.log('STEP 3: about settled (window OPEN)');

// helper: report whether the portrait image shows below the window bottom
async function imagePeekReport(tag) {
  const data = await page.evaluate(() => {
    const img = document.querySelector('img[alt="Abhinay riding"]');
    if (!img) return { error: 'no image' };
    // the window is the sibling with the navy-card bg inside the same stage
    const stage = img.parentElement;
    const win = stage.querySelector('div.bg-navy-card') || stage.querySelector('div[class*="navy-card"]');
    const ir = img.getBoundingClientRect();
    const wr = win ? win.getBoundingClientRect() : null;
    return {
      img: { top: Math.round(ir.top), bottom: Math.round(ir.bottom), height: Math.round(ir.height) },
      win: wr ? { top: Math.round(wr.top), bottom: Math.round(wr.bottom), height: Math.round(wr.height) } : null,
    };
  });
  if (data.error) { console.log(`  ${tag}: ${data.error}`); return; }
  const peek = data.win ? Math.round(data.img.bottom - data.win.bottom) : null;
  console.log(`  ${tag}: image[h=${data.img.height} bottom=${data.img.bottom}] window[h=${data.win?.height} bottom=${data.win?.bottom}] -> image visible below window: ${peek}px`);
}
await imagePeekReport('OPEN');

// click Maximise (green dot)
await page.getByRole('button', { name: 'Maximise' }).click();
await sleep(500);
await page.screenshot({ path: `${OUT}/04-about-max.png` });
await imagePeekReport('MAX');
console.log('STEP 4: clicked Maximise');

// click Minimise (yellow dot) — should collapse to title bar, revealing image
await page.getByRole('button', { name: 'Minimise' }).click();
await sleep(500);
await page.screenshot({ path: `${OUT}/05-about-min.png` });
await imagePeekReport('MIN');
console.log('STEP 5: clicked Minimise');

await browser.close();
console.log('DONE');
