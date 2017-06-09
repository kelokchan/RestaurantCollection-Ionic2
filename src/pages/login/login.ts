import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';

import {SignupPage} from '../signup/signup'
import {ResetPasswordPage} from '../reset-password/reset-password';

import {AuthService} from '../../providers/auth.service'
/*
 Generated class for the Login page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loader:any;
  user = {email: '', password: ''};

  constructor(public navCtrl:NavController, private alertCtrl:AlertController, private loadingCtrl:LoadingController, public authService:AuthService) {
  }

  login() {

    // if (validateEmail(this.user.email)) {
    //   this.showError("Invalid email");
    //   return;
    // }

    if (this.user.password.length < 6) {
      this.showError("Password has to be more than 6 characters");
      return;
    }

    this.showLoading();
    this.authService.loginUser(this.user.email, this.user.password)
      .then((authData) => {
        this.loader.dismiss();
      })
      .catch((error) => {
        this.showError(error.message);
      })
  }

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  showLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loader.present();
  }

  showError(text) {
    if (this.loader) this.loader.dismiss();
    let prompt = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }

}
