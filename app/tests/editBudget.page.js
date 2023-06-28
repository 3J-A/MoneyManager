import { Selector } from 'testcafe';
import { PageIDs } from '../imports/ui/utilities/ids';

class EditBudgetPage {
  constructor() {
    this.pageId = `#${PageIDs.editBudgetPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(60000).expect(this.pageSelector.exists).ok();
  }
}

export const editBudgetPage = new EditBudgetPage();
