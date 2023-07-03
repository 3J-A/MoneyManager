import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class HomePage {
  constructor() {
    this.pageId = `#${PageIDs.homePage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /* Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoSecurityPage(testController) {
    await testController.click(`#${ComponentIDs.securityRef}`);
  }
}

export const homePage = new HomePage();
