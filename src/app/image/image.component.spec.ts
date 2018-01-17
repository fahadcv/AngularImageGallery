import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ImageComponent} from './image.component';
import {Image} from '../model/Image';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let imgThumbnailEl;
  const imgSrcURL = 'http://my-test-domain/My Test Image.png';
  const imgSrcEncodeURI = encodeURI(imgSrcURL);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    component.image = new Image();
    component.image.url = imgSrcURL;
    fixture.detectChanges();
    imgThumbnailEl = fixture.debugElement.query(By.css('.thumbnail'));

  });
  afterEach(() => {
    component = null;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Image should loaded in thumbnail view', () => {
    fixture.detectChanges();
    expect(imgThumbnailEl.nativeElement.src).toBe(imgSrcEncodeURI);

  });

  it('Image should loaded in img-container view when click on thumbnail ', () => {
    let imgContainerEl = fixture.debugElement.query(By.css('.img-container'));

    imgThumbnailEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(imgThumbnailEl.nativeElement.src).toBe(imgSrcEncodeURI);
    let imgZoomInContainerEl = fixture.debugElement.query(By.css('.zoomIn img'));
    expect(imgZoomInContainerEl.nativeElement.src).toBe(imgSrcEncodeURI);

  });

  it('ZoomIn Image should hide when click on zoomIn Image ', () => {
    // Set zoom class as zoomIn
    component.zoomClass = 'zoomIn';
    fixture.detectChanges();

    expect(imgThumbnailEl.nativeElement.src).toBe(imgSrcEncodeURI);
    let imgZoomInContainerEl = fixture.debugElement.query(By.css('.zoomIn img'));
    expect(imgZoomInContainerEl).toBeTruthy();

    // Click img container to hide the zoom image
    let imgContainerEl = fixture.debugElement.query(By.css('.img-container'));
    imgContainerEl.triggerEventHandler('click', null);
    fixture.detectChanges();
    imgZoomInContainerEl = fixture.debugElement.query(By.css('.zoomIn img'));
    expect(imgZoomInContainerEl).toBeNull();

    let imgZoomOutContainerEl = fixture.debugElement.query(By.css('.zoomOut img'));
    expect(imgZoomOutContainerEl).toBeTruthy();

  });

});
