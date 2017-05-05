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
    loggedInUser: string;
    authUser: any;

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

    register(email: string, password: string): void {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                alert(`${error.message} Please Try Again`);
            })
    }

    verifyUser(): void {
        this.authUser = firebase.auth().currentUser;
        if (this.authUser) {
            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }

    login(loginEmail: string, loginPassword: string): void {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function(error) {
                alert(`${error.message} Unable to login, try again`);
            });
    }

    logout(): void {
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function() {
            alert(`Logged Out!`);
        }, function(error) : void {
            alert(`${error.message} Unable to logout. Try again!`);
        })
    }
}