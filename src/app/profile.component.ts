import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/takeUntil";
import { Observable } from "rxjs/Observable";
import { Subscription } from 'rxjs';
import { Subject } from "rxjs/Subject";

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvSpecific } from 'app/core/models/env-specific';

import { UserPublic } from 'app/core/models/user-public';

@Component({
    selector: '',
    templateUrl: './templates/profile.html',
    styles: ['']
})

export class ProfileComponent {

    private theDataSource: Observable<UserPublic>;
    private apiURL: string;
    private busyData: Subscription;
    private unsubscribe: Subject<boolean> = new Subject();


    constructor(private http: HttpClient, private route: ActivatedRoute, private titleService: Title) {

    }

    ngOnInit() {
        this.route.data
            .takeUntil(this.unsubscribe)
            .subscribe((data: { envSpecific: EnvSpecific }) => {
                this.titleService.setTitle(data.envSpecific.title + ' | Profile');
                this.apiURL = data.envSpecific.apiURL;
            });

        this.getData(30);
    }

    public ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private getData(days: number) {
        this.theDataSource = this.http.get<UserPublic>(this.apiURL + 'users/current', { 'withCredentials': true });
        this.theDataSource
            .takeUntil(this.unsubscribe)
            .subscribe(data => {
                console.log(data.login);
                console.log(data);
            },
            err => console.log("Can't get Profile Data. Error code: %s, URL: %s ", err.status, err.url),
            () => console.log('Profile Data is retrieved')
            );
    }

}