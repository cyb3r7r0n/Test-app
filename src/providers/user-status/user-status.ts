import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {User} from "../user/user.model";
import { UserProvider } from '../user/user';

@Injectable()
export class UserStatusProvider {

  public isLoggedIn = false;
  public currentUser: User;

  constructor(private storage : Storage,
              public userProvider: UserProvider) {
    this.currentUser = this.userProvider.dummyUser;
    this.storage.get('isLoggedIn').then((val) =>{
      if(val){
        this.isLoggedIn = true;
        this.storage.get('current user').then( (val) =>{
          this.currentUser = val;
        });
      }
      else{
        this.isLoggedIn = false;
      }
    });
  }

  getUserStatus(){
    return this.storage.get('isLoggedIn');
  }

  setUserStatus(value: boolean){
    this.storage.set('isLoggedIn', value);
    this.isLoggedIn = value;
  }


  setCurrentUser(user: User){
    this.storage.set('current user', user);
    this.currentUser = user;
  }

  getCurrentUser(){
    return this.storage.get('current user');
  }

  updateUser( user: User){
    this.storage.set(user.username, user);
    this.currentUser = user;
  }
}
