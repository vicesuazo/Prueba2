import { Component, OnInit } from '@angular/core';
import { Camera, CameraPhoto, CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
  public selfieData: string | undefined;
  
  constructor() { }

  ngOnInit() {
    
  }
  async takeSelfie() {
    const image: CameraPhoto = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    this.selfieData = image.dataUrl;
  }
  displayPhoto(photoDataUrl: string) {
    // Lógica para mostrar la foto en tu vista
    this.selfieData = photoDataUrl;
  }
}
