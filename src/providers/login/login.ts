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

  getUser(username: string){
    return this.storage.get(username);
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

  validateUsername(updated: string){
    if(this.userStatus.currentUser.username == updated){
      return { status: false, message: 'Username not changed'};
    }
    else if(!updated || this.trim(updated)==""){
      return { status: false, message: 'Kinly enter a valid username'};
    }
    else if(updated.length<=3 || updated.length>=25){
      return {status: false, message:'Username can have a maximum length of 25 and mininmum length of 3'};
    }
    else{
      return {status: true, message: ""};
    }
  }

  validateEmail(updated: string){
    if(this.userStatus.currentUser.email == updated){
      return { status: false, message: 'Email not changed'};
    }
    else if(!updated || this.trim(updated)==""){
      return { status: false, message: 'Kinly enter a valid email'};
    }
    else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(updated))  ){
      return {status: false, message: 'Please enter a valid email address'};
    }
    else{
      return {status: true, message: ''};
    }
  }

  validatePhone(updated: number){
    if(this.userStatus.currentUser.phone == updated){
      return { status: false, message: 'Phone Number not changed'};
    }
    else if(!updated){
      return { status: false, message: 'Enter a valid phone number'};
    }
    else if(updated/1000000000<1 || updated/1000000000>10){
      return {status: false, message:'Enter a valid Phone Number'};
    }
    else{
      return {status: true, message: ''};
    }
  }

  validatePassword(updated: string, confirm: string){
    if(this.userStatus.currentUser.username == updated){
      return { status: false, message: 'Password not changed'};
    }
    else if(!updated || this.trim(updated)==""){
      return { status: false, message: 'Kinly enter a valid password'};
    }
    else if(updated!==confirm){
      return {status: false, message: 'Passwords do not match'}
    }
    else if(updated.length<=5 || updated.length>=25){
      return {status: false, message:'Password can have a maximum length of 25 and mininmum length of 5'};
    }
    else{
      return {status: true, message: ''};
    }
  }

  trim(value: string){
    return value.replace(/ /gi, "");
  }


}
