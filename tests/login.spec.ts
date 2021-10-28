import { test, expect } from '@playwright/test';

import { user } from './testData';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { SettingsPage } from '../pages/settingsPage';
import { LogoutPage } from '../pages/logoutPage';

test('User can login and logout', async ({ page }) => {
    const homepage = new HomePage(page);
    
    await homepage.open();
    await homepage.goToLoginPage();
    await new LoginPage(page).login(user.email, user.password)

    const userIsLoggedIn = await homepage.userIsLoggedIn();
    expect(userIsLoggedIn).toBeTruthy();

    await homepage.goToSettings();
    await new SettingsPage(page).logout();

    const userIsLoggedOut = await new LogoutPage(page).userIsLoggedOut();
    expect(userIsLoggedOut).toBeTruthy();
});
