import {Component, ViewChild} from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { StartUpPage } from '../pages/start-up/start-up';
import { UserStatusProvider } from '../providers/user-status/user-status';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = StartUpPage;
  loader : any;

  // pages: Array<{title: string, component: any}>;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public userStatus: UserStatusProvider,
              public loadingCtrl: LoadingController,) {

    // this.pages = [
    //   { title: 'Home', component: HomePage },
    // ];

    platform.ready().then(() => {
      statusBar.overlaysWebView(true);
      statusBar.hide();
      splashScreen.hide();
    });

    this.presentLoading();

    this.userStatus.getUserStatus().then((val) => {
      if(val){
        this.rootPage = HomePage;
      }
      else{
        this.rootPage = StartUpPage;
      }
    });

    this.loader.dismiss();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

  // openPage(page) {
  //   this.nav.setRoot(page.component);
  // }
}

