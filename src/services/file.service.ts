import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FileService {
  _baseURL = '/api/files';
  constructor(private http: Http) {}

  upload(files, parameters) {
    const headers = new Headers();
    const options = new RequestOptions({headers: headers});
    options.params = parameters;
    return this.http.post(this._baseURL, files, options)
      .map(response => response.json())
      .catch(error => Observable.throw(error));

  }
  getImages() {
    return this.http.get(this._baseURL)
      .map(response => response.json())
      .catch(error => Observable.throw(error));
  }
}
