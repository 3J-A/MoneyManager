import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class AddExpensePage {
  constructor() {
    this.pageId = `#${PageIDs.addExpensePage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addExpenses(testController) {
    await testController.typeText(`#${ComponentIDs.addExpenseName}`, 'Banana');
    const typeSelector = Selector(`#${ComponentIDs.addExpenseType}`);
    const selectOption = typeSelector().find('option');
    await testController.click(typeSelector());
    await testController.click(selectOption.withText('Food'));
    await testController.typeText(`#${ComponentIDs.addExpenseAmount}`, '10');
    await testController.click(`#${ComponentIDs.addExpenseSubmit} .btn`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addExpensePage = new AddExpensePage();
