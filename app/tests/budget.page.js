import { Selector } from 'testcafe';
import { PageIDs } from '../imports/ui/utilities/ids';

class BudgetPage {
  constructor() {
    this.pageId = `#${PageIDs.budgetPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const budgetPage = new BudgetPage();
