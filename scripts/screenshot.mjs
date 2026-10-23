// Usage : node scripts/screenshot.mjs <url> <out.png> [width] [fullPage]
import { chromium } from "@playwright/test";
const [url, out, width = "1440", full = "0"] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM ?? "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(width) < 600 ? 844 : 900 }, deviceScaleFactor: Number(width) < 600 ? 2 : 1 });
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(url, { waitUntil: "networkidle" });
await page.addStyleTag({ content: "[role=dialog]{display:none!important}" });
await page.waitForTimeout(300);
await page.screenshot({ path: out, fullPage: full === "1" });
await browser.close();
