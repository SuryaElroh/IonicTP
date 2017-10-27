import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Create Two variables to give a name and a number version to our app
  app: any = {name: String, version:Number};

  constructor(public navCtrl: NavController) {
    this.app.name = "AppName";
    this.app.version = 3.0;
  }

}
