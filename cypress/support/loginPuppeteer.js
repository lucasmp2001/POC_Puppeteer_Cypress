const puppeteer = require("puppeteer");

exports.loginPuppeteer = async function loginPuppeteer(userObject) {
  const { username, password, url } = userObject;
  const creds = await puppeteer
    .launch({ headless: false })
    .then(async (browser) => {
      try {
        const page = await browser.newPage();
        await page.goto(url);

        await page.waitForSelector("#logando");
        await page.click("#logando");

        await page.waitForSelector('input[name="loginfmt"]');
        await page.type('input[name="loginfmt"]', username, {
          delay: 100,
        });
        await page.click("#idSIButton9");

        if((await page.$$('#aadTile'))) {
          await page.waitForSelector("#aadTile");
          await page.keyboard.press("Enter");
        } else {
            await page.waitFor('input[name="passwd"]');
            await page.type('input[name="passwd"]', password, {delay:400});
            await page.click('#idSIButton9');
        }

        await page.authenticate({
          username: username,
          password: password,
          delay: 300,
        });

        await page.waitForSelector("#deslogando");
        await page.waitForTimeout(2000);
        await page.click("#perfil");
        await page.keyboard.press("Enter");
        await page.waitForTimeout(900);

        await page.waitForTimeout(1500);

        const localStorageData = await page.evaluate(() => {

        const json = {};

        for (var i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          json[key] = sessionStorage.getItem(key);
        }

        return json;

        });

        browser.close();
        return localStorageData;
      } catch (error) {
        console.error(error);
        // browser.close();
        return 1;
      }
    });
  return creds;
};
