import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Image} from './model/Image';
import {FileService} from '../services/file.service';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {GalleryComponent} from './gallery/gallery.component';
import {ImageComponent} from './image/image.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('AppComponent', () => {
  let testImages: Array<Image> = [];
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const fileServiceMock = jasmine.createSpyObj('FileService', ['getImages']);

  beforeEach(async(() => {
    fileServiceMock.getImages.and.returnValue(Observable.of(testImages));
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, FileUploadComponent, GalleryComponent, ImageComponent
      ],
      providers: [{provide: FileService, useValue: fileServiceMock}]
    }).compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    for (let i = 0; i < 5; i++) {
      let img = new Image();
      img.url = 'http://test-' + i;
      testImages.push(img);
    }
    fixture.detectChanges();

  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  it(`should have as title 'Image Gallery'`, async(() => {
    expect(app.title).toEqual('Image Gallery');
  }));
  it('should render title in a h2 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Image Gallery');
  }));

  it('should load all the avaiabe images onInit ', async(() => {
    expect(app.images).toEqual(testImages);
  }));

  it('should update image with url on refreshImages', () => {
    let newTestImage = new Image();
    newTestImage.url = 'http://test/new/image';
    app.refreshImages(newTestImage);
    expect(app.images).toContain(newTestImage);

  });

  it('should NOT update image withOUT url on refreshImages', () => {
    let newTestImage = new Image();
    newTestImage.fileName = 'testme.png';
    app.refreshImages(newTestImage);
    expect(app.images).not.toContain(newTestImage);

  });
});
