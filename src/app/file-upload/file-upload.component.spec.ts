import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {FileUploadComponent} from './file-upload.component';
import {Image} from '../model/Image';
import {FileService} from '../../services/file.service';

describe('FileUploadComponent', () => {
  let testImage: Image;
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  const fileServiceMock = jasmine.createSpyObj('FileService', ['upload']);

  beforeEach(async(() => {
    testImage = new Image();
    testImage.url = 'http://test-domain/test-image.png';
    fileServiceMock.upload.and.returnValue(Observable.of(testImage));
    TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      providers: [{provide: FileService, useValue: fileServiceMock}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
