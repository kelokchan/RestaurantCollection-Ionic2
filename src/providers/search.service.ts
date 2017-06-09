import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { GooglePlaceConfig } from '../config/config'


@Injectable()
export class SearchService {

  constructor(public http: Http) { }

  searchPlace(keyword: string, lat: number, long: number): Observable<any> {
    keyword = keyword.split(' ').join('+');

    let params: URLSearchParams = new URLSearchParams();
    params.set("type", "restaurant");
    params.set("rankby", "distance");
    params.set("keyword", keyword);
    params.set("location", lat + "," + long);
    params.set("key", GooglePlaceConfig.apiKey);


    return this.http.get(GooglePlaceConfig.baseSearchUrl, {
      search: params
    }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  searchAdditionalPlace(nextPageToken: string): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set("pagetoken", nextPageToken);
    params.set("key", GooglePlaceConfig.apiKey);

    return this.http.get(GooglePlaceConfig.baseSearchUrl, {
      search: params
    }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
