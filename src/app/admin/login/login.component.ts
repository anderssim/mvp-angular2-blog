import { Component } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    email: string;
    password: string;

    constructor(private userService: UserService, private router: Router) {}

    login(): void {
        this.userService.login(this.email, this.password);
        this.userService.verifyUser();
    }

    signup(): void {
        this.router.navigate(['/admin/signup']);
    }

    cancel(): void {
        this.router.navigate(['']);
    }
}