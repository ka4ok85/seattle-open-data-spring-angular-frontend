import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvSpecific } from 'app/core/models/env-specific';
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
    public submitAttempt = false;
    public badCredentials = false;
    public message: string;

    private isLoggedIn = false;
    private angulartics2: Angulartics2;
    private apiURL: string;

    constructor(public authService: AuthService, private route: ActivatedRoute, public router: Router, formBuilder: FormBuilder, angulartics2: Angulartics2) {
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

    ngOnInit() {
        this.route.data
            .subscribe((data: { envSpecific: EnvSpecific }) => {
                this.apiURL = data.envSpecific.apiURL;
            });
    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    public onLoginFormSubmit() {
        this.submitAttempt = true;
        this.login(this.loginForm.controls['login'].value, this.loginForm.controls['password'].value);
    }

    private showBadCredentials() {
        this.badCredentials = true;
    }

    login(login: string, password: string) {
        this.authService.login(login, password, this.apiURL + 'auth/login').subscribe(
            data => {
                console.log("LoginComponent ok");
                this.isLoggedIn = true
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

                // Redirect the user
                this.router.navigate([redirect]);
            },
            error => {
                console.log("LoginComponent bad");
                this.showBadCredentials();
                this.isLoggedIn = false
            }
        );
    }

    logout() {
        this.authService.logout();
        this.setMessage();
    }
}