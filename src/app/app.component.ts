import {Component, OnInit} from '@angular/core';
import {FileService} from '../services/file.service';
import {Image} from './model/Image';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {GalleryComponent} from './gallery/gallery.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Image Gallery';
  errorMessage: string;
  images: Array<Image> = [];

  refreshImages(newImage) {
    if (newImage.url) {
      this.images.push(newImage);
    }
  }

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
}
