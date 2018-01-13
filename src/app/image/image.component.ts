import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../model/Image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @Input() image: Image;
  zoomClass: string;
  constructor() { }

  ngOnInit() {
    this.zoomClass = 'zoomOut';
  }

  zoomIn(event) {
    this.zoomClass = 'zoomIn';
  }
  zoomOut() {
    this.zoomClass = 'zoomOut';
  }

}
