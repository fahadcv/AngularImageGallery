import {Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {

  errors: Array<string> = [];
  dragAreaClass: string;
  @Input() accept: '*/*';
  @Input() maxFiles: 5;
  @Input() maxSize: 5; // 5MB
  @Output() uploadStatus = new EventEmitter();

  constructor(private fileService: FileService) {}

  onFileChange(event) {
    const files = event.target.files;
    this.saveFiles(files);
  }

  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    this.saveFiles(files);
  }

  saveFiles(files) {
    this.errors = []; // Clear error
    // Validate file size
    if (files.length > 0 && (!this.isValidFiles(files))) {
      this.uploadStatus.emit(false);
      return;
    }
    if (files.length > 0) {
      for (let j = 0; j < files.length; j++) {
        const formData: FormData = new FormData();
        formData.append('file', files[j], files[j].name);
        const parameters = {};
        this.doUpload(formData, parameters);
      }
    }
  }

  private doUpload(formData, parameters) {

    this.fileService.upload(formData, parameters)
      .subscribe(
      success => {
        this.uploadStatus.emit(success);
      },
      errorResponse => {
        this.uploadStatus.emit(errorResponse);
        this.errors.push(errorResponse.fileName + ' : ' + errorResponse.error.message);
      });
  }
  private isValidFiles(files) {
    // Check Number of files
    if (files.length > this.maxFiles) {
      this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
      return;
    }
    for (let i = 0; i < files.length; i++) {
      // Check file size
      this.isValidFileSize(files[i]);
    }
    return this.errors.length === 0;
  }


  private isValidFileSize(file) {
    const fileSizeinMB = file.size / (1024 * 1000);
    const size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
    if (size > this.maxSize) {
      this.errors.push('Error (File Size): ' + file.name + ': exceed file size limit of ' + this.maxSize + 'MB ( ' + size + 'MB )');
    }
  }

  ngOnInit() {
    this.dragAreaClass = 'droparea';
  }

}
