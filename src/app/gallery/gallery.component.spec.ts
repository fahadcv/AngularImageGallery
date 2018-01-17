import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ImageComponent} from '../image/image.component';
import {GalleryComponent} from './gallery.component';
import {Image} from '../model/Image';
import {By} from '@angular/platform-browser';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  const imgSrcBaseURL = 'http://my-test-domain/';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageComponent, GalleryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    for (let i = 0; i < 5; i++) {
      let image = new Image();
      image.url = imgSrcBaseURL + 'test-' + i;
      component.images.push(image);
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    let imgContainerElements = fixture.debugElement.queryAll(By.css('app-image'));
    expect(imgContainerElements.length).toEqual(5);
  });
});
