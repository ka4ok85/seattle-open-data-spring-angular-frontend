import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { AuthenticationResponse } from './core/models/authentication-response';

@Injectable()
export class AuthService {
    public isLoggedIn = false;

    private user: string;
    private role: string;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private http: HttpClient) { }

    login(username: String, password: String, apiURL: string) {
        return this.http.post(apiURL, JSON.stringify({ username: username, password: password }), { 'withCredentials': true })
            .map((res: AuthenticationResponse) => {
                this.isLoggedIn = true;
                this.user = res.login;
                this.role = res.role;
                return Observable.of('token');
            });
    }

    logout(): void {
        this.isLoggedIn = false;
    }

    public getUser() {
        return this.user;
    }

    public getRole() {
        return this.role;
    }
}