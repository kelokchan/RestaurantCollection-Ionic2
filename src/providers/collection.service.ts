import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { AuthService } from './auth.service';

import { RestaurantDetail } from '../models/restaurant-detail'

import firebase from 'firebase';

@Injectable()
export class CollectionService {
  public currentUser: any;
  public collection: any;

  constructor(public af: AngularFire, public authService: AuthService) {

  }

  getCollection(): any {
    // this.collection = this.af.database.list('collections/' + this.authService.userID);
    this.collection = firebase.database().ref('collections/' + this.authService.userID);
    return this.collection;
  }

  addToCollection(restaurantDetail: RestaurantDetail, thumbnail: string): any {
    return this.collection.child(restaurantDetail.place_id)
      .set({
        place_id: restaurantDetail.place_id,
        name: restaurantDetail.name,
        address: restaurantDetail.formatted_address,
        coords: restaurantDetail.geometry.location.lat + "," + restaurantDetail.geometry.location.lng,
        restaurantURL: restaurantDetail.url,
        thumbnailURL: thumbnail
      })
      .catch(err => console.log(err));
  }

  removeFromCollection(key: string): any {
    return this.collection.child(key).remove();
  }


}
