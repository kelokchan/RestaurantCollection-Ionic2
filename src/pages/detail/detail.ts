import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import { AngularFire } from 'angularfire2';

import { RestaurantDetail } from '../../models/restaurant-detail';

import { AuthService } from '../../providers/auth.service';
import { DetailService } from '../../providers/detail.service';
import { CollectionService } from '../../providers/collection.service';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})

export class DetailPage {

  restaurantID: string;
  restaurantDetail: RestaurantDetail;
  formattedOpeningHours: { day: string, time: string }[] = [];
  resExistsInCollection: boolean;

  photos: Array<any> = [];

  mySlideOptions = {
    initialSlide: 0,
    autoplay: 4500,
    loop: this.photos.length > 1,
    pager: true
  };


  constructor(public navCtrl: NavController, public params: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController, public authService: AuthService, public detailService: DetailService, public collectionService: CollectionService, public af: AngularFire, private launchNavigator: LaunchNavigator, private socialSharing: SocialSharing) {
    this.restaurantID = params.get('restaurantID');
    this.checkIfExistInCol(this.restaurantID);

  }

  ngAfterViewInit() {
    this.detailService.getPlaceDetails(this.restaurantID)
      .subscribe(
      response => {
        if (response.result) {
          console.log(response.result);
          this.restaurantDetail = response.result;

          if (this.restaurantDetail.opening_hours)
            this.formatOpeningHours(this.restaurantDetail);

          if (this.restaurantDetail.photos)
            this.getPhotos(this.restaurantDetail.photos.splice(0, 3));

        }
      },
      err => this.presentToast(err));
  }

  checkIfExistInCol(restaurantID: string) {
    const restaurant = this.af.database.object('collections/' + this.authService.userID + "/" + restaurantID);
    restaurant.subscribe(data => {
        this.resExistsInCollection = (data.$value !== null);
    });
  }

  addToCollection(restaurantDetail: RestaurantDetail) {
    let thumbnail = this.photos.length ? this.photos[0] : restaurantDetail.icon;
    this.collectionService.addToCollection(restaurantDetail, thumbnail);
    this.presentToast("Added to collection!");
  }

  removeFromCollection(restaurantID: string) {
    let confirm = this.alertCtrl.create({
      title: 'Confirm remove',
      message: 'Are you sure you want to remove this restaurant from your collection?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.collectionService.removeFromCollection(restaurantID);
            this.resExistsInCollection = false;
            this.presentToast("Removed from collection");
          }
        }
      ]
    });
    confirm.present();
  }

  share(restaurant: RestaurantDetail) {
    this.socialSharing.share(`Hey take a look at ${restaurant.name}! #Collection`, null, null, restaurant.url);
  }

  navigateToRestaurant(restaurant: RestaurantDetail) {
    //window.open(`geo:${restaurant.geometry.location.lat},${restaurant.geometry.location.lng}?q=${restaurant.name}`, '_system');
    this.launchNavigator.navigate([restaurant.geometry.location.lat, restaurant.geometry.location.lng]);
  }

  launchUrl(websiteURL: string) {
    window.open(websiteURL, '_system', 'location=yes');
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }

  formatOpeningHours(restaurantDetail: RestaurantDetail) {
    restaurantDetail.opening_hours.weekday_text.forEach(
      (day) => {
        this.formattedOpeningHours.push({
          day: day.substring(0, day.indexOf(":")),
          time: day.substring(day.indexOf(":") + 1)
        });
      }
    )
  }

  getPhotos(photoReferences: any[]) {
    photoReferences.forEach(
      (photoReference) => {
        this.detailService.getPlaceDetailsPhoto(photoReference.photo_reference)
          .subscribe(
          photo => this.photos.push(photo)
          )
      }
    )
  }
}
