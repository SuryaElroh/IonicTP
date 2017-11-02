import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html'
})
export class PhotoPage {
  img: string;
  mv: any;

  constructor(public navCtrl: NavController,
              private camera: Camera,
              private mediaCapture: MediaCapture,
              private base64ToGallery: Base64ToGallery,
              private  alertCtrl: AlertController,
              private localNotif: LocalNotifications) {
  }

  // Define the camera options for pictures
  pictureOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  // Function : call the camera to take picture
  takePic(){
    this.camera.getPicture(this.pictureOptions).then((imageData) => {
      // Get the taken picture
      this.img = 'data:image/jpeg;base64,' + imageData;

      // Save the picture into the phone gallery
      this.base64ToGallery.base64ToGallery(imageData, { prefix: '_img' }).then(
        res => {
          // Schedule a single notification
          this.localNotif.schedule({
            id: 1,
            text: 'Image sauvegardée',
            data: { secret: "success" }
          });
          // let alert = this.alertCtrl.create({
          //   title: 'Sauvegarde effectuée',
          //   subTitle: 'le fichier a été sauvegardé dans votre gallerie',
          //   buttons: ['OK']
          // });
          // alert.present();
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

  // Define the camera options for videos
  videoOptions: CaptureVideoOptions = { limit: 1 };

  // Function : call the camera to take video
  takeVideo(){
    this.mediaCapture.captureVideo(this.videoOptions)
      .then((data: MediaFile[]) => {
          this.mv = data[0].fullPath;
          let alert = this.alertCtrl.create({
            title: 'Sauvegarde effectuée',
            subTitle: 'la vidéo a bien été sauvegardé dans votre gallerie',
            buttons: ['OK']
          });
          alert.present();
        },
        (err: CaptureError) => {
          let alert = this.alertCtrl.create({
            title: 'Erreur : ',
            subTitle: 'erreur : ' + err,
            buttons: ['OK']
          });
          alert.present();
        }
      );
  }
}
