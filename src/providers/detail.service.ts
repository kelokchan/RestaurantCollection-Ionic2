import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { GooglePlaceConfig } from '../config/config'

/*
  Generated class for the DetailService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DetailService {

  constructor(public http: Http) {

  }

  getPlaceDetails(placeID: string): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set("placeid", placeID);
    params.set("key", GooglePlaceConfig.apiKey);

    return this.http.get(GooglePlaceConfig.baseDetailUrl, {
      search: params
    }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getPlaceDetailsPhoto(photoReference: string): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set("photoreference", photoReference);
    params.set("key", GooglePlaceConfig.apiKey);
    params.set("maxheight", "720");

    return this.http.get(GooglePlaceConfig.basePhotoUrl, {
      search: params
    }).map((res: Response) => res.url)
      .catch((error: any) => Observable.throw(error.url || 'Server error'));
  }

}
