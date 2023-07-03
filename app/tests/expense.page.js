import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class ExpensePage {
  constructor() {
    this.pageId = `#${PageIDs.expensePage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoAddExpensePage(testController) {
    await testController.click(`#${ComponentIDs.addExpensesButton}`);
  }

  async gotoEditExpensePage(testController) {
    await testController.click(`#${ComponentIDs.editExpenseLink}`);
  }
}

export const expensePage = new ExpensePage();
