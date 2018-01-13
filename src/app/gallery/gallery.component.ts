import { Component, OnInit, Input } from '@angular/core';
import {FileService} from '../../services/file.service';
import {Image} from '../model/Image';

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
