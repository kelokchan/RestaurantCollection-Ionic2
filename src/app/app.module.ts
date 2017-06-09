import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';


import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Geolocation} from "@ionic-native/geolocation";
import {LocationAccuracy} from "@ionic-native/location-accuracy";
import {Keyboard} from "@ionic-native/keyboard";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {SocialSharing} from "@ionic-native/social-sharing";
import {Ionic2RatingModule} from 'ionic2-rating';

// Import pages
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
import {SignupPage} from '../pages/signup/signup';
import {PopoverPage} from '../pages/popover/popover';
import {SearchPage} from '../pages/search/search';
import {DetailPage} from '../pages/detail/detail';

// Import firebase
import {AngularFireModule} from 'angularfire2';
import {FirebaseConfig, FirebaseAuthConfig} from '../config/config';

// Import providers
import {AuthService} from '../providers/auth.service';
import {CollectionService} from '../providers/collection.service';
import {SearchService} from '../providers/search.service';
import {DetailService} from '../providers/detail.service';
import {CoordService} from '../providers/coord.service';
import {LaunchNavigator} from "@ionic-native/launch-navigator";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    PopoverPage,
    SearchPage,
    DetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig, FirebaseAuthConfig),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    PopoverPage,
    SearchPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LocationAccuracy,
    Keyboard,
    InAppBrowser,
    SocialSharing,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    CollectionService,
    SearchService,
    DetailService,
    CoordService
  ]
})
export class AppModule {
}
