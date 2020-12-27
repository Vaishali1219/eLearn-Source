import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageToShow: any;
  imageurl: any;

  constructor(private sanitizer: DomSanitizer) { }

  createImageFromBlob(img: any) {
    let objectUrl = 'data:image/jpeg;base64,' + img;

    this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    return this.imageToShow;
  }

  b64toFile(dataURI): any {

    let TYPED_ARRAY = new Uint8Array(dataURI);
    const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
    //const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
    //  return data + String.fromCharCode(byte);
    //}, '');
    let base64String = btoa(STRING_CHAR);
    this.imageurl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, '+ base64String);

    return this.imageurl;

    //// convert the data URL to a byte string
    //const byteString = atob(dataURI.split(',')[1]);

    //// pull out the mime type from the data URL
    //const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    //// Convert to byte array
    //const ab = new ArrayBuffer(byteString.length);
    //const ia = new Uint8Array(ab);
    //for (let i = 0; i < byteString.length; i++) {
    //  ia[i] = byteString.charCodeAt(i);
    //}

    //// Create a blob that looks like a file.
    //const blob = new Blob([ab], { 'type': mimeString });
    //blob['lastModifiedDate'] = (new Date()).toISOString();
    //blob['name'] = 'file';

    //// Figure out what extension the file should have
    //switch (blob.type) {
    //  case 'image/jpeg':
    //    blob['name'] += '.jpg';
    //    break;
    //  case 'image/png':
    //    blob['name'] += '.png';
    //    break;
    //}
    //// cast to a File
    //return <File>blob;
  }
}
