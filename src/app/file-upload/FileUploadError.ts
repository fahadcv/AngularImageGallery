/**
 * New typescript file
 */
export class FileUploadError {
  file: string;
  error: string;
  FileUploadError(file, error) {
    this.file = file;
    this.error = error;
  }
}
