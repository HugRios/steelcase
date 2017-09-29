import { NewProjectPage } from './app.po';

describe('new-project App', () => {
  let page: NewProjectPage;

  beforeEach(() => {
    page = new NewProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
