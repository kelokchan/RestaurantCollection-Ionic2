import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {
  user = { email: '', password: '' };
  loader: any;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public toastCtrl: ToastController, public authService: AuthService) { }

  signupUser() {
    if (this.user.password.length < 6) {
      this.showError("Password has to be more than 6 characters");
      return;
    }

    this.authService.signupUser(this.user.email, this.user.password).then(() => {
      this.presentToast("Sucessful signup");
    }, (error) => {
      this.showError(error.message);
    });

    this.loader = this.loadingCtrl.create({
      content: 'Creating account',
      dismissOnPageChange: true,
    });
    this.loader.present();
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'middle',
      duration: 2500
    });
    toast.present();
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
