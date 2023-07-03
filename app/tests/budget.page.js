import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class BudgetPage {
  constructor() {
    this.pageId = `#${PageIDs.budgetPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoAddBudgetPage(testController) {
    await testController.click(`#${ComponentIDs.addBudgetRef}`);
  }

  async gotoEditBudgetPage(testController) {
    await testController.click(`#${ComponentIDs.editBudgetLink}`);
  }
}

export const budgetPage = new BudgetPage();
