// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebase: {

    authDomain: "castello-a99be.firebaseapp.com",
    databaseURL: "https://castello-a99be.firebaseio.com",
    projectId: "castello-a99be",
    storageBucket: "castello-a99be.appspot.com",
    
    messagingSenderId: "639056394320",

    vapidKey: "BJpR6cW8_O8dUVVpty8poJEr2QlHtfBvElFRs12dMybvP_Zu38krZ7d7CViBx6ZsSg3llLlf09pU9mSWVVEedJg"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
