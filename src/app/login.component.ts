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

    public submitAttempt = false;
    public isLoggedIn = false;

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
        this.submitAttempt = true;
        this.login();
    }
    /*
    this.http.post('http://localhost:8001/auth/login', '{username:"user1", password:"letmein"}')
    .map(res => res.json())
    .subscribe(
      // We're assuming the response will be an object
      // with the JWT on an id_token key
      data => console.log(data), //localStorage.setItem('id_token', data.id_token),
      error => console.log(error)
    );
    */

    login() {
        this.message = 'Trying to log in ...';

        this.authService.login().subscribe(
            // We're assuming the response will be an object
            // with the JWT on an id_token key
            data => {
                console.log("ok"); 
                console.log(data); 
                this.isLoggedIn = true
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
                
                                // Redirect the user
                                this.router.navigate([redirect]);                
            },
            error => {

                console.log("bad"); 
                console.log(error); 
                console.log("auth error");
                //this.isLoggedIn = false
            }
        );

        /*
        if (this.authService.login()) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
                
                                // Redirect the user
                                this.router.navigate([redirect]);            
        } else {
            console.log("auth error");
        }
*/
        /*
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
        */
    }

    logout() {
        this.authService.logout();
        this.setMessage();
    }
}