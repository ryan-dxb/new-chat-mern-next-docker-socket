import puppeteer from "puppeteer";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

console.log("dirname", __dirname);

const startBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "/usr/bin/chromium-browser",
    args: [
      "--no-sandbox",
      "--headless",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
  });

  return browser;
};

const createPDF = async () => {
  const browser = await startBrowser();

  const page = await browser.newPage();

  const html = fs.readFileSync(__dirname + "/email/test.html", "utf-8");

  await page.setContent(html, { waitUntil: "domcontentloaded" });

  await page.emulateMediaType("screen");

  await page.pdf({
    path: "test.pdf", // path: "./email/test.pdf
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px",
    },
  });

  await browser.close();
};

export default createPDF;
