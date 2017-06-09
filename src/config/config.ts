import {AuthProviders, AuthMethods} from 'angularfire2';


export const FirebaseConfig = {
  apiKey: "AIzaSyCSDBSDzS9NfDCHvb2OPF56OtKs3bPJlyA",
  authDomain: "restaurantcollection-fe6cf.firebaseapp.com",
  databaseURL: "https://restaurantcollection-fe6cf.firebaseio.com",
  projectId: "restaurantcollection-fe6cf",
  storageBucket: "restaurantcollection-fe6cf.appspot.com"
};

export const FirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

export const GooglePlaceConfig = {
  apiKey: "AIzaSyASScl5LXa_IIPom5MkpbGdCG-V0QGhjxw",
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
