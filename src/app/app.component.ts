import {Component, OnInit} from '@angular/core';

import {FileService} from '../services/file.service';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {GalleryComponent} from './gallery/gallery.component';
import {Image} from './model/Image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Image Gallery';
  errorMessage: string;
  images: Array<Image> = [];

  constructor(private fileService: FileService) {}
  ngOnInit() {
    this.getImageData();
  }

  getImageData() {
    this.fileService.getImages().subscribe(
      data => { this.images = data; },
      error => this.errorMessage = error
    );
  }

 refreshImages(newImage) {
    if (newImage.url) {
      this.images.push(newImage);
    }
  }

}
