const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page/LoginPage');

test('Регистрация, Логин и Покупка', async ({ page }) => {
  const app = new LoginPage(page);
  const randomId = Math.floor(Math.random() * 10000);
  const newUser = `user_astana_${randomId}`;
  const pass = 'password123';

  await page.goto('https://www.demoblaze.com/');

  // 1. РЕГИСТРАЦИЯ
  await page.click('#signin2'); // Кнопка Sign up
  await app.register(newUser, pass);
  await page.waitForTimeout(1000); // Небольшая пауза для базы данных сайта

  // 2. ЛОГИН
  await page.click('#login2'); // Кнопка Log in
  await app.login(newUser, pass);

  // Ждем, пока появится имя пользователя рядом с "Logout"
  const userNickname = page.locator('#nameofuser');
  await userNickname.waitFor({ state: 'visible', timeout: 15000 });
  await expect(userNickname).toContainText(newUser);

  // 3. ДОБАВЛЕНИЕ В КОРЗИНУ
  await app.addSamsungToCart();
  
  // 4. ПРОВЕРКА КОРЗИНЫ
  await app.cartLink.click();
  const productInCart = page.locator('td:has-text("Samsung galaxy s6")');
  await productInCart.waitFor({ state: 'visible', timeout: 10000 });
  
  // 5. СКРИНШОТ
  await page.screenshot({ path: 'final_check.png', fullPage: true });
  
  console.log(`Успех! Создан юзер: ${newUser}. Скриншот сохранен.`);
});