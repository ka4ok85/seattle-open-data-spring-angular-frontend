import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subscription, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { isDevMode } from '@angular/core';

import { EnvSpecific } from '../models/env-specific';

@Injectable()
export class EnvironmentSpecificService {

  public envSpecific: EnvSpecific;
  public envSpecificNull: EnvSpecific = null;
  private envSpecificSubject: BehaviorSubject<EnvSpecific> = new BehaviorSubject<EnvSpecific>(null);

  constructor(private http: Http) {
    console.log('EnvironmentSpecificService created');
  }

  public loadEnvironment() {
      // Only want to do this once - if root page is revisited, it calls this again.
      if (this.envSpecific === null || this.envSpecific === undefined) {
        console.log('Loading env-specific.json');

        let mode: string;
        if (isDevMode()) {
            mode = 'dev';
        } else {
            mode = 'prod';
        }

        return this.http.get('./assets/env-specific/' + mode + '/env-specific.json')
            .map((data) => data.json())
            .toPromise<EnvSpecific>();
      }

      return Promise.resolve(this.envSpecificNull);
  }

  public setEnvSpecific(es: EnvSpecific) {
    // This has already been set so bail out.
    if (es === null || es === undefined) {
        return;
    }

    this.envSpecific = es;
    console.log(this.envSpecific);

    if (this.envSpecificSubject) {
        this.envSpecificSubject.next(this.envSpecific);
    }
  }

  /*
    Call this if you want to know when EnvSpecific is set.
  */
  public subscribe(caller: any, callback: (caller: any, es: EnvSpecific) => void) {
      this.envSpecificSubject
          .subscribe((es) => {
              if (es === null) {
                  return;
              }
              callback(caller, es);
          });
  }
}