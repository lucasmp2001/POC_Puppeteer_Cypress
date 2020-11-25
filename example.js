const puppeteer = require('puppeteer');

(async () => {
  // Abriu a pagina
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://localhost:4200/#/');

  // Clicou no botao de logar
  await page.click('#logando');

  // Fazendo o login, e esperando redirecionar para a pagina de inserir senha
  await page.waitForSelector('input[name="loginfmt"]');
  await page.type('input[name="loginfmt"]', 'l.pinheiro@reply.com', {delay:100});
  await page.click('#idSIButton9');

  // Escolhendo conta que vai logar (caso ja tenha feito login).
  await page.waitForSelector('#aadTile');
  // await page.click('#aadTile');
  await page.keyboard.press('Enter');

  if(confirm.includes('Sign in to your account')) {
    await page.waitFor('input[name="passwd"]');
    await page.type('input[name="passwd"]', 'Lu645600#', {delay:400});
    await page.click('#idSIButton9');
  }

  // Inserindo a Senha (caso for o primeiro acesso, e nao tenha a conta salva)
  // await page.waitFor('input[name="passwd"]');
  // await page.type('input[name="passwd"]', 'Lu645600#', {delay:400});
  // await page.click('#idSIButton9');

  // Fazendo login no PopUp

  await page.authenticate({username: 'l.pinheiro', password: 'Lu645600#', delay: 300})

  // await browser.close();
})();


// exports.loginPuppeteer = async function loginPuppeteer(userObject) {
//   const { email, senha, root } = userObject;
//   const creds = await puppeteer.launch({ headless: false }).then(async browser => {
//     try {
//       let page = await browser.newPage();

//       // Clicando no botão de Login
//       await page.goto(root);
//       await page.click('#logando');
//       await page.waitFor(2000)

//       const pages = await browser.pages();
//       const popUp = pages.pop();

//       // Fazendo o login no Azure (Autenticação Microsoft)
//       await page.waitForSelector('input[name="loginfmt"]');
//       await page.type('input[name="loginfmt"]', email, {delay:100});
//       await page.click('#idSIButton9');

//       const confirm = await popUp.content();

//       if(confirm.includes('Sign in to your account')) {
//         await page.waitForSelector('#aadTile');
//         await page.keyboard.press('Enter');
//       }

//       if(confirm.includes('Sign in to your account')) {
//         await page.waitFor('input[name="passwd"]');
//         await page.type('input[name="passwd"]', senha, {delay:400});
//         await page.click('#idSIButton9');
//       }

//       await page.waitFor(2000);
//       page = await browser.newPage();
//       await page.goto(`${root}/<page in your app>`)

//       await page.waitForSelector('<selector da pagina>', { visible: true });


//       const localStorageData = await page.evaluate(() => {
//         const { acessToken, userData } = localStorage;

//         return { acessToken, userData };
//       })

//       browser.close();
//       return localStorageData;
//     } catch (error) {
//       console.error(error);
//       browser.close();
//       return 1;
//     }
//   });
//   return creds;
// }
