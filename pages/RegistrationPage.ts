import { Page } from '@playwright/test';

export class RegistrationPage {
  constructor(private page: Page) {}

  // Описываем элементы (кнопки и поля)
  async goto() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async register(username: string, pass: string) {
    await this.page.click('#signin2');
    await this.page.fill('#sign-username', username);
    await this.page.fill('#sign-password', pass);
    await this.page.click('button:has-text("Sign up")');
  }
}