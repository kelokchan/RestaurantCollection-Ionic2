import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  public userID: string;

  constructor(public af: AngularFire) {
  }

  loginUser(email: string, password: string): any {
    return this.af.auth.login({ email: email, password: password });
  }

  signupUser(email: string, password: string): any {
    return this.af.auth.createUser({ email: email, password: password }).then((newUser) => {
      this.af.auth.login({ email: email, password: password }).then((authenticatedUser) => {
        let userNode = this.af.database.object('users/' + authenticatedUser.uid);

        userNode.set({
          name: authenticatedUser.auth.displayName !== null ? authenticatedUser.auth.displayName : email.substring(0, email.lastIndexOf("@")),
          email: email,
          provider: authenticatedUser.auth.providerData[0].providerId
        })
      });
    });
  }

  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.af.auth.logout();
  }

}
