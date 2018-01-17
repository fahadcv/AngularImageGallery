import {async, getTestBed, TestBed} from '@angular/core/testing';
import {BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {Image} from '../app/model/Image';
import {FileService} from './file.service';

describe('FileService', () => {
  let backend: MockBackend;
  let service: FileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        FileService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });
    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(FileService);
  }));

  function setupTestdata(options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      if (connection.request.url === '/api/files') {
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);

        connection.mockRespond(response);
      }
    });
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from backend', (done: DoneFn) => {
    setupTestdata({
      body: [
        {
          id: 'test1',
          filenName: 'test1',
          url: 'http://test-domain.com/test1'
        },
        {
          id: 'test2',
          filenName: 'test2',
          url: 'http://test-domain.com/test2'
        },
        {
          id: 'test3',
          filenName: 'test3',
          url: 'http://test-domain.com/test3'
        }
      ],
      status: 200
    });

    service.getImages().subscribe((data: Image[]) => {
      expect(data.length).toBe(3);
      expect(data[0].url).toBe('http://test-domain.com/test1');
      expect(data[1].url).toBe('http://test-domain.com/test2');
      expect(data[2].url).toBe('http://test-domain.com/test3');
      done();
    });
  });

  it('should upload file to backend', (done: DoneFn) => {
    setupTestdata({
      body: {
        id: 'newtest',
        filenName: 'newtest',
        url: 'http://test-domain.com/newtest'
      },
      status: 201
    });
    const formData: FormData = new FormData();

    const parameters = {};
    service.upload(formData, parameters).subscribe((data: Image) => {
      expect(data.url).toBe('http://test-domain.com/newtest');
      done();
    });
  });

});
