import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StartUpPage } from '../pages/start-up/start-up';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

import { UserStatusProvider } from '../providers/user-status/user-status';
import { LoginProvider } from '../providers/login/login';
import { UserProvider } from '../providers/user/user';
import { MainScreenNavProvider } from '../providers/main-screen-nav/main-screen-nav';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StartUpPage,
    EditProfilePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StartUpPage,
    EditProfilePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserStatusProvider,
    LoginProvider,
    UserProvider,
    File,
    Transfer,
    Camera,
    FilePath,
    MainScreenNavProvider
  ]
})
export class AppModule {}
