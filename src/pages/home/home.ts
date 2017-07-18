import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';


import { LoginProvider } from '../../providers/login/login';
import { UserStatusProvider } from '../../providers/user-status/user-status';
import {StartUpPage} from "../start-up/start-up";
import {PopoverPage} from "../popover/popover";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public login: LoginProvider,
              public userStatus: UserStatusProvider,
              public navCtrl: NavController,
              public popoverCtrl: PopoverController) {

  }

  logout(){
    this.navCtrl.setRoot(StartUpPage);
    this.login.logout();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
