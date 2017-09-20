import { FalconePage } from './app.po';

describe('falcone App', function() {
  let page: FalconePage;

  beforeEach(() => {
    page = new FalconePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
