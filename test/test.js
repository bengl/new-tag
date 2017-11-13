const puppeteer = require('puppeteer');
const { format } = require('url');
const { join }= require('path');

(async () => {
  // https://github.com/Googlechrome/puppeteer/issues/290
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  page.on('error', e => {
    console.error(e.stack);
    process.exit(1);
  });
  await page.exposeFunction('hostWrite', d => {
    process.stdout.write(Buffer.from(d.data).toString());
  });
  await page.exposeFunction('hostDone', async code => {
    process.exitCode = code;
    await browser.close();
  });
  await page.goto(format({
    protocol: 'file',
    pathname: join(__dirname, 'test.html')
  }));
})();
