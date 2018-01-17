import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {FileService} from '../services/file.service';
import {GalleryComponent} from './gallery/gallery.component';
import {ImageComponent} from './image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    GalleryComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule, HttpModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule {}
