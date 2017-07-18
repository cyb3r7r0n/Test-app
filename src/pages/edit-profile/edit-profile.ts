import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import { UserStatusProvider } from '../../providers/user-status/user-status';
import {LoginProvider} from "../../providers/login/login";

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  itemExpanded: boolean = true;
  itemExpandHeight = 200;
  loader: any;

  expanded = {
    username: false,
    password: false,
    email: false,
    phone: false
  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userStatus: UserStatusProvider,
              public login: LoginProvider, public loadingCtrl: LoadingController){
  }

  expandItem(item){
    this.expanded[item] = !this.expanded[item];
  }

  changeUsername(updated: string){
    this.presentLoading("Changing Username...");
    this.login.changeUsername(this.userStatus.currentUser.username, updated);
    console.log("changing username to", updated);
    this.expanded['username'] = !this.expanded['username'];
    this.loader.dismiss();
  }

  changePassword(updated: string){
    this.presentLoading("Changing Password...");
    this.login.changePassword(this.userStatus.currentUser.username, updated);
    console.log("changing password to", updated);
    this.expanded['password'] = !this.expanded['password'];
    this.loader.dismiss();
  }

  changeEmail(updated: string){
    this.presentLoading("Changing Email...");
    this.login.changeEmail(this.userStatus.currentUser.username, updated);
    console.log("changing email to", updated);
    this.expanded['email'] = !this.expanded['email'];
    this.loader.dismiss();
  }

  changePhone(updated: string){
    this.presentLoading("Changing Phone Number...");
    this.login.changePhone(this.userStatus.currentUser.username, updated);
    console.log("changing phone number to", updated);
    this.expanded['phone'] = !this.expanded['phone'];
    this.loader.dismiss();
  }

  presentLoading(message: string){
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }
}
