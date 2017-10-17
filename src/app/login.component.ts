import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Angulartics2 } from 'angulartics2';

@Component({
    templateUrl: './templates/login.html'
})
export class LoginComponent {

    public loginFormModel: FormGroup;
    public loginForm: FormGroup;
    private angulartics2: Angulartics2;


    message: string;

    constructor(public authService: AuthService, public router: Router, formBuilder: FormBuilder, angulartics2: Angulartics2) {
        this.setMessage();
        this.angulartics2 = angulartics2;

        // sub-form
        this.loginForm = formBuilder.group(
            {
                login: ["", Validators.required],
                password: ["", Validators.required]
            }
        );

        // main form
        this.loginFormModel = formBuilder.group({
            'loginForm': this.loginForm
        });
    }


    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    public onLoginFormSubmit() {
        console.log("!!!");
    }

    login() {
        this.message = 'Trying to log in ...';

        this.authService.login().subscribe(() => {
            this.setMessage();
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

                // Redirect the user
                this.router.navigate([redirect]);
            }
        });
    }

    logout() {
        this.authService.logout();
        this.setMessage();
    }
}