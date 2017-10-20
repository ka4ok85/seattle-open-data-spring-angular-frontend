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

    constructor(private http: Http) {

    }



    login(username: String, password: String) {

        console.log("AuthService start login");


        return this.http.post(
            'http://localhost:8001/auth/login',
            JSON.stringify({
                username: username,
                password: password
            }))
            .map(res => res.json())
            .map((res: AuthenticationResponse) => {
                console.log("AuthService in map login");
                console.log(res);
                return Observable.of('token');
            });
    }

    logout(): void {
        ..this.isLoggedIn = false;
    }
}