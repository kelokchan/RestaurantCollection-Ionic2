import {AuthProviders, AuthMethods} from 'angularfire2';

// Change this to link to your own Firebase
export const FirebaseConfig = {
  apiKey: xxxxx,
  authDomain: xxxxx,
  databaseURL: xxxxx,
  projectId: xxxxx,
  storageBucket: xxxxx
};

export const FirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

export const GooglePlaceConfig = {
  apiKey: "xxxx",
  baseSearchUrl: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
  baseDetailUrl: "https://maps.googleapis.com/maps/api/place/details/json",
  basePhotoUrl: "https://maps.googleapis.com/maps/api/place/photo",
  baseDistanceUrl: "https://maps.googleapis.com/maps/api/distancematrix/json"
};


// "watch": "ionic-app-scripts watch",
// "serve:before": "watch",
// "emulate:before": "watch",
// "deploy:before": "build",
// "build:before": "build",
// "run:before": "watch"
