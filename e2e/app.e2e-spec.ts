import {AppPage} from './app.po';

describe('image-gallery App E2E Test Suite', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have App title Image Gallery', () => {
    page.navigateTo();
    expect(page.getAppTitle()).toEqual('Image Gallery');
    page.getPageTitle()
      .then((title: string) => {
        expect(title).toEqual('Image Gallery');
      });
  });

  it('should have fileupload', () => {
    page.navigateTo();
    expect(page.getFileUpload()).toBeTruthy();
    expect(page.getFileUploadButton()).toBeTruthy();
  });

  it('should load Image Gallery', () => {
    page.navigateTo();
    expect(page.getImageGallery()).toBeTruthy();

  });


});
