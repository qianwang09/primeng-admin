import { ClinewPage } from './app.po';

describe('clinew App', () => {
  let page: ClinewPage;

  beforeEach(() => {
    page = new ClinewPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
