import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { User } from '../user/user.model';
import {UserStatusProvider} from '../user-status/user-status'
import { UserProvider } from '../user/user';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public storage: Storage,
              public userStatus: UserStatusProvider,
              public userProvider: UserProvider,
              public toastCtrl: ToastController) {

  }

  signUp(user: User): any{
    console.log('Signing up for user', user);
    return this.storage.get(user.username)
  }

  loginUser( username: string, password: string): any{
    console.log('logging in user', username, password);
    return this.storage.get(username);
  }

  getUser(username: string): User{
    let user: User = null;
    this.storage.get(username).then((val) =>
      {user = val;}
    )
    return user;
  }

  createUser(user: User){
    this.storage.set(user.username, user);
  }

  logout(){
    this.userStatus.setUserStatus(false);
    this.userStatus.setCurrentUser(this.userProvider.dummyUser);
    let toast = this.toastCtrl.create({
      message:'Logged Out Successfully',
      duration: 2000
    });
    toast.present();
  }

  updateProfileImage(FilePath){
    this.userStatus.getCurrentUser().then((val) =>
    {
      val.setImage(FilePath);
      this.userStatus.updateUser(val);
    });
  }

  changeUsername(currentusername: string, updatedusername: string){
    this.storage.get(currentusername).then((user) =>{
      user.username = updatedusername;
      this.storage.set(updatedusername, user);
      this.storage.remove(currentusername).then(() => console.log("user", currentusername, 'removed'));
      console.log('username changed to', updatedusername);
      this.userStatus.setCurrentUser(user);
    });
  }


  changePassword(currentusername: string, updatedpassword: string){
    this.storage.get(currentusername).then((user) =>{
      user.password = updatedpassword;
      this.storage.set(currentusername, user);
      console.log('password changed to', updatedpassword);
      this.userStatus.setCurrentUser(user);
    });
  }

  changeEmail(currentusername: string, updatedEmail: string) {
    this.storage.get(currentusername).then((user) => {
      user.email = updatedEmail;
      this.storage.set(currentusername, user);
      console.log('email changed to', updatedEmail);
      this.userStatus.setCurrentUser(user);
    });
  }


  changePhone(currentusername: string, updatedPhone: string){
    this.storage.get(currentusername).then((user) =>{
      user.phone = updatedPhone;
      this.storage.set(currentusername, user);
      console.log('phone changed to', updatedPhone);
      this.userStatus.setCurrentUser(user);
    });
  }


}
