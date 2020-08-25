// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	movieApiPath: 'http://www.omdbapi.com',
	movieApiKey: 'f22f632a',
	firebaseConfig: {
		apiKey: 'AIzaSyBQ7zRADui-nz1X_PI1gmNWC4a57B1sc2s',
		authDomain: 'personal-movie-library.firebaseapp.com',
		databaseURL: 'https://personal-movie-library.firebaseio.com',
		projectId: 'personal-movie-library',
		storageBucket: 'personal-movie-library.appspot.com',
		messagingSenderId: '857851946365',
		appId: '1:857851946365:web:dc88c11eb508cdfbb31814',
		measurementId: 'G-0WB2N97WR9'
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
