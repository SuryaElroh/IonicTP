import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html'
})
export class PhotoPage {
  img: string;
  mv: any;

  constructor(public navCtrl: NavController,
              public camera: Camera,
              public mediaCapture: MediaCapture,
              public base64ToGallery: Base64ToGallery,
              public  alertCtrl: AlertController) {
  }

  options: CaptureVideoOptions = { limit: 2 };

  takeVideo(){
    this.mediaCapture.captureVideo(this.options)
      .then((data: MediaFile[]) => {
          let d = data;
        },
        (err: CaptureError) => console.error(err)
      );
  }

  // Define the options for the camera use
  // options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }

  // Function : open the camera
  takePic(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.img = 'data:image/jpeg;base64,' + imageData;
      this.base64ToGallery.base64ToGallery(imageData, { prefix: '_img' }).then(
        res => {
          let alert = this.alertCtrl.create({
            title: 'Sauvegarde effectuée',
            subTitle: 'le fichier a été sauvegardé dans votre gallerie',
            buttons: ['OK']
          });
          alert.present();
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Erreur',
            subTitle: 'Une erreur est survenue lors de la sauvegarde, veuillez réessayer. ',
            buttons: ['OK']
          });
          alert.present();
      }
      );
    }, (err) => {
      console.log(err);
    });
  }
}
