import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;


    constructor(private http: Http) {

    }

/*
    login(): Observable<boolean> {
        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    }
*/


    login() {
        return this.http.post('http://localhost:8001/auth/login', '{username:"user1", password:"letmein"}')
            .map(res => res.json())
            /*
            .subscribe(
                // We're assuming the response will be an object
                // with the JWT on an id_token key
                data => {
                    console.log("ok"); 
                    console.log(data); 
                    this.isLoggedIn = true
                },
                error => {
                    console.log("bad"); 
                    console.log(error); 
                    this.isLoggedIn = false
                }
            );

            console.log(this.isLoggedIn);

        return this.isLoggedIn;
*/
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
        }

    logout(): void {
        this.isLoggedIn = false;
    }
}