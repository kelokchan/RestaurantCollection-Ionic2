import {Component} from '@angular/core';
import {Platform, NavController, ToastController} from 'ionic-angular';
import {SearchService} from '../../providers/search.service';
import {CoordService} from '../../providers/coord.service';

import {DetailPage} from '../detail/detail';

import {Restaurant} from '../../models/restaurant'
import {Keyboard} from '@ionic-native/keyboard';
import {LocationAccuracy} from  '@ionic-native/location-accuracy';


/*
 Generated class for the Search page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  restaurants: Restaurant[] = [];
  loadedRestaurants: Restaurant[] = [];

  loaded: boolean = false;

  keyword: string = '';
  nextPageToken: string;

  constructor(public platform: Platform, public navCtrl: NavController, public searchService: SearchService, public coordService: CoordService, public toastCtrl: ToastController, private locationAccuracy: LocationAccuracy, private nativeKeyboard: Keyboard) {
    if (this.coordService.lat == undefined && this.coordService.lng == undefined) {

      let locationOptions = {timeout: 10000, enableHighAccuracy: true};

      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          // the accuracy option will be ignored by iOS
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => {
              navigator.geolocation.getCurrentPosition(pos => {
                this.coordService.setCoords(pos.coords.latitude, pos.coords.longitude);
                this.initSearch('', pos.coords.latitude, pos.coords.longitude);
              }, err => {
                console.log(err);
              }, locationOptions);
            },
            (error) => {
              this.presentToast('Location service required to perform search');
              setTimeout(() => {
                this.navCtrl.pop();
              }, 1000);
            }
          );
        }
      }).catch(err => {
        console.log(err);
      });
    } else {
      this.initSearch('', this.coordService.lat, this.coordService.lng);
    }
  }

  initSearch(keyword, lat, lng) {
    this.loaded = false;

    this.searchService.searchPlace(keyword, lat, lng)
      .subscribe(
        response => {
          this.loaded = true;
          this.restaurants = response.results;
          this.loadedRestaurants = response.results;

          if (this.restaurants.length == 0) {
            this.presentToast("No result");
          }

          if (response.next_page_token) {
            this.nextPageToken = response.next_page_token;
          }
        },
        err => {
          this.loaded = true;
          this.presentToast(err);
        });
  }

  searchByKeyword(ev) {
    if (this.keyword !== '') {
      this.loaded = false;
      this.restaurants = [];
      this.nextPageToken = '';

      this.nativeKeyboard.close();
      this.initSearch(this.keyword, this.coordService.lat, this.coordService.lng);
    }
  }

  filterByKeyword(searchbar) {
    this.resetList();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.restaurants = this.restaurants.filter((v) => {
      if (v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.restaurants.length);
  }

  resetList() {
    this.restaurants = this.loadedRestaurants;
  }

  loadMoreData(infiniteScroll) {
    if (this.nextPageToken !== '') {
      setTimeout(() => {
        this.searchService.searchAdditionalPlace(this.nextPageToken)
          .subscribe(
            response => {
              response.results.forEach(item => {
                this.restaurants.push(item);
              })
              if (response.next_page_token) {
                this.nextPageToken = response.next_page_token;
              }
              else {
                this.nextPageToken = ''; // no more to load
              }
              infiniteScroll.complete();
            },
            err => {
              this.presentToast(err);
            });
      }, 1000);
    } else {
      infiniteScroll.complete();
    }
  }

  goToDetail(restaurantID: string) {
    this.navCtrl.push(DetailPage, {
      'restaurantID': restaurantID
    });
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
