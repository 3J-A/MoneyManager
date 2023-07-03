import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class AddBudgetPage {
  constructor() {
    this.pageId = `#${PageIDs.addBudgetPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addBudget(testController) {
    const typeSelector = Selector(`#${ComponentIDs.addBudgetType}`);
    const selectOption = typeSelector().find('option');
    await testController.click(typeSelector());
    await testController.click(selectOption.withText('Food'));
    await testController.typeText(`#${ComponentIDs.addBudgetAmount}`, '300');
    await testController.click(`#${ComponentIDs.addBudgetSubmit} .btn`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addBudgetPage = new AddBudgetPage();
