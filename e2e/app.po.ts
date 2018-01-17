import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAppTitle() {
    return element(by.css('app-root h2')).getText();
  }
  getPageTitle() {
    return browser.getTitle();
  }

  getFileUpload() {
    return element(by.css('app-file-upload'));
  }

  getFileUploadButton() {
    return element(by.css('app-file-upload button'));
  }

  getImageGallery() {
    return element(by.css('app-gallery'));
  }

  getImages() {
    return element(by.css('app-image'));
  }
}
