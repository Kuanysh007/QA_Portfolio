import { test, expect } from '@playwright/test';
import testData from '../testData.json';
import { RegistrationPage } from '../pages/RegistrationPage'; // Импорт нашей страницы

for (const user of testData) {
  test(`Регистрация через POM: ${user.username}`, async ({ page }) => {
    const registration = new RegistrationPage(page); // Создаем объект страницы
    
    page.on('dialog', d => d.accept());

    await registration.goto();
    
    const uniqueName = `${user.username}_${Date.now()}`;
    // Всё действие теперь в одной понятной строке:
    await registration.register(uniqueName, user.password);

    await page.waitForTimeout(2000);
    await expect(page).toHaveURL('https://www.demoblaze.com/');
    console.log(`POM Тест пройден для: ${uniqueName}`);
  });
}