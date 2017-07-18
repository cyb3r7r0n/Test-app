import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { LoginProvider } from '../../providers/login/login';
import { UserStatusProvider } from '../../providers/user-status/user-status';
import {StartUpPage} from "../start-up/start-up";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public login: LoginProvider,
              public userStatus: UserStatusProvider,
              public navCtrl: NavController) {

  }

  logout(){
    this.navCtrl.setRoot(StartUpPage);
    this.login.logout();
  }


}
