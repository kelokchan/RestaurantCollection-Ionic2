import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service'

/*
  Generated class for the Popover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  template: `
      <button ion-item (click)="logout()">Logout</button>
  `
})

export class PopoverPage {

  constructor(public viewCtrl: ViewController, public authService: AuthService) { }

  logout() {
    this.viewCtrl.dismiss();
    this.authService.logoutUser();
  }

}
