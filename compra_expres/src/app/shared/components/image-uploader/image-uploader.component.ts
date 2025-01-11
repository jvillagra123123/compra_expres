import { Component, EventEmitter, Output  } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  standalone: false,

})
export class ImageUploaderComponent  {
  imageUrl: string | undefined;

  @Output() imageSelected = new EventEmitter<string>();

  async uploadImage() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 90,
    });
    this.imageUrl = image.dataUrl;
    this.imageSelected.emit(this.imageUrl);

  }
 
}
