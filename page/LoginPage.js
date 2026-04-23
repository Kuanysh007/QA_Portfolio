class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.locator('button[onclick="logIn()"]');
    
    this.signUsername = page.locator('#sign-username');
    this.signPassword = page.locator('#sign-password');
    this.signUpButton = page.locator('button[onclick="register()"]');

    // ИСПРАВЛЕНО: Теперь ищем только ссылку (a), чтобы не было двойственности
    this.samsungS6 = page.locator('a.hrefch:has-text("Samsung galaxy s6")');
    this.addToCartButton = page.locator('a:has-text("Add to cart")');
    this.cartLink = page.locator('#cartur');
  }

  async register(user, pass) {
    await this.signUsername.fill(user);
    await this.signPassword.fill(pass);
    await this.signUpButton.click();
    this.page.once('dialog', dialog => dialog.accept());
  }

  async login(user, pass) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async addSamsungToCart() {
    // Ждем, пока ссылка станет доступной для клика
    await this.samsungS6.waitFor({ state: 'visible' });
    await this.samsungS6.click();
    
    await this.addToCartButton.waitFor({ state: 'visible' });
    this.page.once('dialog', dialog => dialog.accept());
    await this.addToCartButton.click();
  }
}

module.exports = { LoginPage };