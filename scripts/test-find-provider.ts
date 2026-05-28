import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  const url = process.env.APP_URL || "http://localhost:4173";
  
  await page.goto(`${url}/find-a-provider`);
  await page.waitForSelector("text=Find a Direct Primary Care");
  await page.waitForTimeout(1000);
  
  // Screenshot 1: Hero + top of page
  await page.screenshot({ path: "screenshots/find-provider-hero.png" });
  console.log("✅ Hero screenshot taken");
  
  // Screenshot 2: Scroll to see cards
  await page.evaluate(() => window.scrollTo(0, 550));
  await page.waitForTimeout(500);
  await page.screenshot({ path: "screenshots/find-provider-cards.png" });
  console.log("✅ Cards screenshot taken");
  
  // Screenshot 3: Search "Tampa"
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollTo(0, 350));
  await page.waitForTimeout(300);
  await page.fill('input[placeholder*="Search"]', "Tampa");
  await page.waitForTimeout(500);
  await page.screenshot({ path: "screenshots/find-provider-search.png" });
  console.log("✅ Search screenshot taken");
  
  // Screenshot 4: State filter - Florida
  await page.fill('input[placeholder*="Search"]', "");
  await page.selectOption("select", "FL");
  await page.waitForTimeout(500);
  await page.screenshot({ path: "screenshots/find-provider-filtered.png" });
  console.log("✅ State filter screenshot taken");
  
  await browser.close();
  console.log("✅ All tests passed!");
}

main().catch(e => {
  console.error("Test failed:", e);
  process.exit(1);
});
