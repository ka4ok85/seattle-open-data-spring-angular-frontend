import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { AuthenticationResponse } from './core/models/authentication-response';

@Injectable()
export class AuthService {
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private http: Http) { }

    login(username: String, password: String, apiURL: string) {
        return this.http.post(
            //this.apiURL + '/auth/login',
            apiURL,
            JSON.stringify({
                username: username,
                password: password
            }))
            .map(res => res.json())
            .map((res: AuthenticationResponse) => {
                this.isLoggedIn = true;
                return Observable.of('token');
            });
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}