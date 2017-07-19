import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
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
              public login: LoginProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController){
  }

  expandItem(item){
    this.expanded[item] = !this.expanded[item];
  }

  changeUsername(updated: string){
    this.presentLoading("Changing Username...");
    var message = this.login.validateUsername(updated);
    if(!message.status){
      this.showAlert('change Username',message.message);
      this.loader.dismiss();
      return;
    }
    this.login.getUser(updated).then((val) => {
      if(val){
        this.showAlert('change Username','Username already taken');
        this.loader.dismiss();
        return;
      } else{
        this.login.changeUsername(this.userStatus.currentUser.username, updated);
        console.log("changing username to", updated);
        this.expanded['username'] = !this.expanded['username'];
        this.loader.dismiss();
      }
    });
  }

  changePassword(updated: string, confirm: string){
    this.presentLoading("Changing Password...");
    var message = this.login.validatePassword(updated, confirm);
    if(!message.status){
      this.showAlert('change Password',message.message);
      this.loader.dismiss();
      return;
    }
    this.login.changePassword(this.userStatus.currentUser.username, updated);
    console.log("changing password to", updated);
    this.expanded['password'] = !this.expanded['password'];
    this.loader.dismiss();
  }

  changeEmail(updated: string){
    this.presentLoading("Changing Email...");
    var message = this.login.validateEmail(updated);
    if(!message.status){
      this.showAlert('change Email',message.message);
      this.loader.dismiss();
      return;
    }
    this.login.changeEmail(this.userStatus.currentUser.username, updated);
    console.log("changing email to", updated);
    this.expanded['email'] = !this.expanded['email'];
    this.loader.dismiss();
  }

  changePhone(updated: string){
    this.presentLoading("Changing Phone Number...");
    var message = this.login.validatePhone(parseInt(updated));
    if(!message.status){
      this.showAlert('change Phone Number',message.message);
      this.loader.dismiss();
      return;
    }
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

  showAlert(method: string, message: string) {
    let alert = this.alertCtrl.create({
      title: 'Failed to '+method,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
