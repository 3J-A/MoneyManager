import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
import { signOutPage } from './signout.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';
import { homePage } from './home.page';
import { budgetPage } from './budget.page';
import { expensePage } from './expense.page';
import { addBudgetPage } from './addBudget.page';
import { addExpensePage } from './addExpense.page';
import { securityPage } from './security.page';
import { editBudgetPage } from './editBudget.page';
import { editExpensePage } from './editExpense.page';

/* global fixture:false, test:false */

/** A sample credential */
const testUser = `user-${new Date().getTime()}@foo.com`;
const credentials = { username: testUser, password: 'foo' };

fixture('MoneyManager localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signup page, then logout works', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, credentials.username, credentials.password);
  await navBar.logout(testController);
  await signOutPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.logout(testController);
  await signOutPage.isDisplayed(testController);
});

test('Test that home page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await homePage.isDisplayed(testController);
});

test('Test that security page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await homePage.gotoSecurityPage(testController);
  await securityPage.isDisplayed(testController);
});

test('Test that budget page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoBudgetPage(testController);
  await budgetPage.isDisplayed(testController);
});

test('Test that add budget page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoBudgetPage(testController);
  await budgetPage.gotoAddBudgetPage(testController);
  await addBudgetPage.isDisplayed(testController);
  await addBudgetPage.addBudget(testController);
});

test('Test that edit budget page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoBudgetPage(testController);
  await budgetPage.gotoEditBudgetPage(testController);
  await editBudgetPage.isDisplayed(testController);
});

test('Test that expenses page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoExpensePage(testController);
  await expensePage.isDisplayed(testController);
});

test('Test that add expenses page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoExpensePage(testController);
  await expensePage.gotoAddExpensePage(testController);
  await addExpensePage.addExpenses(testController);
  await addExpensePage.isDisplayed(testController);
});

test('Test that edit expenses page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoExpensePage(testController);
  await expensePage.gotoEditExpensePage(testController);
  await editExpensePage.isDisplayed(testController);
});
