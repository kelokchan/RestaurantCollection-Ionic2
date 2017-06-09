import {Component, ViewChild} from '@angular/core';
import {
  NavController,
  PopoverController,
  Content,
  AlertController,
  ItemSliding,
  ToastController,
  Platform
} from 'ionic-angular';
import {AngularFire} from 'angularfire2';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
import {PopoverPage} from '../popover/popover';
import {SearchPage} from '../search/search';
import {DetailPage} from '../detail/detail';

import {AuthService} from '../../providers/auth.service';
import {CollectionService} from '../../providers/collection.service';
import {CoordService} from '../../providers/coord.service';

import {DistanceMatrix} from '../../models/distance-matrix'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;

  collectionRef: any;
  collection: any = [];

  scrollPosition: number = 0;
  scrolledDown: boolean;

  loaded = false;
  isEmptyCollection = false;

  locationOptions = {timeout: 10000, enableHighAccuracy: true};

  constructor(public platform: Platform,
              public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public af: AngularFire,
              public authService: AuthService,
              public collectionService: CollectionService,
              public coordService: CoordService,
              public locationAccuracy: LocationAccuracy) {
  }

  ngAfterViewInit() {
    // To toggle FAB
    // this.content.addScrollListener((event) => {
    //   if (this.scrollPosition <= this.content.getScrollTop()) {
    //     this.scrollPosition = this.content.getScrollTop();
    //     this.scrolledDown = true;
    //   } else {
    //     this.scrollPosition = this.content.getScrollTop();
    //     this.scrolledDown = false;
    //   }
    // });
    this.getCollection();
  }


  doRefresh(refresher) {
    this.getCollection();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  getCollection() {
    this.collectionService.getCollection().on('value', snapshots => {
      let rawList = [];

      if (!snapshots.exists()) {
        this.isEmptyCollection = true;
      }
      else {
        snapshots.forEach(snapshot => {
          rawList.push({
            key: snapshot.key,
            address: snapshot.val().address,
            name: snapshot.val().name,
            place_id: snapshot.val().place_id,
            coords: snapshot.val().coords,
            restaurantURL: snapshot.val().restaurantURL,
            thumbnailURL: snapshot.val().thumbnailURL
          });
        });
      }
      this.collection = rawList;

      if (this.coordService.lat !== undefined && this.coordService.lng !== undefined)
        //this.collection = this.calculateRestaurantDistance(this.collection);

      this.isEmptyCollection = false;
      this.loaded = true;
    });
  }

  calculateRestaurantDistance(collection: any[]) {
    if (collection.length) {
      collection.forEach(restaurant => {
        this.coordService.calculateRestaurantDistance(restaurant).subscribe(res => {
          let distance: DistanceMatrix = res;
          restaurant.distance = distance.rows[0].elements[0].distance.text;
        })
      });
    }

    return collection;
  }

  navigateToRestaurant(restaurant: any, slidingItem: ItemSliding) {
    slidingItem.close();
    //this.launchNavigator.navigate(restaurant.coords);
  }

  removeFromCollection(key: any, slidingItem: ItemSliding) {
    console.log(key);
    let confirm = this.alertCtrl.create({
      title: 'Confirm remove',
      message: 'Are you sure you want to remove this restaurant from your collection?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.collectionService.removeFromCollection(key);
            this.presentToast("Removed from collection");
          }
        }
      ]
    });
    confirm.present();
  }

  goToDetail(restaurantID: string) {
    this.navCtrl.push(DetailPage, {
      'restaurantID': restaurantID
    });
  }

  goToSearch() {
    this.navCtrl.push(SearchPage);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }
}
