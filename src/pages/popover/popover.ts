import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {StartUpPage} from "../start-up/start-up";
import {LoginProvider} from "../../providers/login/login";

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public login: LoginProvider) {
  }

  close() {
    this.viewCtrl.dismiss();
  }

  logout(){
    this.navCtrl.setRoot(StartUpPage);
    this.login.logout();
  }

}
