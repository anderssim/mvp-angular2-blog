import { Injectable } from '@angular/core';
import { 
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: Boolean = false;

    constructor( private router: Router ) {
        var config = {
            apiKey: "AIzaSyDwNXLW1Q0-GY_-kSNzXKFHAehOD2yVZbU",
            authDomain: "angular2testproject-7f632.firebaseapp.com",
            databaseURL: "https://angular2testproject-7f632.firebaseio.com",
            projectId: "angular2testproject-7f632",
            storageBucket: "angular2testproject-7f632.appspot.com",
            messagingSenderId: "685685211457"
        };
        firebase.initializeApp(config);
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true}

        this.router.navigate(['/admin/login']);
        return false;
    }
}