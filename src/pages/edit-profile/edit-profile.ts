import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserStatusProvider } from '../../providers/user-status/user-status';
import {expand} from "rxjs/operator/expand";

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  itemExpanded: boolean = true;
  itemExpandHeight = 200;

  expanded = {
    username: false,
    password: false,
    email: false,
    phone: false
  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userStatus: UserStatusProvider) {
  }

  expandItem(item){
    this.expanded[item] = !this.expanded[item];
  }
}
