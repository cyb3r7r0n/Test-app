import {Component, Renderer, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UserStatusProvider } from '../../providers/user-status/user-status';
import { LoginProvider } from '../../providers/login/login';
import { UserProvider } from '../../providers/user/user';
import { ToastController } from 'ionic-angular';
import {User} from "../../providers/user/user.model";
import { HomePage } from '../home/home';


/**
 * Generated class for the StartUpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-start-up',
  templateUrl: 'start-up.html',
})
export class StartUpPage {

  @ViewChild('background', {read: ElementRef}) background;
  @ViewChild('login', {read: ElementRef}) login;
  @ViewChild('heading', {read: ElementRef}) heading;
  @ViewChild('loginForm', {read: ElementRef}) loginForm;
  @ViewChild('front', {read: ElementRef}) front;
  @ViewChild('back', {read: ElementRef}) back;

  private SIGNUP : FormGroup;
  private LOGIN : FormGroup;

  isLogginIn = true;
  flipped = false;
  loader: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public renderer: Renderer,
              private formBuilder: FormBuilder,
              private loginProvider: LoginProvider,
              private userstatus:UserStatusProvider,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {

    this.SIGNUP = this.formBuilder.group({
      username:["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      number: [null, Validators.required],
      check: [true]
    });

    this.LOGIN = this.formBuilder.group({
      username:[""],
      password:[""],
      check:[true],
    });

    this.LOGIN.valueChanges.subscribe((data) => console.log(data));
  }

  ionViewDidLoad() {
  }

  loadLogin(){
    this.renderer.setElementStyle(this.loginForm.nativeElement, 'display', 'block');
    this.renderer.setElementStyle(this.background.nativeElement, 'filter', 'blur(3px)');
    // this.renderer.setElementStyle(this.background.nativeElement, 'width', '110%');
    // this.renderer.setElementStyle(this.background.nativeElement, 'left', '-5%');
    this.renderer.setElementStyle(this.login.nativeElement, 'left', '100%');
    this.renderer.setElementStyle(this.loginForm.nativeElement, 'right', '0%');
    this.renderer.setElementStyle(this.heading.nativeElement, 'top', '5%');
  }

  flip(){
    this.flipped = !this.flipped;
    this.isLogginIn = !this.isLogginIn;

    if(this.flipped){
      this.renderer.setElementStyle(this.front.nativeElement, 'display', 'none');
      this.renderer.setElementStyle(this.back.nativeElement, 'display', 'block');
    } else{
      this.renderer.setElementStyle(this.front.nativeElement, 'display', 'block');
      this.renderer.setElementStyle(this.back.nativeElement, 'display', 'none');
    }
  }

  onSubmit( form: any){
    // console.log(form);
    // console.log(this.validateLogin());
    this.presentLoading('Logging In...');
    if(this.isLogginIn){

      var message = this.validateLogin();
      if (!message.status){
        this.showAlert("Login",message.message);
        this.loader.dismiss();
        return;
      }

      let promise = this.loginProvider.loginUser(form['username'], form['password']);
      promise.then((val) =>{
        if(val){
          if(form.password === val.password){
            this.userstatus.setCurrentUser(val);
            if(form.check){
              this.userstatus.setUserStatus(true);
              console.log('user clicked remeber me');
            } else{
              this.userstatus.setUserStatus(false);
              console.log('user did not click remeber me');
            }
            let toast = this.toastCtrl.create({
              message:'Logged in Successfully',
              duration: 2000
            });
            this.openPage(HomePage);
            toast.present();
          }else{
            this.showAlert("Login","Kindly check your password");
          }
        }
        else{
          this.showAlert("Login","No user with username: "+form.username+" exists.");
        }
      });
    } else {

      var message = this.validateSignup();
      if (!message.status){
        this.showAlert("Sign Up", message.message);
        this.loader.dismiss();
        return;
      }

      let user: User = new User({
        username: form.username,
        password: form.password,
        phone: form.number,
        email: form.email
      });
      let promise = this.loginProvider.signUp(user);
      promise.then((val) =>
      {
        if(val){
          this.showAlert("Sign Up","User with username: "+ form.username+" already exists,\nKindly select another username");
        }
        else{
          this.loginProvider.createUser(user);
          this.userstatus.setCurrentUser(user);
          if(form.check){
            this.userstatus.setUserStatus(true);
          }else {
            this.userstatus.setUserStatus(false)
          }
          this.openPage(HomePage);
        }
      });
    }
    this.loader.dismiss();
  }

  validateLogin(){
    if(!this.LOGIN['username'] || this.trim(this.LOGIN['username'])==""){
      return {status: false, message:'Please enter a valid username'};
    }
    else if(!this.LOGIN['password']){
      return {status: false, message: 'Please enter a valid password'};
    }
    else if(!this.LOGIN['password']){
      return {status: false, message:'Please enter a valid password'};
    }
    else{
      return {status: true, message:""};
    }
  }

  validateSignup(){
    if(!this.SIGNUP['username'] || this.trim(this.SIGNUP['username'])==""){
      return {status: false, message:'Please enter a valid username'};
    }
    else if(this.SIGNUP['username'].length<=3 || this.SIGNUP['username'].length>=25){
      return {status: false, message:'The username should have characters between 3 and 25'};
    }
    else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.SIGNUP['email']))  ){
      return {status: false, message: 'Please enter a valid email address'};
    }
    else if(!this.SIGNUP['password']){
      return {status: false, message:'Please enter a valid password'};
    }
    else if(this.SIGNUP['password'].length<=5){
      return {status: false, message:'The password should have atleast 6 characters'};
    }
    else if(this.SIGNUP['number']/1000000000<1 || this.SIGNUP['number']/1000000000>10){
      return {status: false, message: 'Please enter a valid mobile number'};
    }
    else{
      return {status: true, message:""};
    }
  }

  trim(value: string){
    return value.replace(/ /gi, "");
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

  openPage(page){
    this.navCtrl.setRoot(page);
  }


}
