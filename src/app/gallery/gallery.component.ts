import { Component, OnInit, Input } from '@angular/core';
import {Image} from '../model/Image';
import {ImageComponent} from '../image/image.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @Input() images: Array<Image> = [];
  constructor() { }

  ngOnInit() {
  }

}
