import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvSpecific } from 'app/core/models/env-specific';

@Component({
    selector: '',
    templateUrl: './templates/profile.html',
    styles: ['']
})

export class ProfileComponent {
    /*
    private theDataSource: Observable<Array<any>>;
    private apiURL: string;


    constructor(private http: HttpClient, private route: ActivatedRoute, private titleService: Title) {

    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { envSpecific: EnvSpecific }) => {
                this.titleService.setTitle(data.envSpecific.title + ' | Admin');
                this.apiURL = data.envSpecific.apiURL;
            });

        this.getData(30);
    }

    private getData(days: number) {
        this.theDataSource = this.http.get<Array<any>>(this.apiURL + 'admin/data/');

        this.theDataSource.subscribe(
            data => {
                console.log(data);

            },
            err => console.log("Can't get Admin Data. Error code: %s, URL: %s ", err.status, err.url),
            () => console.log('Admin Data is retrieved')
        );
    }
    */
}