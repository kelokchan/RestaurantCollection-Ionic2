import { Injectable } from '@angular/core';

import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { GooglePlaceConfig } from '../config/config'
import { RestaurantDetail } from '../models/restaurant-detail'

import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the CoordService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CoordService {

  public lat: number;
  public lng: number;


  constructor(public http: Http, private geolocation: Geolocation) {
    // this.geolocation.getCurrentPosition().then(pos => {
    //   this.setCoords(pos.coords.latitude, pos.coords.longitude);
    // }, err => {
    //   console.log(err);
    // });
    this.http.get('http://ipinfo.io')
      .map(res => res.json())
      .subscribe(resp => {
        let latlong: string[] = resp.loc.split(",");
        this.setCoords(parseFloat(latlong[0]), parseFloat(latlong[1]));
        console.log(this.lat + ", " + this.lng);
      });
  }

  setCoords(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  calculateRestaurantDistance(restaurant: RestaurantDetail) {
    let params: URLSearchParams = new URLSearchParams();
    params.set("origins", `${this.lat},${this.lng}`);
    params.set("destinations", `place_id:${restaurant.place_id}`);
    params.set("key", GooglePlaceConfig.apiKey);

    return this.http.get(GooglePlaceConfig.baseDistanceUrl, {
      search: params
    }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
